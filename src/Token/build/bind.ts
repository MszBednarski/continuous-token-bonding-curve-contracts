import {
  getZil,
  formatAddress,
  log,
  getVersion,
  getContract,
  newContract,
} from "../../../infra-manipulator";
import { BN, Long } from "@zilliqa-js/util";
import { Transaction } from "@zilliqa-js/account";
import { Contract } from "@zilliqa-js/contract";
import { Value } from "@zilliqa-js/contract";

export async function deploy(
  gasLimit: Long,
  gasPrice: BN,
  __contract_owner: string,
  __name:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[],
  __symbol:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[],
  __decimals:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[],
  __init_supply:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[]
): Promise<[Transaction, Contract]> {
  const zil = await getZil();
  const code = `
scilla_version 0




import IntUtils
library FungibleToken

let one_msg = 
  fun (msg : Message) => 
  let nil_msg = Nil {Message} in
  Cons {Message} msg nil_msg

let two_msgs =
fun (msg1 : Message) =>
fun (msg2 : Message) =>
  let msgs_tmp = one_msg msg2 in
  Cons {Message} msg1 msgs_tmp


type Error =
| CodeIsSender
| CodeInsufficientFunds
| CodeInsufficientAllowance

let make_error =
  fun (result : Error) =>
    let result_code = 
      match result with
      | CodeIsSender              => Int32 -1
      | CodeInsufficientFunds     => Int32 -2
      | CodeInsufficientAllowance => Int32 -3
      end
    in
    { _exception : "Error"; code : result_code }
  
let zero = Uint128 0


type Unit =
| Unit

let get_val =
  fun (some_val: Option Uint128) =>
  match some_val with
  | Some val => val
  | None => zero
  end





contract FungibleToken
(
  contract_owner: ByStr20,
  name : String,
  symbol: String,
  decimals: Uint32,
  init_supply : Uint128
)



field total_supply : Uint128 = init_supply

field balances: Map ByStr20 Uint128 
  = let emp_map = Emp ByStr20 Uint128 in
    builtin put emp_map contract_owner init_supply

field allowances: Map ByStr20 (Map ByStr20 Uint128) 
  = Emp ByStr20 (Map ByStr20 Uint128)





procedure ThrowError(err : Error)
  e = make_error err;
  throw e
end

procedure IsNotSender(address: ByStr20)
  is_sender = builtin eq _sender address;
  match is_sender with
  | True =>
    err = CodeIsSender;
    ThrowError err
  | False =>
  end
end

procedure AuthorizedMoveIfSufficientBalance(from: ByStr20, to: ByStr20, amount: Uint128)
  o_from_bal <- balances[from];
  bal = get_val o_from_bal;
  can_do = uint128_le amount bal;
  match can_do with
  | True =>
    
    new_from_bal = builtin sub bal amount;
    balances[from] := new_from_bal;
    
    get_to_bal <- balances[to];
    new_to_bal = match get_to_bal with
    | Some bal => builtin add bal amount
    | None => amount
    end;
    balances[to] := new_to_bal
  | False =>
    
    err = CodeInsufficientFunds;
    ThrowError err
  end
end








transition IncreaseAllowance(spender: ByStr20, amount: Uint128)
  IsNotSender spender;
  some_current_allowance <- allowances[_sender][spender];
  current_allowance = get_val some_current_allowance;
  new_allowance = builtin add current_allowance amount;
  allowances[_sender][spender] := new_allowance;
  e = {_eventname : "IncreasedAllowance"; token_owner : _sender; spender: spender; new_allowance : new_allowance};
  event e
end




transition DecreaseAllowance(spender: ByStr20, amount: Uint128)
  IsNotSender spender;
  some_current_allowance <- allowances[_sender][spender];
  current_allowance = get_val some_current_allowance;
  new_allowance =
    let amount_le_allowance = uint128_le amount current_allowance in
      match amount_le_allowance with
      | True => builtin sub current_allowance amount
      | False => zero
      end;
  allowances[_sender][spender] := new_allowance;
  e = {_eventname : "DecreasedAllowance"; token_owner : _sender; spender: spender; new_allowance : new_allowance};
  event e
end





transition Transfer(to: ByStr20, amount: Uint128)
  AuthorizedMoveIfSufficientBalance _sender to amount;
  e = {_eventname : "TransferSuccess"; sender : _sender; recipient : to; amount : amount};
  event e;
  
  msg_to_recipient = {_tag : "RecipientAcceptTransfer"; _recipient : to; _amount : zero; 
                      sender : _sender; recipient : to; amount : amount};
  msg_to_sender = {_tag : "TransferSuccessCallBack"; _recipient : _sender; _amount : zero; 
                  sender : _sender; recipient : to; amount : amount};
  msgs = two_msgs msg_to_recipient msg_to_sender;
  send msgs
end






transition TransferFrom(from: ByStr20, to: ByStr20, amount: Uint128)
  o_spender_allowed <- allowances[from][_sender];
  allowed = get_val o_spender_allowed;
  can_do = uint128_le amount allowed;
  match can_do with
  | True =>
    AuthorizedMoveIfSufficientBalance from to amount;
    e = {_eventname : "TransferFromSuccess"; initiator : _sender; sender : from; recipient : to; amount : amount};
    event e;
    new_allowed = builtin sub allowed amount;
    allowances[from][_sender] := new_allowed;
    
    msg_to_recipient = {_tag: "RecipientAcceptTransferFrom"; _recipient : to; _amount: zero; 
                        initiator: _sender; sender : from; recipient: to; amount: amount};
    msg_to_sender = {_tag: "TransferFromSuccessCallBack"; _recipient: _sender; _amount: zero; 
                    initiator: _sender; sender: from; recipient: to; amount: amount};
    msgs = two_msgs msg_to_recipient msg_to_sender;
    send msgs
  | False =>
    err = CodeInsufficientAllowance;
    ThrowError err
  end
end`;
  const contract = newContract(zil, code, [
    {
      type: `Uint32`,
      vname: `_scilla_version`,
      value: "0",
    },
    {
      type: `ByStr20`,
      vname: `contract_owner`,
      value: formatAddress(__contract_owner),
    },
    {
      type: `String`,
      vname: `name`,
      value: __name,
    },
    {
      type: `String`,
      vname: `symbol`,
      value: __symbol,
    },
    {
      type: `Uint32`,
      vname: `decimals`,
      value: __decimals,
    },
    {
      type: `Uint128`,
      vname: `init_supply`,
      value: __init_supply,
    },
  ]);
  const [tx, con] = await contract.deploy({
    version: getVersion(),
    gasPrice,
    gasLimit,
  });
  log.txLink(tx, "Deploy");
  return [tx, con];
}

