import Moralis from 'moralis/types';
import React from 'react';
import './App.css';
import { Splash } from './components/Splash';
import { useMetaMask } from "metamask-react";
import LandingPage from './components/LandingPage';

function App() {
  //Moralis.User.
  console.log(
    "\n\n\nš  š  š  š  š React App starting ...  š  š  š  š  š "
  );
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  console.log(`š  š  š  š  š App Account: ${account}`);
 
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default App;
