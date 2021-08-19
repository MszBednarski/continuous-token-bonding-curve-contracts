# I. BancorFormula documentation

#### CalculatePurchaseReturn()

 @dev given a token supply, connector balance, weight and a deposit amount ( in the connector token), calculates the return for a given conversion ( in the main token) Formula: Return = in_supply ( ( 1 + in_deposit_amount / in_connector_balance) ^ ( in_connector_weight / 1000000) - 1) @param in_supply token total supply @param in_connector_balance total connector balance @param in_connector_weight connector weight, represented in ppm, 1-1000000 @param in_deposit_amount deposit amount, in connector token @send purchase return amount in form: { _tag: "CalculatePurchaseReturnCallback" ; _recipient: _sender ; _amount: zero_uint128 ; result: result } transition

  **Arguments:**

|        | Name      | Type               |
| ------ | --------- | ------------------ |
| @param | `in_supply` | `Uint128`          |
| @param | `in_connector_balance` | `Uint128`          |
| @param | `in_connector_weight` | `Uint128`          |
| @param | `in_deposit_amount` | `Uint128`          |