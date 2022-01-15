import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../LandingUI/HeroTitle.css";
import { useSpring, animated, config } from "@react-spring/web";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";

// POSITIONING OF NFT ANIMATION
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function WhyPolygon() {
  // Hook For NFT ANIMATION
  const [attrib, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));

  return (
    <div
      className=""
      style={{
        marginTop: "0px",
        // backgroundImage: `url("images/stars.png")`,
        background: "#000",
      }}
    >
       <AnimationOnScroll animateIn="animate__bounceIn">
      <Container>
        <Row>
          <Col sm={8}>
            <div className="polygon-title" style={{ marginTop: "130px" }}>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Built on Polygon.
              </h1>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "75px", color: "#fff"}}
              >
                Polygon is a scaling solution for the Ethereum blockchain. It is fast, cheap, highly secure & environmentally friendly.
              </p>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "40px", color: "#fff" }}
              >
                To create your NFT on the Ethereum network you would need around 70-100$ only for transaction fees. With Polygon is FREE.
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <animated.div
              onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xys: calc(x, y) })
              }
              onMouseLeave={() => set({ xys: [0, 0, 1] })}
              style={{
                transform: attrib.xys.interpolate(trans),
                marginLeft: "-50px",
              }}
            >
              <img src="images/polycoin.png" />
            </animated.div>
          </Col>
        </Row>
      </Container>
      </AnimationOnScroll>
    </div>
  );
}

export default WhyPolygon;
