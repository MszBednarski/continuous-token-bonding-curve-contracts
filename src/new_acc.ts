import { Zilliqa } from "@zilliqa-js/zilliqa";

(async () => {
  const zil = new Zilliqa("");
  const addr = zil.wallet.create();
  zil.wallet.setDefault(addr);
  console.log(zil.wallet.defaultAccount);
})();
