import React, { useEffect, useState } from "react";
import {init, contractInteraction,ipfsAction, nftStorageIpfs} from "./utils/web3Client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Web3 from "web3";
import Navbar from "./components/UI/LandingUI/Navbar";
import "./App.css";
import { create } from "ipfs-http-client";
import UIMinterForm from "./components/MintToken/GenerateToken";
import Helmet from "react-helmet";
import Home from "./components/landingPage/Home";
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import PolygonBridge from './components/ConnectWallet/PolygonBridge/PolygonBridge';
import BuyEther from "./components/BuyEthereum/BuyEthereum";

const client = create("https://ipfs.infura.io:5001");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEthAddress, setUserEthAddress] = useState("");
  const [minted, isMinted] = useState(false);
  const [metadata, setMetadata] = useState("");

  const readMetadata = (data) => {
    setMetadata(data);
  };

  // const mintToken = () => {
  //   contractInteraction()
  //     .then((txd) => {
  //       console.log(txd);
  //       isMinted(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const addFileIpfs = async (e) => {
  //   e.preventDefault();
  //   //HERE***ERROR**FILE UNDEFINED
  //   const fileName = e.target.files;
  //   console.log(fileName);
  //   try {
  //     const addFileToIpfs = await client.add(fileName);
  //     console.log(`${addFileToIpfs.path}`);
  //     const url = `https://ipfs.infura.io/ipfs/${addFileToIpfs.path}`;
  //     console.log(url);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <Router>
      <Helmet>
        <style>{"body { background-color: #000; }"}</style>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generateToken" element={<UIMinterForm readMetadata={readMetadata} />} />
        <Route path="/connectWallet" element={<ConnectWallet/>}/>
        <Route path="/polygonFunds" element={<PolygonBridge/>}/>
        <Route path="buyether" element={<BuyEther/>}/>
      </Routes>
    </Router>
  );
}

export default App;
