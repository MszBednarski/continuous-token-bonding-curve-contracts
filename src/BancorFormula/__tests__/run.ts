import { scillaServer } from "../../../scillaTest";
import { testCalculatePurchaseReturn } from "./bancor/testCalculatePurchaseReturn";
import { testCalculateSaleReturn } from "./bancor/testCalculateSaleReturn";
import { testCalculateCrossConnectorReturn } from "./bancor/testCalculateCrossConnectorReturn";
import { resolve } from "path";
import { readFileSync } from "fs";



(async () => {
  try {
    const code = readFileSync(
      resolve(__dirname, "../BancorFormula.scilla"),
      "utf-8"
    );
    await testCalculatePurchaseReturn(code, scillaServer);
    await testCalculateSaleReturn(code, scillaServer);
    await testCalculateCrossConnectorReturn(code, scillaServer);
  } catch (e) {
    console.error(e);
  }
  console.info("Done!");
  process.exit();
})();
