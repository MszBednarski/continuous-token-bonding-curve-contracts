import { scillaServer } from "../../../scillaTest";
import { testDeployAndInitTokenWithZIL } from "./tests";
import { code } from "../build/bind";

(async () => {
  try {
    await testDeployAndInitTokenWithZIL(code, scillaServer);
  } catch (e) {
    console.error(e);
  }
  console.info("Done!");
  process.exit();
})();
