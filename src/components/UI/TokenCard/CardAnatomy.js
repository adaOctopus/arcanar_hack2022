import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import '../LandingUI/HeroTitle.css'

function CardAnatomy() {
  return (
    <div
      className=""
      style={{
        // marginTop: "50px",
        // marginBottom: "50px",
        // backgroundImage: `url("images/stars.png")`,
        backgroundColor: "#000"
      }}
    >
     
      <Container>
        
        <Row>
        <Col sm={4}>
            <div>
              <Card />
              {/* <img src="images/vector2.png"/> */}
            </div>
          </Col>
          <Col sm={8}>
            <div className="anatomy-title" style={{marginTop:"50px"}}>
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{borderColor:"#000"}}
              >
                Unique NFT Card.
              </h1>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{marginTop: "85px",color:"#fff"}}
              >
                Your NFT gets generated based on your project's information and it is UNIQUE.
              </p>
              <p
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
                style={{marginTop: "45px",color:"#fff"}}
              >
                The NFT card token will be the digital representation of your project in the blockchain.
              </p>
            </div>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}

export default CardAnatomy;
