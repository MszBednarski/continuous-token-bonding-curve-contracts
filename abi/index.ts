import { exec } from "child_process";

export async function getABI(path: string) {
  return new Promise<string>((res) => {
    exec(
      `scilla-checker -gaslimit 10000 -contractinfo -libdir /scilla/0/src/stdlib ${path}`,
      (e, out, err) => {
        const r = out || err;
        if (err) {
          throw err;
        }
        res(r);
      }
    );
  });
}
export { generateBindings } from "./generateBindings";
