import React, { useState } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dashboard } from "./Dashboard";
import pic1 from "../assets/pic1.jpeg";

const LandingPage = () => {
  const [user, setUser] = useState<Moralis.User>();

  const { authenticate, isAuthenticated, isAuthenticating, authError } =
    useMoralis();
  start();
  const x = Moralis.User.current();
  if (x) {
    console.log(
      `👽 👽 👽 User already logged in, address: 🌿 ${x.get("ethAddress")} 🌿 `
    );
    setUser(x)
    return <Dashboard user={x} />;
  } else {
  }
  console.log(x);

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

    await Moralis.authenticate({
      signingMessage: "Log in using Community Bank",
    })
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
          "🥦 🥦 🥦  LoginRecord written to Moralis DB, objectId: " +
            loginRecord.id
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
  return (
    <div>
      <ResponsiveAppBar user={user}></ResponsiveAppBar>
      <h1>Landing Page content here</h1>
      <div className="container">
        <Card sx={{ maxWidth: 600 }} color="secondary">
          <CardMedia
            component="img"
            height="340"
            image={pic1}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <h1>Control Authentication here</h1>
        <Button variant="contained" size="large" onClick={auth}>
          Authenticate with Metamask
        </Button>
      </div>
    </div>
  );
};

// LandingPage.propTypes = {
//   user: Moralis.User,
// };

export default LandingPage;
