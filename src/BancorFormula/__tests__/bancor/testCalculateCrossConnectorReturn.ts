import { crossConnectorReturnCases } from "../cases/crossConnectorReturnCases";
import { TestingFunction, testRunner } from "../../../../scillaTest/utill";
import { testMaker } from "../../../../scillaTest";
import { ByStr20, Uint128 } from "../../../../boost-zil";
import * as sdk from "../../build/bind";
import { Long, BN } from "@zilliqa-js/util";
import { getError, getGasAvg, getErrorStats } from "./utill";

export const testCalculateCrossConnectorReturn: TestingFunction = async (
  code,
  ss
) => {
  try {
    console.log("🙌 testCalculateCrossConnectorReturn");
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
      await Promise.all(
        testCases.map((test) =>
          run(
            make(
              bancor
                .CalculateCrossConnectorReturn(
                  new Uint128(test[0]),
                  new Uint128(test[1]),
                  new Uint128(test[2]),
                  new Uint128(test[3]),
                  new Uint128(test[4])
                )
                .toJSON()
            ),
            getError(test[5])
          )
        )
      );
    }
    await runBatch(crossConnectorReturnCases);
    getErrorStats(testing.getAllErrors());
    getGasAvg(testing.getAllResults());
  } catch (e) {
    throw e;
  }
};