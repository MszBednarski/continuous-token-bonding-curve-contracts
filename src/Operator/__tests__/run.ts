import { scillaServer } from "../../../scillaTest";
import { resolve } from "path";
import { readFileSync } from "fs";



(async () => {
  try {
    const code = readFileSync(
      resolve(__dirname, "../Operator.scilla"),
      "utf-8"
    );
  } catch (e) {
    console.error(e);
  }
  console.info("Done!");
  process.exit();
})();
