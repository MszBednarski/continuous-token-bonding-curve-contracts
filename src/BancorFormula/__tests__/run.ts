import { ScillaServer } from "../../../scillaTest";
import { testCalculatePurchaseReturn } from "./bancor/testCalculatePurchaseReturn";
import { resolve } from "path";
import { readFileSync } from "fs";

const scillaServerUrl = "https://scilla-server.zilliqa.com";

const ss = new ScillaServer(scillaServerUrl);

(async () => {
  try {
    await testCalculatePurchaseReturn(
      readFileSync(resolve(__dirname, "../BancorFormula.scilla"), "utf-8"),
      ss
    );
  } catch (e) {
    console.error(e);
  }
  console.info("Done!");
  process.exit();
})();
