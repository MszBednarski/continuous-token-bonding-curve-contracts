import { BN } from "@zilliqa-js/util";
import { randomBytes } from "crypto";

function randomUint128() {
  return new BN(randomBytes(16).toString("hex"), "hex");
}

const one = new BN("1");
const maxUint128 = new BN("2").pow(new BN("128")).sub(one);

/**
 * https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 */
class Double {
  static len = 64;
  static zeroOffset = new BN("3ff"); //   1023
  // 0th bit is sign
  // 1th to 11th bit is exponent
  // 12th to 63rd bit is fraction
  double = new BN(`0${Double.zeroOffset}`, 2);
  zeroOffset = new BN("1023");

  getPower() {}

  getFull() {
    return this.double.toString(2, Double.len);
  }
}

const double = new Double();
console.log(double.getFull());
console.log(new BN("01111111111", 2).toString("hex"));
