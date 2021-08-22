import { ABI, Transition } from "./interfaces";
import { getParamAST, getParam } from "./shared";
import { hasAccept, Labeled, lexer } from "./zil-accept";
import { getZilDocHeader, zilDoc } from "./zil-doc";

function getZilFlow(acceptsZil: boolean) {
  if (acceptsZil) {
    return {
      zilAmountParam: "amount: T.Uint128,",
      zilAmountVal: "amount.value",
    };
  }
  return { zilAmountParam: "", zilAmountVal: `new BN(0)` };
}

function buildTransition(a: ABI, trans: Transition, lexed: Labeled[]) {
  const acceptsZil = hasAccept(trans, lexed);
  const documentation = zilDoc(trans, lexed);
  const { zilAmountParam, zilAmountVal } = getZilFlow(acceptsZil);
  const { paramAST: ast, statementsToAdd } = getParamAST(trans.params, a, "a");
  const sig = ast.map((i) => `${i.varName}: ${i.typescriptType}`).join(",\n");
  const param = `[
    ${ast.map((i) => getParam(i.type, i.vname, i.varValue)).join(",\n")}
    ]`;
  return {
    transition: `
${trans.vname}: (${zilAmountParam} ${sig})=> {
  const transactionData = {
    contractSignature,  
    contractAddress: a.toSend(),
    contractTransitionName: \`${trans.vname}\`,
    data: ${param},
    amount: ${zilAmountVal}.toString()
  }; 
  return {
/**
 * get data needed to perform this transaction
 * */
toJSON: () => transactionData,
/**
 * send the transaction to the blockchain
 * */
send: async () => {const zil = getZil();
const gasPrice = await getMinGasPrice();
const contract = getContract(zil, a.toSend());
${statementsToAdd.join("\n")}
const tx = await contract.call(
  transactionData.contractTransitionName,
  transactionData.data,
  {
    version: getVersion(),
    amount: new BN(transactionData.amount),
    gasPrice,
    gasLimit,
  }, 33, 1000
);
log.txLink(tx, "${trans.vname}");
return tx;}
}},`,
    documentation,
  };
}

export function buildTransitions(a: ABI, code: string) {
  const lexed = lexer(code);
  const transitions = a.contract_info.transitions
    //filter out callbacks
    .filter((t) => !t.vname.includes("CallBack"))
    .filter((t) => !t.vname.includes("RecipientAcceptTransfer"))
    .filter((t) => !t.vname.includes("RecipientAcceptTransferFrom"));
  const processed = transitions.map((t) => buildTransition(a, t, lexed));
  const built = processed.map((p) => p.transition).join("\n");
  const documentation =
    getZilDocHeader(a.contract_info.vname) +
    processed.map((p) => p.documentation).join("\n\n");
  return {
    documentation,
    built,
  };
}
