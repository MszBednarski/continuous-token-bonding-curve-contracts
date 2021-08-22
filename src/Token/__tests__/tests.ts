import { TestingFunction, testRunner } from "../../../scillaTest/utill";
import { testMaker, getGasAvg } from "../../../scillaTest";
import {
  ByStr20,
  Uint128,
  getDefaultAccount,
  Uint32,
  ScillaString,
  sleep,
  getZil,
} from "../../../boost-zil";
import * as tokenSDK from "../build/bind";
import * as operatorSDK from "../../Operator/build/bind";
import * as formulaSDK from "../../BancorFormula/build/bind";
import { Long, BN } from "@zilliqa-js/util";
import { units } from "@zilliqa-js/zilliqa";

function zils(s: string) {
  return new Uint128(units.toQa(s, units.Units.Zil));
}

export const testDeployAndInitTokenWithZIL: TestingFunction = async (
  code,
  ss
) => {
  try {
    console.log("🙌 testDeployAndInitTokenWithZIL");
    const admin = getDefaultAccount();
    const isolatedServerSecondaryAcc = new ByStr20(
      "0x381f4008505e940AD7681EC3468a719060caF796"
    );
    const adminAddr = new ByStr20(admin.address);
    const limit = Long.fromString("100000");
    const [, , formulaAddr] = await formulaSDK.deploy().send(limit);
    const [, , operatorAddr] = await operatorSDK
      .deploy(
        adminAddr,
        formulaAddr,
        new Uint128("10"), // 1% spread
        new Uint128("50"), // max 5% spread
        adminAddr
      )
      .send(limit);
    const [, , tokenAddr] = await tokenSDK
      .deploy(
        adminAddr,
        new ScillaString("Bancor"),
        new ScillaString("BNT"),
        new Uint32("12"),
        zils("100000"),
        operatorAddr
      )
      .send(limit);
    const token =
      tokenSDK.hash_0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855(
        tokenAddr
      );
    const tokenContract = token.run(limit);
    await token.state().log("is_init");
    await token.state().log("_balance");
    const connectorBalance = zils("1000");
    await tokenContract
      .InitZIL(connectorBalance, new Uint128("2"), connectorBalance)
      .send();
    await token.state().log("is_init");
    await token.state().log("balances");
    await token.state().log("_balance");
    //buy smart token
    await tokenContract.AddFunds(zils("10")).send();
    await token.state().log("balances");
    await token.state().log("_balance");
    //sell smart token
    await tokenContract.Transfer(tokenAddr, zils("2")).send();
    await token.state().log("balances");
    await token.state().log("_balance");
    //sell with transfer from
    await tokenContract
      .IncreaseAllowance(isolatedServerSecondaryAcc, zils("2"))
      .send();
    await token.state().log("allowances");
    const zil = getZil();
    zil.wallet.setDefault(isolatedServerSecondaryAcc.value);
    await tokenContract.TransferFrom(adminAddr, tokenAddr, zils("2")).send();
    await token.state().log("allowances");
    await token.state().log("balances");
    await token.state().log("_balance");
  } catch (e) {
    throw e;
  }
};
