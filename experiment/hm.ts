import { BN, units } from "@zilliqa-js/zilliqa";

function log2(b: BN) {
  return new BN(256 - b.toString(2, 256).indexOf("1"));
}
// base ^ exp
// as 
// 2 ^ (log2(base) * exp)
// ex 100000 ^ 50/100
// 16 * 50/100 -> 800/100 = 8
// 2^8

const expN = new BN(50);
const expD = new BN(100);

const FIXED = new BN(10).pow(new BN(30));

const res = new BN(2);

const one_zil = units.toQa(1, units.Units.Zil);

const logof = log2(units.toQa(10, units.Units.Zil).mul(FIXED))

// console.log(new BN(2).pow(logof).toNumber() / one_zil.toNumber());

console.log({
  logof: logof.toString(),
  precision: new BN(2).pow(logof).toString(),
});
