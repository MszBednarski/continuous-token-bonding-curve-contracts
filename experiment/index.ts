import { BN } from "@zilliqa-js/util";
import { decimal12, decimal16, BNToDisp, BNToPrecision } from "./shared";

function print(b: BN) {
  console.log({
    decimal12: BNToDisp(b, decimal12),
    decimal16: BNToDisp(b, decimal16),
  });
}

// print(new BN("1000000000000"));

function tokensIssuedSmartTokenDecimalsBigger(
  connectedTokensPaid: BN,
  smartTokenBalance: BN,
  smartTokenSupply: BN,
  CW: BN, // must be in the higher precision !
  smartTokenDecimals: BN,
  connectedTokenDecimals: BN
) {
  const one = smartTokenDecimals;
  const decimalsDiff = smartTokenDecimals.div(connectedTokenDecimals);
  const connectedTokensPaidProcessed = connectedTokensPaid.mul(decimalsDiff);
}

const halfDecimal16 = decimal16.div(new BN(2));

// the buy with ZIL case
// when token decimals are bigger
tokensIssuedSmartTokenDecimalsBigger(
  new BN(10).mul(decimal12),
  new BN(250).mul(decimal16),
  new BN(1000).mul(decimal16),
  halfDecimal16,
  decimal16,
  decimal12
);