export async function _IncreaseAllowance(
  a: string,
  gasLimit: Long,
  gasPrice: BN,
  amount: BN,
  __spender: string,
  __amount:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[]
) {
  const zil = await getZil();
  const contract = getContract(zil, a);
  const tx = await contract.call(
    "IncreaseAllowance",
    [
      {
        type: `ByStr20`,
        vname: `spender`,
        value: formatAddress(__spender),
      },
      {
        type: `Uint128`,
        vname: `amount`,
        value: __amount,
      },
    ],
    {
      version: getVersion(),
      amount: amount,
      gasPrice,
      gasLimit,
    }
  );
  log.txLink(tx, "IncreaseAllowance");
  return tx;
}

export async function _DecreaseAllowance(
  a: string,
  gasLimit: Long,
  gasPrice: BN,
  amount: BN,
  __spender: string,
  __amount:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[]
) {
  const zil = await getZil();
  const contract = getContract(zil, a);
  const tx = await contract.call(
    "DecreaseAllowance",
    [
      {
        type: `ByStr20`,
        vname: `spender`,
        value: formatAddress(__spender),
      },
      {
        type: `Uint128`,
        vname: `amount`,
        value: __amount,
      },
    ],
    {
      version: getVersion(),
      amount: amount,
      gasPrice,
      gasLimit,
    }
  );
  log.txLink(tx, "DecreaseAllowance");
  return tx;
}

export async function _Transfer(
  a: string,
  gasLimit: Long,
  gasPrice: BN,
  amount: BN,
  __to: string,
  __amount:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[]
) {
  const zil = await getZil();
  const contract = getContract(zil, a);
  const tx = await contract.call(
    "Transfer",
    [
      {
        type: `ByStr20`,
        vname: `to`,
        value: formatAddress(__to),
      },
      {
        type: `Uint128`,
        vname: `amount`,
        value: __amount,
      },
    ],
    {
      version: getVersion(),
      amount: amount,
      gasPrice,
      gasLimit,
    }
  );
  log.txLink(tx, "Transfer");
  return tx;
}

export async function _TransferFrom(
  a: string,
  gasLimit: Long,
  gasPrice: BN,
  amount: BN,
  __from: string,
  __to: string,
  __amount:
    | Value["value"]
    | {
        constructor: string,
        argtypes: string[],
        arguments: Value[] | string[],
      }[]
    | string[]
) {
  const zil = await getZil();
  const contract = getContract(zil, a);
  const tx = await contract.call(
    "TransferFrom",
    [
      {
        type: `ByStr20`,
        vname: `from`,
        value: formatAddress(__from),
      },
      {
        type: `ByStr20`,
        vname: `to`,
        value: formatAddress(__to),
      },
      {
        type: `Uint128`,
        vname: `amount`,
        value: __amount,
      },
    ],
    {
      version: getVersion(),
      amount: amount,
      gasPrice,
      gasLimit,
    }
  );
  log.txLink(tx, "TransferFrom");
  return tx;
}
