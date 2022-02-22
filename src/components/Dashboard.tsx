import * as React from "react";
import Moralis from "moralis";
import Button from "@mui/material/Button";
import { useMetaMask } from "metamask-react";
import { connect } from "tls";
// import Web3 from "web3";

export interface IDashboardProps {
  user: Moralis.User;
}
let transactions = 0;
export function Dashboard(props: IDashboardProps) {
  console.log(
    `\n\n\n🍎 🍎 🍎 Dashboard starting with user:  🍎 ${JSON.stringify(
      props.user
    )}  🍎`
  );
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  console.log(`🍎 Initialization complete. UI to be set up`);

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
      console.error(
        `🔴 🔴 🔴 🔴 🔴 🔴 Sending eth failed! ${JSON.stringify(e)}`
      );
      console.log(`🔵 🔵 🔵 About to authenticate via MetaMask .....`);

      try {
        await Moralis.authenticate();
        console.log(`🔵 🔵 🔵 Authenticate via MetaMask completed! Yeah!`);
        sendEth();
      } catch (e) {
        console.error(`Unable to authenticate with MetaMask`);
        throw new Error("Unable to authenticate with MetaMask");
      }
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
  async function startMetaMask() {
    console.log(`Dashboard: 🍏 🍏 🍏 🍏 startMetaMask .... status: ${status}`);

    // const eth = window.ethereum;
    if (ethereum) {
      console.log("Dashboard: 🍏 🍏 🍏 🍏 ethereum is cool!");
      console.log(ethereum);
      try {
        const accts = await ethereum.request({
          method: "eth_requestAccounts",
          params: [],
        });
        console.log(accts);
        const bal = await ethereum.request({
          method: "eth_getBalance",
          params: [],
        });
        console.log(bal);
        // const output = Buffer.from(bal, "hex");
        // console.log(`output balance: ${output}`)
      } catch (e) {
        console.log(`etereum request fell down!!!`);
        console.log(e);
      }
    } else {
      console.log("Dashboard: 🔴 🔴  ethereum is NULL ....");
    }

    // window.web3 = new Web3(window.ethereum);
    // await window.ethereum.enable();
  }
  function hex2a(hexx: String): String {
    var hex = hexx.toString(); //force conversion
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    console.log(str);
    return str;
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
      <Button
        style={{ marginLeft: 12 }}
        variant="contained"
        onClick={async () => {
          console.log(
            "\n\n🔖 Wallet Button Clicked! -  🍑 🍑 🍑 .... Change Wallet Account ..."
          );
          await startMetaMask();
        }}
      >
        Change Wallet Account
      </Button>
    </div>
  );
}
