import { ParamAST, ABI } from "./interfaces";
import { getParamAST, getParam, removeComments } from "./shared";

export function buildDeploy(a: ABI, code: string, sourceCodeHash: string) {
  const init: ParamAST[] = getParamAST(a.contract_info.params, a, "").paramAST;

  const sig = init.map((i) => `${i.varName}: ${i.typescriptType}`).join(",\n");
  const initParam = `[
${getParam(
  "Uint32",
  "_scilla_version",
  `"${a.contract_info.scilla_major_version}"`
)},
${init.map((i) => getParam(i.type, i.vname, i.varValue)).join(",\n")}
]`;

  return `
export const code = \`
(* sourceCodeHash=${sourceCodeHash} *)
(* sourceCodeHashKey=hash_${sourceCodeHash} *)
${removeComments(code)}\`;  
export const deploy = ( ${sig}) => {
const initData = ${initParam};
return {
  initToJSON: () => initData,
  send: async function (gasLimit: Long,): Promise<[Transaction, Contract, T.ByStr20]> {
const zil = getZil();
const gasPrice = await getMinGasPrice();

const contract = newContract(zil, code, initData);
const [tx, con] = await contract.deploy(
  {
    version: getVersion(),
    gasPrice,
    gasLimit,
  }, 33, 1000
);
log.txLink(tx, "Deploy");
if (!con.address) {
  if (con.error) {
    throw new Error(JSON.stringify(con.error, null, 2));
  }
  throw new Error("Contract failed to deploy");
}
return [tx, con, new T.ByStr20(con.address)] 
}}}`;
}
