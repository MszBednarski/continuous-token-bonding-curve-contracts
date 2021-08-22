import { generateBindings, getABI } from "./abi";
import { resolve } from "path";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from "fs";
import { format } from "prettier";

export const getFlag = (flagName: string) =>
  function () {
    const flag = `-${flagName}`;
    const args = process.argv;
    let indexOfFlag = -1;
    args.forEach((a, i) => {
      if (a == flag) {
        indexOfFlag = i + 1;
      }
    });
    if (indexOfFlag === -1 || indexOfFlag === args.length) {
      throw new Error(`Need to provide ${flagName} with ${flag} flag`);
    }
    return args[indexOfFlag];
  };

export const isFlag = (flagName: string) =>
  function () {
    const flag = `--${flagName}`;
    const args = process.argv;
    let indexOfFlag = -1;
    args.forEach((a, i) => {
      if (a == flag) {
        indexOfFlag = i;
      }
    });
    return indexOfFlag != -1;
  };

const isAbi = isFlag("abi");
const getDir = getFlag("dir");

function createDirIfNotExists(dir: string) {
  !existsSync(dir) && mkdirSync(dir, { recursive: true });
}

(async () => {
  try {
    const contractDir = getDir();
    const scillaContract = readdirSync(contractDir).filter((i) =>
      i.endsWith(".scilla")
    )[0];
    const codePath = resolve(contractDir, scillaContract);
    const abiPath = resolve(contractDir, "./build/abi.json");
    const bindPath = resolve(contractDir, "./build/bind.ts");
    const buildDirectory = resolve(contractDir, "./build/");
    const tsConfigPath = resolve(contractDir, "./build/tsconfig.json");
    const documentationPath = resolve(contractDir, "./README.md");
    createDirIfNotExists(buildDirectory);
    if (isAbi()) {
      const abi = await getABI(codePath);
      const res = JSON.parse(abi) as {
        contract_info: {
          vname: string;
        };
      };
      if (res.contract_info.vname != scillaContract.replace(".scilla", "")) {
        throw new Error(
          `.scilla contract file must have the same name! Change it to: ${res.contract_info.vname}.scilla`
        );
      }
      writeFileSync(abiPath, abi);
    }
    const code = readFileSync(codePath, "utf-8");
    const abi = readFileSync(abiPath, "utf-8");
    const { sdkCode, documentation } = generateBindings(abi, code);
    const bindings = format(sdkCode);
    writeFileSync(bindPath, bindings);
    writeFileSync(documentationPath, documentation);
  } catch (e) {
    console.error(e);
  }
  process.exit();
})();
