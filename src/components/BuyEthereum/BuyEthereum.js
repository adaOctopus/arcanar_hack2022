import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "../../components/UI/LandingUI/HeroTitle.css";
import styles from "../UI/LandingUI/ButtonCTA.module.css";
import Web3 from "web3";

function BuyEther() {
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [loggedInMetamask, setLoggedInMetamask] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0.0065);

  const navigation = useNavigate();

  const requiredAmount = 0.0065;

  useEffect(() => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          setUserWalletAddress();
          setTimeout(() => {
            setSpinning(false);
          }, 1500);
          setTimeout(() => {
            setLoggedInMetamask(true);
          }, 1500);
          const web3 = new Web3(provider);
          web3.eth.getBalance(accounts[0], function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(web3.utils.fromWei(result, "ether") + " ETH");
              setAccountBalance(web3.utils.fromWei(result, "ether"));
            }
          });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, []);

  return (
    <div
      className=""
      style={{
        marginTop: "0px",
        // backgroundImage: `url("images/stars.png")`,
        background: "transparent",
      }}
    >
        {/* Comets is good video &floating & neongalaxy */}
         <video src="/videos/comets.mp4" autoPlay loop muted />
      <Container>
        <Row>
          <Col sm={7}>
            <div className="buyeth-title" style={{ marginTop: "150px" }}>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                To create your NFT...
              </h1>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "65px", color: "#fff" }}
              >
                You need some money in your Metamask wallet. Open up the extension in your browser.
              </p>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "25px", color: "#fff" }}
              >
                Add 20$ via your debit card (Revolut, Transferwise, N26 not accepted).
              </p>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "25px", color: "#fff" }}
              >
                Once you have enough funds to proceed a magic button will appear here.
              </p>
              
            </div>
            {accountBalance >= requiredAmount ? <div className="wallet-btns">
        <button
          className={styles.polygon}
          onClick={()=> navigation('/polygonFunds')}
          ><p style={{fontFamily: "Roboto Mono"}}>⚡ YOU CAN NOW PROCEED ⚡</p></button>
          </div> : ''}
          </Col>
          <Col sm={4}>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "-65px",
              }}
            >
              <img src="images/buyeth2.png" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BuyEther;
