import { ABI } from "./interfaces";
import { buildDeploy } from "./deploy";
import { buildTransitions } from "./transition";
import { zilAccept } from "./zil-accept";
import createHash from "create-hash";
import { getParam, getParamAST } from "./shared";
import { ParamAST } from "./interfaces";

function sha256(b: string): string {
  const sha = createHash("sha256");
  sha.update(Buffer.from(b, "hex"));
  return `0x${sha.digest().toString("hex")}`;
}

function getNow() {
  const now = new Date();
  now.setTime(Date.now());
  return now.toISOString();
}

export function generateBindings(abi: string, code: string) {
  const a = JSON.parse(abi) as ABI;
  zilAccept(code);
  const sourceCodeHash = sha256(code);
  const deploy = buildDeploy(a, code, sourceCodeHash);
  const transitions = buildTransitions(a, code);

  const state: ParamAST[] = getParamAST(
    a.contract_info.fields,
    a,
    "a"
  ).paramAST;
  const sig = state.map((i) => `${i.varName}: ${i.typescriptType}`).join(",\n");
  let stateFieldNames = state.map((i) => `"${i.vname}"`).join("|");
  if (stateFieldNames.length == 0) {
    stateFieldNames = "string";
  }
  const stateParam = `[
${state.map((i) => getParam(i.type, i.vname, i.varValue)).join(",\n")}
]`;

  return {
    sdkCode: `import {
  getZil,
  log,
  getVersion,
  getContract,
  newContract,
  getMinGasPrice
} from "../../../boost-zil/infra-manipulation";
import { BN, Long } from "@zilliqa-js/util";
import { Transaction } from "@zilliqa-js/account";
import { Contract } from "@zilliqa-js/contract";
import * as T from "../../../boost-zil/signable";
import * as BOOST from "../../../boost-zil";
import { Zilliqa } from "@zilliqa-js/zilliqa";

/**
 * general interface of the data returned by toJSON() on the transitions
 */
export type TransactionData = {
  /**
   * the signature hash of the source code of the contract that this data interacts with
   */
  contractSignature: string;
  /**
   * contract to send the transaction to
   */
  contractAddress: string;
  /**
   * zil amount to send
   */
  amount:string;
  /**
   * the name of the transition called in the target contract
   */
  contractTransitionName: string;
  data: any[];
};

${deploy}

/**
 * this string is the signature of the hash of the source code
 * that was used to generate this sdk
 */
export const contractSignature = "hash_${sourceCodeHash}";

/**
 * will try to send a transaction to the contract
 * @warning WILL NOT THROW ERRORS IF CONTRACT SIGNATURES ARE INVALID
 */
export async function dangerousFromJSONTransaction(
  zil: Zilliqa,
  t: TransactionData,
  gasLimit: Long
) {
  const gasPrice = await getMinGasPrice();
  const contract = getContract(zil, new T.ByStr20(t.contractAddress).toSend());

  const tx = await contract.call(
    t.contractTransitionName,
    t.data,
    {
      version: getVersion(),
      amount: new BN(t.amount),
      gasPrice,
      gasLimit,
    },
    33,
    1000
  );
  log.txLink(tx, t.contractTransitionName);
  return tx;
}
/**
 * Will throw error if contract signatures are incompatible!
 */
export async function safeFromJSONTransaction(
  zil: Zilliqa,
  t: TransactionData,
  gasLimit: Long
) {
  if (t.contractSignature != contractSignature) {
    throw new Error("Incompatible contract signatures!");
  }
  await dangerousFromJSONTransaction(zil, t, gasLimit);
}

/**
 * interface for scilla contract with source code hash:
 * ${sourceCodeHash}
 * generated on:
 * ${getNow()}
*/
export const hash_${sourceCodeHash} = (a: T.ByStr20) => ({
  state: () => ({
    get: async function(field: ${stateFieldNames}) {
        const zil = getZil()
        return (await zil.blockchain.getSmartContractSubState(a.toSend(), field)).result;
    },
    log: async function(field: ${stateFieldNames} | "_balance" ) {
      const zil = getZil()
      if (field == "_balance") {
        console.log((await zil.blockchain.getBalance(a.toSend())).result);
         return;
      }
      console.log((await zil.blockchain.getSmartContractSubState(a.toSend(), field)).result);
  },
  }),
  run: (gasLimit: Long) => ({${transitions.built}})
})
`,
    documentation: transitions.documentation,
  };
}
