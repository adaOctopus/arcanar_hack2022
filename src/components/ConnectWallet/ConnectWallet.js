import React, { useState } from "react";
import { init } from "../../utils/web3Client";
import Web3 from "web3";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../redux/slicer/walletSlice";
import styles from "../UI/LandingUI/ButtonCTA.module.css";
import "../UI/LandingUI/HeroSection.css";
import "rsuite/dist/rsuite.min.css";
import "../UI/LandingUI/HeroTitle.css";

function ConnectWallet() {
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [installNeeded, setInstallNeeded] = useState(false);
  const [loggedInMetamask, setLoggedInMetamask] = useState(false);
  const [isPolygonConfigured, setIsPolygonConfigured] = useState(false);
  const [startedConfiguring, setStartedConfiguring] = useState(false);

  const walletData = useSelector((state) => state.wallet.wallet);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  // Function to connect to metamask wallet
  const connectWallet = () => {
    setSpinning(true);
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          setUserWalletAddress(accounts[0]);
          setTimeout(() => {
            setSpinning(false);
          }, 1500);
          setTimeout(() => {
            setLoggedInMetamask(true);
            const data = {
              walletAddress: accounts[0],
              loggedMetamask: true,
            };
            dispatch(setWallet(data));
            // console.log(data)
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      setTimeout(() => {
        setSpinning(false);
        setInstallNeeded(true);
      }, 650);
      console.log("thsi is it clicked");
    }
  };
  //************************************//

  // Function to configure the Polygon network with RPC API

  const configurePolygon = () => {
    setStartedConfiguring(true);
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    // Turning chainID toHex()
    // let mainnetPolygonID = '137';
    // mainnetPolygonID = web3.utils.toHex(mainnetPolygonID);
    // https://polygon-rpc.com Polygon Mainnet
    let mumbaiPolygonID = 80001;
    mumbaiPolygonID = web3.utils.toHex(mumbaiPolygonID);
    try {
      provider
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mumbaiPolygonID }],
        })
        .then(() => {
          setTimeout(() => {
            setIsPolygonConfigured(true);
            setStartedConfiguring(false);
          }, 1000);
          console.log("made it true");
        });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log("Network is not there...");
      if (switchError.code === 4902) {
        try {
          console.log("Trying to add network");
          provider
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: mumbaiPolygonID,
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                  chainName: "Polygon Mainnet",
                },
              ],
            })
            .then(() => {
              setIsPolygonConfigured(true);
              setStartedConfiguring(false);
              console.log("made it true");
            });
        } catch (error) {
          console.log("This is the error:" + error.message);
          setStartedConfiguring(false);
        }
      }
      // handle other "switch" errors
    }
  };

  //************************************//

  return (
    <div
      className="wallet-container"
      // style={{ marginBottom: "-100px"}}
    >
      <video src="/videos/vision.mp4" autoPlay loop muted />
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
        Connect your Metamask <span style={{ color: "#fff" }}></span> wallet.
      </p>
      <div className="wallet-btns">
        <button
          className={styles.wallet}
          onClick={connectWallet}
          style={{
            fontSize: "18px",
            marginTop: "-10px",
            fontWeight: "600",
            fontFamily: "Roboto Mono",
            color: "#000",
            underline: "none",
            textDecoration: "none",
            borderColor: "#4c32ff",
          }}
        >
          {!spinning && !userWalletAddress ? (
            "CONNECT WALLET"
          ) : spinning ? (
            <span style={{ fontFamily: "Roboto Mono" }}>
              CONNECTING
              <span style={{ marginTop: "-30%" }}>
                <Spinner animation="border" size="sm" variant="dark" />
              </span>
            </span>
          ) : !spinning && userWalletAddress ? (
            <p style={{ color: "#fff", fontFamily: "Roboto Mono" }}>
              {userWalletAddress} ✔️
            </p>
          ) : (
            ""
          )}
        </button>
      </div>

      <div>
        {installNeeded ? (
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Roboto",
              fontWeight: "500",
              fontStyle: "italic",
              color: "#fff",
              marginTop: "35px",
            }}
          >
            👉 You need Metamask extension to proceed.{" "}
            <span>
              <a
                style={{
                  textDecoration: "underline",
                  color: "#06FE8B",
                  fontWeight: "800",
                }}
                href="https://metamask.io/download"
                target="blank"
              >
                Install it now.
              </a>
            </span>{" "}
            It's super easy. 👈
          </p>
        ) : (
          ""
        )}
      </div>
      {loggedInMetamask ? (
        <button
          className={styles.gentoken}
          onClick={configurePolygon}
          // onClick={() => navigation("/buyEther")}
          style={{
            fontSize: "18px",
            marginTop: "30px",
            fontWeight: "300",
            underline: "none",
            textDecoration: "none",
            fontFamily: "Roboto Mono",
          }}
        >
          {isPolygonConfigured
            ? "POLYGON NETWORK ADDED ✔️"
            : "ADD POLYGON NETWORK"}{" "}
          {startedConfiguring ? (
            <span style={{ marginTop: "-30%" }}>
              <Spinner animation="border" size="sm" variant="primary" />
            </span>
          ) : (
            ""
          )}
        </button>
      ) : (
        ""
      )}
      {isPolygonConfigured ? (
        <a
          href="/buyEther"
          style={{ marginTop:"10px",color: "#fff", fontFamily: "Roboto Mono", fontWeight:"500", fontSize: "16px" }}
        >
          All Done ✔️ Continue🔓
        </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default ConnectWallet;
