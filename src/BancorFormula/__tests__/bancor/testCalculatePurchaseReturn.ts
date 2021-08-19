import { TestingFunction, testRunner } from "../../../../scillaTest/utill";
import { testMaker } from "../../../../scillaTest";
import { ByStr20, Uint128 } from "../../../../boost-zil";
import * as sdk from "../../build/bind";
import { Long, BN } from "@zilliqa-js/util";
import {
  bancorPaperTestCases,
  below50percentTestCases,
  above50percentTestCases,
  maxConnectorWeightTestCases,
  zilUpscaledTestCases,
  eighteenZeroesTestCases,
  thirtyZeroesTestCases,
  thirtyFiveZeroesTestCases,
  generalLogGeneralExp,
} from "../testCases";
import createHash from "create-hash";

function testHash(s: string[]): string {
  const sha = createHash("sha256");
  sha.update(JSON.stringify(s));
  return `0x${sha.digest().toString("hex").slice(0, 5)}`;
}

/**
 * prints the returned - expected val
 */
function printError(res: any, test: string[]) {
  const val = res.message.messages[0].params[0].value;
  const b = new BN(val);
  const r = new BN(test[4]);
  const err = b.sub(r);
  if (err.eq(new BN(0))) {
    console.log("perfect");
  } else {
    console.log(
      "err:",
      err.toString().length,
      r.toString().length,
      testHash(test)
    );
  }
}

export const testCalculatePurchaseReturn: TestingFunction = async (code, ss) => {
  try {
    const fillerAddr = new ByStr20(
      "0x1234567890123456789012345678901234567890"
    );
    const testing = testRunner(ss)("BancorFormula");
    const run = testing.runner;
    const make = testMaker(code)("1")([])("0")([])(fillerAddr);
    const bancor =
      sdk.hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855(
        fillerAddr
      )(Long.fromString("100000"));
    async function runBatch(testCases: string[][]) {
      const res = await Promise.all(
        testCases.map((test) =>
          run(
            make(
              bancor
                .CalculatePurchaseReturn(
                  new Uint128(test[0]),
                  new Uint128(test[1]),
                  new Uint128(test[2]),
                  new Uint128(test[3])
                )
                .toJSON()
            )
          )
        )
      );
      res.forEach((r, index) => printError(r, testCases[index]));
    }
    await runBatch(bancorPaperTestCases);
    await runBatch(below50percentTestCases);
    await runBatch(above50percentTestCases);
    await runBatch(maxConnectorWeightTestCases);
    await runBatch(zilUpscaledTestCases);
    await runBatch(eighteenZeroesTestCases);
    await runBatch(thirtyZeroesTestCases);
    await runBatch(thirtyFiveZeroesTestCases);
    await runBatch(generalLogGeneralExp);
    const results = testing.getAllResults();
    const limit = new BN("100000");
    console.log(
      `Average gas across ${results.length} tests: `,
      results
        .map((r) => limit.sub(new BN(r.message.gas_remaining)))
        .reduce((prev, cur) => prev.add(cur), new BN(0))
        .div(new BN(results.length))
        .toString()
    );
  } catch (e) {
    throw e;
  }
};
