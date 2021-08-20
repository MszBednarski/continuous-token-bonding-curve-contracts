import { ScillaServer } from "../../../scillaTest";
import { testCalculatePurchaseReturn } from "./bancor/testCalculatePurchaseReturn";
import { testCalculateSaleReturn } from "./bancor/testCalculateSaleReturn";
import { resolve } from "path";
import { readFileSync } from "fs";

const scillaServerUrl = "https://scilla-server.zilliqa.com";

const ss = new ScillaServer(scillaServerUrl);

(async () => {
  try {
    const code = readFileSync(
      resolve(__dirname, "../BancorFormula.scilla"),
      "utf-8"
    );
    await testCalculatePurchaseReturn(code, ss);
    await testCalculateSaleReturn(code, ss);
  } catch (e) {
    console.error(e);
  }
  console.info("Done!");
  process.exit();
})();
