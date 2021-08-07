import * as token from "./build/bind";
import {
  getDefaultAcc,
  getZil,
  getMinGasPrice,
  formatAddress,
  getVersion,
} from "../../infra-manipulator";
import { Long, BN, fromBech32Address } from "@zilliqa-js/zilliqa";

(async () => {
  try {
    const zil = await getZil();
    const acc = await getDefaultAcc();
    const limit = Long.fromInt(40000);


  } catch (e) {
    console.error(e);
  }
  process.exit();
})();
