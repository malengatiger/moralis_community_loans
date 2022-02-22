import * as React from "react";
import Moralis from "moralis";
// import Button from "@mui/material/Button";
import { Dashboard } from "./Dashboard";

export interface ISplashProps {}

let user;
export function Splash(props: ISplashProps) {
  console.log("Splash starting ... should check whether user is logged in");

  start();

  user = Moralis.User.current();
  console.log(`🌿 🌿 🌿 🌿 Current User: ${JSON.stringify(user)} 🌿 🌿 🌿 🌿`);
  if (!user) {
    console.log(
      `User is null, 🍏 🍏 will try to authenticate with MetaMask ...`
    );
    auth();
  }

  async function start() {
    const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
    const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
    if (!APP_ID || !SERVER_URL)
      throw new Error(
        "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
      );

    console.log(`🍏 🍏 Moralis starting ... server: ${SERVER_URL}`);
    console.log(`🍏 🍏 Moralis starting ... appID: ${APP_ID}`);
    const serverUrl = SERVER_URL;
    const appId = APP_ID;
    await Moralis.start({ serverUrl, appId });
    const version = Moralis.CoreManager.get("VERSION");

    console.log(
      "🍏 🍏 🍏 🍏 Moralis started .....  🎽 version: " + version + " 🎽"
    );
  }

  async function auth() {
    console.log("🍏 🍏 🍏 🍏  call Moralis.authenticate() ....");

    await Moralis.authenticate({ signingMessage: "Log in using Community Bank" })
      .then(function (user) {
        console.log("🍎 logged in user:", JSON.stringify(user));
        console.log(`🍎 Address: ${user.get("ethAddress")} `);
        saveLogin(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function saveLogin(user: Moralis.User) {
    console.log(
      `🥦 🥦 🥦 Saving LoginRecord for User: ${JSON.stringify(user)} 🥦 🥦 🥦 `
    );
    const LoginRecord = Moralis.Object.extend("LoginRecord");
    const loginRecord = new LoginRecord();

    loginRecord.set("date", new Date().toISOString());
    loginRecord.set("user", JSON.stringify(user));

    loginRecord.save().then(
      (loginRecord: { id: string }) => {
        // Execute any logic that should take place after the object is saved.
        console.log(
          "🥦 🥦 🥦  LoginRecord written to Moralis DB, objectId: " + loginRecord.id
        );
      },
      (error: { message: string }) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        console.log(
          "🔴 🔴 🔴 Failed to create LoginRecord, with error code: " +
            error.message
        );
      }
    );
  }

  if (user) {
    return (
      <div>
        <Dashboard user={user} />
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
