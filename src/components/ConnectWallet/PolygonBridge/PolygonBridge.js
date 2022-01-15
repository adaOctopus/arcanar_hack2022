import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Web3 from "web3";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../UI/LandingUI/ButtonCTA.module.css";
import "../../UI/LandingUI/HeroSection.css";
import "rsuite/dist/rsuite.min.css";
import "../../UI/LandingUI/HeroTitle.css";
import { Widget } from "@maticnetwork/wallet-widget";
import PolygonModal from "./PolygonModal/PolygonModal";

const widget = new Widget({
  target: "#btnShowWidget",
  appName: "bridging_v4",
  autoShowTime: 1000,
  position: "center",
  height: 630,
  width: 540,
  overlay: false,
  network: "testnet",
  closable: true,
});

function PolygonBridge() {
  const [isPolygonEnabled, setPolygonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTransactionDone, setTransactionDone] = useState(false);
  const [isTransactionPending, setTransactionPending] = useState(false);
  const [isTransactionError, setTransactionError] = useState(false);
  const navigation = useNavigate();

  // Function that loads the Wallet Widget from Polygon SDK for coin bridging
  const enablePolygonBridge = () => {
    widget.create();
    widget.on("depositInit", () => {
      setTransactionPending(true);
      console.log("deposit initiated");
    });
    widget.on("depositComplete", () => {
      setTransactionDone(true);
      setTransactionPending(false);
      console.log("deposit completed");
    });
    widget.on("depositError", () => {
      setTransactionError(true);
      console.log("Oops error occured..try again!");
    });
  };
  ///////////////////////////////////////////////////////////////////////////

  // Function that moves the Metamask back to the ethereum network to bridge funds
  const quietMoveToEthereum = () => {
    let ethereum = window.ethereum;
    const web3 = new Web3(ethereum);
    let goerliTestnetID = 5;
    goerliTestnetID = web3.utils.toHex(goerliTestnetID);
    try {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: goerliTestnetID }],
      }).then(()=>console.log('switched to goerli'));
    } catch (switchError) {
      console.log(switchError.message);
    }

  }
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(
      window.ethereum.networkVersion,
      "window.ethereum.networkVersion"
    );
  }, []);

  // setInterval(() => {
  //   const blockchainNetworkId = window.ethereum.networkVersion;
  //   // check if Metamask is connected to Polygon Network
  //   if (blockchainNetworkId == 137) {
  //     console.log("Yes, Polygon is configured!");
  //     setShowModal(false);
  //   } else {
  //     return;
  //   }
  // }, 2000);

  return (
    <div
      className="wallet-container"
      // style={{ marginBottom: "-100px"}}
    >
      {/* <video src="/videos/vision.mp4" autoPlay loop muted /> */}
      <p
        className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
        data-aos="zoom-y-out"
        // style={{
        //   fontFamily: "Roboto",
        //   fontWeight: "800",
        //   fontSize: "50px",
        //   color: "#fff",
        // }}
      >
        Let's make things cheaper.
      </p>
      <p
        style={{fontSize: "20px", fontWeight: "400", letterSpacing: "-1px", marginTop: "-3px"}}
        data-aos="zoom-y-out"
      >
        Accept Metamask & then click Deposit to move your funds. Super easy.
      </p>
      <div className="wallet-btns">
        <button
          className={styles.polygon}
          onClick={() => {
            enablePolygonBridge();
            quietMoveToEthereum();
          }}
          id="btnShowWidget"
          style={{
            fontSize: "18px",
            marginTop: "20px",
            fontWeight: "600",
            fontFamily: "Roboto Mono",
            color: "#fff",
            underline: "none",
            textDecoration: "none",
            borderColor: "#4c32ff",
          }}
        >
          {" "}
          {isTransactionDone
            ? "YOUR ⧫ETH⧫ IS MOVED ✔️"
            : "MOVE ETHER TO POLYGON"}
        </button>
      </div>
      {isTransactionDone ? (
        <span
          style={{
            marginTop: "30px",
            color: "#eee",
            fontFamily: "Roboto Mono",
            fontSize: "16px",
          }}
        >
          {" "}
          It will take around 3-7mins for your ETH to move.<br/>But don't worry. You can now{" "}
          <a
            href="/generateToken"
            style={{
              marginTop: "10px",
              color: "#fff",
              fontFamily: "Roboto Mono",
              fontWeight: "900",
              fontSize: "16px",
            }}
          >
          CREATE YOUR NFT
          </a>
          💎
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default PolygonBridge;
