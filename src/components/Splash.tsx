import * as React from "react";
import Moralis from "moralis";
import Button from "@mui/material/Button";
import { Dashboard } from "./Dashboard";

export interface ISplashProps {}

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
let user;
export function Splash(props: ISplashProps) {
  console.log("Splash starting ... should check whether user is logged in");

  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );

  const serverUrl = SERVER_URL;
  const appId = APP_ID;
  console.log(`🍏 🍏 Moralis starting ... server: ${SERVER_URL}`);
  Moralis.start({ serverUrl, appId });
  console.log("🍏 🍏 🍏 🍏 Moralis started ... getting current user ..... ");
  user = Moralis.User.current();
  console.log(` 🌿 🌿 🌿 🌿 User: ${JSON.stringify(user)} 🌿 🌿 🌿 🌿`);
  if (!user) {
    console.log(`User is null, will try to authenticate with MetaMask ...`);
    auth();
  }

  async function auth() {
    console.log("..........🍏 🍏 Moralis.enableWeb3() ....");
    await Moralis.enableWeb3();
    console.log("🍏 🍏 Moralis.enableWeb3() completed");
    await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("🍎 logged in user:", JSON.stringify(user));
        console.log(`🍎 Address: ${user.get("ethAddress")} `);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /* Authentication code */
  async function login() {
    let user = Moralis.User.current();
    if (!user) {
      auth();
    }
  }
  async function getUsers() {
    const users = await Moralis.Cloud.run("User");
    console.log(`💙  💙 Users on database: ${users.length}`);
    console.log(users);
  }

  let title;
  let btnTitle = "Not On";
  if (user) {
    title = "User is already logged in. Cool!";
    //getUsers();
  } else {
    title = "Unabled to log in";
  }
  let address = "unknown";
  let created = "unknown";
  let userName = "unknown";
  if (user) {
    address = user.get("ethAddress");
    created = user.get("createdAt");
    userName = user.get("username");
    btnTitle = "Go to Dashboard";
    console.log(
      `User Ethereum Address: 🔑 🔑 🔑 ${address} 🔑 🔑  ${created} 🔑 `
    );
  }
  if (user) {
    return (
      <div>
        <Dashboard user={user}  />
      </div>
    );
  } else {
    return (
      <div>
        <h2>User not available</h2>
      </div>
    );
  }
  //   return (
  //     <div style={{ marginLeft: 24, marginRight: 24, marginTop: 64 }}>
  //       <h1>{title}</h1>
  //       <p>{JSON.stringify(user)}</p>
  //       <h2>Ethereum Address: {address}</h2>
  //       <h2>Created At: {JSON.stringify(created)}</h2>
  //       <h4>UserName: {userName}</h4>
  //       <Button variant="contained" onClick={() => {
  //           console.log("🔖 Button Clicked! - How do we go from here?");
  //           console.log("🔖 Button Clicked! -  🍑 🍑 🍑 figure it out!");
  //       }}>
  //         {btnTitle}
  //       </Button>
  //     </div>
  //   );
}
