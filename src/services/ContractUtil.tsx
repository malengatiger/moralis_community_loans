import Moralis from 'moralis';
import React from 'react';
class ContractUtil {


    
   async createContract() {
const ethers = Moralis.web3Library

const daiAddress = "dai.tokens.ethers.eth";
const daiAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
await Moralis.enableWeb3();
// const web3Js = new Web3(Moralis.provider);
// const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

// const name = await daiContract.name()
// console.log(name)
// 'Dai Stablecoin'
    }
}