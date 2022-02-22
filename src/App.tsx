import Moralis from 'moralis/types';
import React from 'react';
import './App.css';
import { Splash } from './components/Splash';
import { useMetaMask } from "metamask-react";

function App() {
  //Moralis.User.
  console.log(
    "\n\n\n  💙  💙  💙  💙  💙 React App starting ...  💙  💙  💙  💙  💙 "
  );
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected")
    return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <div className="App">
        <Splash />
      </div>
    );
  return (
    <div className="App">
      <Splash />
    </div>
  );
}

export default App;
