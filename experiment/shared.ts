import { BN } from "@zilliqa-js/util";

export const decimal12 = new BN("1000000000000");
export const decimal16 = new BN("10000000000000000");

export function BNToDisp(b: BN, precision: BN) {
  const precisionminus3 = precision.div(new BN("1000"));
  const trail = b.mod(precisionminus3);
  if (b.lt(precision)) {
    let tr = b.toString();
    while (tr.length < precision.toString().length - 1) {
      tr = "0" + tr;
    }
    return `0.${tr}`;
  }
  const rest = b.sub(trail).div(precision);
  const restString = rest.toString();
  if (trail.gt(new BN(0))) {
    let tr = trail.sub(precisionminus3).toString();
    while (tr.length < 3) {
      tr = "0" + tr;
    }
    return `${restString}.${tr}`;
  }
  return `${restString}.000`;
}

export function BNToPrecision(b: BN, precision: BN) {
  const trail = b.mod(precision);
  const rest = b.sub(trail).div(precision);
  return `${rest.toString()}`;
}
