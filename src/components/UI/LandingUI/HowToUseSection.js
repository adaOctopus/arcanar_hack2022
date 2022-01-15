import React from "react";
import "./HowToUseSection.css";
import CardItemPic from "./CardItemPic";
import styles from "./ButtonCTA.module.css";
import "./HeroTitle.css"
import { useNavigate} from 'react-router-dom';


function HowToUseSection() {

    const navigation = useNavigate();
  return (
    <div className="how-to-title" style={{ marginTop:"0px", backgroundColor: "#000"}}>
      {/* style={{ backgroundImage: `url("images/stars.png")` }} */}
        <h1
        style={{
          fontFamily: "Roboto",
          fontWeight: "900",
          fontSize: "60px",
          color: "transparent",
          marginTop: "-10px"
        }}
      >
        Keep reading...
      </h1>
      <h1
        style={{
          color: "#fff",
          marginTop: "50px"
        }}
      >
        Start now.
      </h1>
      <div className="howcards" style={{backgroundColor:"#000"}}>
        {/* style={{ backgroundImage: `url("images/stars.png")` }} */}
        <div className="howcards__container">
          <div className="howcards__wrapper">
            <ul className="cards__items" >
              <CardItemPic
                src="images/woleta.png"
                text="Install Metamask extension."
                // label='Mystery'
                path="/services"
              />
              <CardItemPic
                src="images/ownership2.png"
                text="Turn your project's into an NFT in seconds."
                // label='Adventure'
                path="/products"
              />
              <CardItemPic
              
                src="images/money2.png"
                text="Make money on every NFT marketplace."
                // label='Adrenaline'
                path="/sign-up"
              />
            </ul>
          </div>
          <div className="hero-btns" style={{marginTop: "-30px"}}>
          <button className={styles.grad} style={{borderColor: "#000",}} onClick={()=> navigation('/connectWallet')}>
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
              START NOW
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
       
      </div>
    </div>
  );
}

export default HowToUseSection;
