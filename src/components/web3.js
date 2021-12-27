import Web3 from "web3";

async function initWeb3() {
  let web3Provider = null;
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });;
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
    web3Provider = window.ethereum;
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    console.log("Legacy dapp web3...");
    web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    // comment out localhost when deploy
    // web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  return new Web3(web3Provider);
}

export default initWeb3;
