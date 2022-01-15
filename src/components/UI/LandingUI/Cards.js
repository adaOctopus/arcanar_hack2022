import React from "react";
import "./Cards.css";
import "./HeroTitle.css"
import CardItemPic from "./CardItemPic";

function Cards() {
  return (
    <div className="project-title" style={{ backgroundImage: `url("images/stars.png")`, marginTop: "130px"}}>
      <h1
        className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
        data-aos="zoom-y-out"
        style={{padding: "20px"}}
      >
        Great for all your projects.
      </h1>
      <div className="cards" style={{ backgroundImage: `url("images/stars.png")` }}>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItemPic
                style={{ fontFamily: "Roboto" }}
                src="images/nftuniq.png"
                text="Your NFT will represent your full ownership of the project and will live on the blockchain for an eternity."
                // label='Adventure'
                //path='/services'
              />
              <CardItemPic
                src="images/openwire.png"
                text="Your NFT will be instantly available on OpenSea, the biggest marketplace for NFTs on the planet with millions of users."
                // label='Luxury'
                path="/services"
              />
            </ul>
            <ul className="cards__items">
              <CardItemPic
                style={{ fontFamily: "Roboto" }}
                src="images/dijinet.png"
                text="Millions of people will buy/sell your NFT and you will be making commissions out of every single transaction."
                // label='Adventure'
                //path='/services'
              />
              <CardItemPic
                src="images/charityfun.png"
                text="Be a part of a movement. For every NFT that gets created here we send 10% of our revenue to charity."
                // label='Luxury'
                path="/services"
              />
            </ul>
            {/* <ul className="cards__items">
              <CardItem
                src="images/nft.jpg"
                text="Millions of investors can buy/sell your whole NFT or portions of it as equity. You will be making money out of every single transaction."
                // label='Mystery'
                path="/services"
              />
              <CardItem
                src="images/block.jpg"
                text="Experience Football on Top of the Himilayan Mountains"
                // label='Adventure'
                path="/products"
              />
              <CardItem
                src="images/wired.jpg"
                text="Ride through the Sahara Desert on a guided camel tour"
                // label='Adrenaline'
                path="/sign-up"
              />
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
