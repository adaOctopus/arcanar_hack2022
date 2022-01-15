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

function ValueProposition() {
  // Hook For NFT ANIMATION
  const [attrib, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));

  return (
    <div
      className=""
      style={{
        marginTop: "-100px",
        // backgroundImage: `url("images/stars.png")`,
        background: "#000",
      }}
    >
      <Container>
      <AnimationOnScroll animateIn="animate__bounceIn">
        <Row>
          <Col sm={8}>
            <div className="proposition-title" style={{ marginTop: "150px" }}>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Why use Arcanar?
              </h1>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "75px", color: "#fff"}}
              >
                We create & publish your NFT in seconds. <br/> Everyone can easily buy, sell or invest in your NFT. You make money in every transaction.
              </p>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{ marginTop: "40px", color: "#fff" }}
              >
                We are integrated with Open Sea, Rarible and every other major NFT marketplace.
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
                marginLeft: "0px",
              }}
            >
              <img src="images/starza.png" />
            </animated.div>
          </Col>
        </Row>
        </AnimationOnScroll>
      </Container>
    </div>
  );
}

export default ValueProposition;
