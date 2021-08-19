import { ScillaServer } from ".";

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const Reset = "\x1b[0m";
const FgCyan = "\x1b[36m";
const FgMagenta = "\x1b[35m";
const InjectReset = "%s" + Reset;
export const RED = FgRed + InjectReset;
export const GREEN = FgGreen + InjectReset;
export const YELLOW = FgYellow + InjectReset;
export const CYAN = FgCyan + InjectReset;
export const MAGENTA = FgMagenta + InjectReset;

function printLine() {
  console.log(MAGENTA, "________________________________");
}

export type TestingFunction = (code: string, ss: ScillaServer) => Promise<void>;

export function printResult(
  scope: string,
  testName: string,
  result: any,
  testBody: any
) {
  testBody.code = "Removed Code";
  console.info(`Test: ${testName}:`);
  console.log(
    result.result == "error" ? RED : GREEN,
    `result: ${result.result}`
  );
  if (result.result != "error") {
    const events = result.message.events.map((e: any) => [
      e._eventname,
      e.params.map((p: any) => p.value),
    ]);
    console.log(CYAN, `event: ${events}`);
  }
  if (result.result == "error") {
    console.log(result.message);
  }
  printLine();
}

export const testRunner = (ss: ScillaServer) => (scope: string) => {
  const allResults: any[] = [];
  return {
    getAllResults: () => allResults,
    runner: async (testBody: any) => {
      try {
        const result = await ss.runTest({ testBody });
        allResults.push(result);
        printResult(scope, "", result, testBody);
        return result;
      } catch (e) {
        throw e;
      }
    },
  };
};
