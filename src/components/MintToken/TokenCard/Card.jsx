import React from "react";
import { EthereumIcom, ClockIcon, ViewIcon } from "../../../assets/svg";
import { BoxShadow, Card as StyledCard } from "./StyledCard";
import image from "../../../assets/img/image-avatar.png";
import { Flex } from "../../../assets/style/variables";
import { useSelector } from "react-redux";
import Identicon from "react-identicons";
import { useSpring, animated, config } from "@react-spring/web";

// POSITIONING OF NFT ANIMATION
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function TokenCard() {
  const tokenData = useSelector((state) => state.nft);
  // Hook For NFT ANIMATION
  const [attrib, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));

  const todayDate = new Date();
  const dateOftoday = todayDate.getDate().toString();
  const monthOftoday = todayDate.getMonth().toString();
  const yearOftoday = todayDate.getFullYear().toString();

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
              {!tokenData.cryptoHash ? (
                ""
              ) : (
                <div
                  style={{
                    marginLeft: "95px",
                    marginTop: "65px",
                    alignItems: "center",
                    justifyContent: "center",

                    boxShadow: "rgb(254, 254, 254) 0px 7px 29px 0px;",
                  }}
                >
                  <Identicon string={tokenData.cryptoHash} size="100" />
                </div>
              )}

              {!tokenData.cryptoHash ? (
                <div style={{ marginLeft: "120px", marginTop: "80px" }}></div>
              ) : (
                ""
              )}
            </div>
            <div
              className="card__text-cont"
              style={{
                whiteSpace: "pre-wrap",
                whiteSppace: "-moz-pre-wrap",
                whiteSpace: "-pre-wrap",
                whiteSpace: "-o-pre-wrap",
                wordWrap: "break-word",
                marginTop: "0px",
              }}
            >
              <h3
                style={{
                  fontWeight: "300",
                  fontFamily: "Roboto Mono",
                  letterSpacing: "-1px",
                  marginTop: "10px",
                }}
              >
                {!tokenData.projectName
                  ? "{ Your Project Name }"
                  : tokenData.projectName.substr(0,26)}
              </h3>
              <p
                style={{
                  color: "#fff",
                  fontStyle: "italic",
                  marginTop: "-5px",
                  fontFamily: "Roboto Mono",
                  letterSpacing: "-0.5px",
                }}
              >
                {!tokenData.projIndustry ? (
                  "{ Project Industry }"
                ) : (
                  <p style={{ color: "#E9E8E9", fontWeight: "500" }}>
                    {tokenData.projIndustry}
                  </p>
                )}
              </p>

              <p
                style={{
                  color: "#E9E8E9",
                  fontStyle: "italic",
                  fontFamily: "Roboto Mono",
                  letterSpacing: "-0.5px",
                  
                }}
              >
                {!tokenData.projectDescription ? (
                  "{ Project Details }"
                ) : (
                  <p style={{color:"#fff", fontWeight: "500"}}>{tokenData.projectDescription.substr(0, 100)}</p>
                )}
              </p>
            </div>
            <Flex className="card__info-row">
              <Flex>
                {/* <EthereumIcom /> */}
                <span
                  className="card__info-box-left"
                  style={{ fontFamily: "Roboto Mono", letterSpacing: "-0.5px" }}
                >
                  {!tokenData.cryptoHash ? (
                    "{ Your NFT ID will go here }"
                  ) : (
                    <p style={{ fontWeight: "600" }}>
                      <span style={{ color: "#fff" }}>
                        <span className="">
                          <img width="17px" src="images/polygon.png" />
                        </span>
                      </span>{" "}
                      <span style={{ marginLeft: "4px" }}>
                        {!tokenData.projectName
                          ? ""
                          : tokenData.projectName.substr(0, 6)}
                        {tokenData.cryptoHash.substr(25, 28)}{" "}
                      </span>
                      <span style={{ color: "#fff" }}>
                        <span className="" style={{marginLeft: "3px"}}>
                          <img width="17px" src="images/polygon.png" />
                        </span>
                      </span>{" "}
                    </p>
                  )}
                </span>
              </Flex>
              {/* <Flex>
                <ClockIcon />
                <span className="card__info-box-right">
                  {dateOftoday}
                  {"-"}
                  {monthOftoday}
                  {"-"}
                  {yearOftoday}{" "}
                </span>
              </Flex> */}
            </Flex>
            <div className="card__footer">
              {!tokenData.founderName ? (
                <p style={{ fontFamily: "Roboto Mono", color: "#fff" }}>
                  Created by:
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "Roboto Mono",
                    color: "#fff",
                    fontWeight: "100",
                  }}
                >
                  <span style={{ color: "#fefefe", fontFamily: "Roboto Mono" }}>
                    Created by:
                  </span>{" "}
                  <span style={{color: "#00fff7", fontFamily: "Roboto Mono"}}>{tokenData.founderName.substr(0, 68)}💎</span>
                </p>
              )}
            </div>
          </StyledCard>
        </BoxShadow>
      </BoxShadow>
    </animated.div>
  );
}

export default TokenCard;
