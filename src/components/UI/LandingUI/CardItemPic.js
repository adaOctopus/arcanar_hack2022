import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/web";

// POSITIONING OF NFT ANIMATION
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function CardItemPic(props) {
  // Hook For NFT ANIMATION
  const [attrib, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));
  return (
    <>
      <animated.li
        className="cards__item"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{
          transform: attrib.xys.interpolate(trans),
          marginLeft: "0px",
        }}
      >
        <div className="cards__item__link">
          <figure className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.src}
            />
          </figure>

          <div className="cards__item__info">
            <p
              className="cards__item__text"
              style={{ color: "#fff" }}
            >
              {props.text}
            </p>
          </div>
        </div>
      </animated.li>
    </>
  );
}

export default CardItemPic;
