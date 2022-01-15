import React from "react";
import { EthereumIcom, ClockIcon, ViewIcon } from "../../../assets/svg";
import { BoxShadow, Card as StyledCard } from "./StyledCard";
import image from "../../../assets/img/spacy.gif";
import { Flex } from "../../../assets/style/variables";
import { useSpring, animated, config } from "@react-spring/web";

// POSITIONING OF NFT ANIMATION
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;


function Card() {

// Hook For NFT ANIMATION
  const [attrib, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));

  return (
    <animated.div
    onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
    onMouseLeave={() => set({ xys: [0, 0, 1] })}
    style={{
      transform: attrib.xys.interpolate(trans),
      marginLeft: "0px",
    }}
  >
    {" "}
    <BoxShadow size="30px" color="transparent">
      <BoxShadow color="transparent">
        <StyledCard>
          <div className="card__img">
            <div className="card__visible">
              <div className="card__visible-icon">
                <ViewIcon />
              </div>
            </div>
          </div>
          <div className="card__text-cont" >
            <h3 style={{fontFamily: "Roboto Mono"}}>Arcanar 3.0</h3>
            <h5 style={{marginTop:"-3px", fontFamily: "Roboto Mono"}}>Blockchain Dapp</h5>
            <p style={{fontFamily: "Roboto Mono"}}> Monetize your project by turning it into an NFT.</p>
          </div>
          <Flex className="card__info-row">
            <Flex>
            <span className="card__info-box-left" style={{ fontFamily: "Roboto Mono"}}>ID: </span>
             
              <span className="card__info-box-left" style={{fontWeight: "800", fontFamily: "Roboto Mono"}}>Arcanar78esn84qngweQx </span>
              {/* <EthereumIcom /> */}
            </Flex>
            <Flex>
              {/* <ClockIcon /> */}
              <span className="card__info-box-right"></span>
            </Flex>
          </Flex>
          <div className="card__footer">
            <Flex gap="15px" justify="flex-start">
              {/* <div className="avatar">
                <img src={image} alt="avatar" style={{borderRadius: "20px"}} />
              </div> */}
              <p style={{marginTop:"-8px", fontFamily: "Roboto Mono"}}>
                Creation of <span style={{fontFamily: "Roboto Mono", letterSpacing: "-1px"}}>Web3 Movement ❤️</span>
              </p>
            </Flex>
          </div>
        </StyledCard>
      </BoxShadow>
    </BoxShadow>
    </animated.div>
  );
}

export default Card;
