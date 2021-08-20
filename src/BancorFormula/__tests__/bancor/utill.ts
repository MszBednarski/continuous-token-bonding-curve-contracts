import { BN } from "@zilliqa-js/zilliqa";
import Big from "big.js";

/**
 * prints the returned - expected val
 */
export const getError = (test: string[]) => (res: any) => {
  const val = res.message.messages[0].params[0].value;
  const b = new BN(val);
  const r = new BN(test[4]);
  const err = b.sub(r);
  if (err.eq(new BN(0))) {
    return new Big("0");
  } else {
    return new Big("1").sub(new Big(val).div(new Big(test[4])));
  }
};

export function getGasAvg(results: any[]) {
  const limit = new BN("100000");
  console.log(
    `Average gas across ${results.length} tests: `,
    results
      .map((r) => limit.sub(new BN(r.message.gas_remaining)))
      .reduce((prev, cur) => prev.add(cur), new BN(0))
      .div(new BN(results.length))
      .toString()
  );
}
export function getErrorStats(errors: { error: Big; result: any }[]) {
  let perfectCount = 0;
  let maxErr = new Big("-33333333");
  let minErr = new Big("8888");
  const totalErr = errors.reduce((prev, cur) => {
    if (cur.error.eq(new Big(0))) {
      perfectCount++;
    }
    if (cur.error.gt(maxErr)) {
      maxErr = cur.error;
    }
    if (cur.error.lt(minErr) && !cur.error.eq(new Big(0))) {
      minErr = cur.error;
    }
    return prev.add(new Big(cur.error));
  }, new Big(0));
  console.log(`${perfectCount} / ${errors.length} perfect tests`);
  console.log(`with average error: ${totalErr.div(new Big(errors.length))}`);
  console.log(`min error ${minErr.toString()}`);
  console.log(`max error ${maxErr.toString()}`);
}
