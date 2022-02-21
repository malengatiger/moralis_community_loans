import * as React from "react";
import Moralis from "moralis";
import Button from "@mui/material/Button";

export interface IDashboardProps {
  user: Moralis.User;
}
let transactions = 0;
export function Dashboard(props: IDashboardProps) {
  console.log(
    `🍎 🍎 🍎 Dashboard starting with user: ${JSON.stringify(props.user)}`
  );
  console.log(props.user);
  console.log(`🍎 Get data for user from database ....`);

  // async function getUsers() {
  //   console.log(`🍎 Getting users from Moralis ....`);
  //    const query = new Moralis.Query("User");
  //    const results = await query.find({ useMasterKey: true });
  //   console.log(
  //     `🔆  🔆  🔆 Successfully retrieved:  🔆  ${results.length} users  🔆 `
  //   );
  //   console.log(results);
  //   for (const x of results) {
  //     console.log(
  //       `💙 💙 💙 💙  MORALIS USER: ${x.get("username")} address: ${x.get(
  //         "ethAddress"
  //       )} 💙 `
  //     );
  //   }
  // }

  async function getEthBalance() {
    console.log(`🍎 Getting ethBalance from Moralis ....`);
    const Bal = Moralis.Object.extend("EthBalance");
    const query = new Moralis.Query(Bal);
    // query.equalTo("ownerName", "Aegon");
    const results = await query.find();
    console.log(
      ` 🛎 🛎  🛎 EthBalance Successfully retrieved: 🛎 ${results.length} balances 🛎 `
    );

    for (const x of results) {
      console.log(
        `🛎 🛎 🛎 🛎 ETHEREUM BALANCE: ${x.get("balance")} for account ${x.get(
          "address"
        )} 🛎 🛎`
      );
    }
  }
  async function readCloudFunctions() {
    console.log(`🍎 readCloudFunctions from Moralis ....`);
    const users = await Moralis.Cloud.run("users");
    console.log(users);
    if (users.length === 0) {
      console.log(`🍎 🍎 🍎 readCloudFunction returned from Moralis: 0 users`);
    } else {
      console.log(
        `🍎 🍎 🍎 readCloudFunction returned from Moralis: 🎽 ${users.length} users 🎽`
      );
    }
    // const transactions = await Moralis.Cloud.run("transactions", {
    //   from_address_string: "0xa38814294ca92566f76773265fd15655153e58e7",
    // });
     const transactions = await Moralis.Cloud.run("transactions");
    console.log(transactions);
    if (transactions.length === 0) {
      console.log(
        `🥦 🥦 🥦  readCloudFunction returned from Moralis: 0 transactions`
      );
    } else {
      console.log(
        `🥦 🥦 🥦  readCloudFunction returned from Moralis:  🥬 ${transactions.length} transactions  🥬`
      );
    }
  }
  async function go() {
    // await getUsers();
    await getEthBalance();
    await sendEth();
    await getEthTransactions();
    await getEthBalance();
    await readCloudFunctions();
    await getEthBalance();
  }
  async function sendEth() {
    // sending 0.5 ETH
    const options: Moralis.TransferOptions = {
      type: "native",
      amount: Moralis.Units.ETH("0.25"),
      receiver: "0x417F61c8b36ceD8b8e8522816eCD57388509522c",
    };
    //
    //0xC4A01139fA1a3deaf9bF60190F44991428585896
    console.log(
      `🔵 🔵 🔵 🔵 🔵 🔵 Sending Ether to receiver: 0x417F61c8b36ceD8b8e8522816eCD57388509522c`
    );

    try {
      let result = await Moralis.transfer(options);
      console.log(`🔵 🔵 🔵 🔵  Ether sent or have we fucked up?`);
      console.log(result);
    } catch (e) {
      console.error(`🔴 🔴 🔴 🔴 🔴 🔴 Sending eth failed! ${JSON.stringify(e)}`);
      console.log(`🔵 🔵 🔵 About to authenticate via MetaMask .....`);
      await Moralis.authenticate();
      console.log(`🔵 🔵 🔵 Authenticate via MetaMask completed! Yeah!`);
      sendEth();
    }
  }
  async function getEthTransactions() {
    console.log(`💙 💙  Getting EthTransactions from Moralis ....`);
    const query = new Moralis.Query("EthTransactions");
    query.limit(1000);
    // query.equalTo("ownerName", "Aegon");
    const results = await query.find();
    transactions = results.length;
    console.log(
      `💙 💙 💙 Ether Transactions Successfully retrieved: 💙 ${results.length} transactions 💙 `
    );
    console.log(results);
  }

  return (
    <div style={{ marginTop: 180 }}>
      <h1>Dashboard Screen </h1>
      <h2>Ethereum Address: {props.user.get("ethAddress")}</h2>
      <p>{new Date().toISOString()}</p>
      <Button
        variant="contained"
        onClick={async () => {
          console.log(
            "\n\n🔖 Button Clicked! -  🍑 🍑 🍑 .... Execute test functions ..."
          );
          await go();
          console.log(
            `🔖 Button Clicked! -  🥬  🥬  🥬 Finished running test functions, transactions:  🥬 ${transactions} 🥬 `
          );
        }}
      >
        Execute Test Functions
      </Button>
      
    </div>
  );
}
