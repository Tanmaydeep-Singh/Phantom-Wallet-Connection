import "./App.css";
import { useState } from "react";


const App = () => {

  
  const [walletAddress, setWalletAddress] = useState(null);
  // const [balance, setBalance] = useState("");
  // const [pubkey, setPubkey] = useState("");



  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          // console.log("Wallet Found");
          const response = await solana.connect({ onlyIfTrusted: true });
          // console.log(
          //   "connected with publickey:",
          //   response.publicKey.toString()
          // );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Get a phantom wallet")
        console.log("Get a phantom wallet");
      }
    } catch (error) {
      // console.error(error);
    }
  };


  const connectWallet = async () => {
    checkIfWalletIsConnected();
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      // console.log("connected with public key", response.publicKey);
      setWalletAddress(response.publicKey.toString());
      
    }
  };




  const disconnectWallet = async () => {
    const { solana } = window;
    if (solana) {
      await solana.disconnect();
      setWalletAddress(null);

        // disconnectWallet()
    }
  };


 


  return (
    <div className="App">
      <button onClick={connectWallet}>Connect to wallet. </button>
      <button onClick={disconnectWallet}>Disconnect wallet. </button>

      <h1> Wallet Address: {walletAddress} </h1>
      <h3> Balance : </h3>
    </div>
  );
};

export default App;
