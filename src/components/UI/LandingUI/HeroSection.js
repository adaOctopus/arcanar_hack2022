import React from "react";
import "../../../App.css";
import "./HeroSection.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ButtonCTA.module.css";

function HeroSection() {
  const navigation = useNavigate();
  return (
    <div className="hero-container" style={{marginTop: "80px"}}>
      {/* style={{ backgroundImage: `url("images/stars.png")` }} */}
      <video src="/videos/planet3.mp4" autoPlay loop muted />
      <h1
        className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
        data-aos="zoom-y-out"
      >
         Monetize your project today.
      </h1>
      <p
        className="text-5xl md:text-6xl leading-tighter tracking-tighter mb-4"
        data-aos="zoom-y-out"
        style={{ fontWeight: "50px", fontFamily: "Roboto Mono",}}
      >
        We turn your project into an NFT and you make money.
      </p>
      <div className="hero-btns">
        <button
          className={styles.grad}
          onClick={() => navigation("/connectWallet")}
        >
          <span
            style={{
              fontSize: "19px",
              fontFamily: "Roboto Mono",
              fontWeight: "600",
              color: "#000",
              underline: "none",
              textDecoration: "transparent",
            }}
          >
            GET STARTED
          </span>
        </button>
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
  );
}

export default HeroSection;
