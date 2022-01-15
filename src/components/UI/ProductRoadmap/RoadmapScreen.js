import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "./RoadmapScreen.css";

function RoadmapScreen() {
  return (
    <div className="roadmap-container">
      <Container>
        <Row>
          <Col>
            <div className="roadmap-title">
              <h1>Roadmap.</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <AnimationOnScroll animateIn="animate__bounceIn">
              <Card className="roadmap-card">
                <Card.Header className="roadmap-header">
                  Phase 0 - Current
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm={3}>
                        <img src="images/zero.png" width="150" />
                      </Col>
                      <Col sm={9}>
                        <Card.Title className="roadmap-title">
                          Project owners to create NFTs and monetize their
                          projects faster than ever.
                        </Card.Title>
                        <Card.Text className="roadmap-text">
                          Deploy ERC1155 smart contract for NFTs on Polygon
                          blockchain. Enable meta transactions for users to
                          create NFTs for FREE.
                        </Card.Text>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </AnimationOnScroll>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <AnimationOnScroll animateIn="animate__bounceIn">
              <Card className="roadmap-card">
                <Card.Header className="roadmap-header">
                  Phase 1 - End of H1 2022
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm={3}>
                        <img src="images/one.png" width="150" />
                      </Col>
                      <Col sm={9}>
                        <Card.Title className="roadmap-title">
                          Launch your own Crypto. Your customers can use it to
                          get discounts & other benefits.
                        </Card.Title>
                        <Card.Text className="roadmap-text">
                          Launch your own crypto token with a few clicks. No
                          code. Your customers can use it to earn benefits &
                          investors to fund your project.
                        </Card.Text>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </AnimationOnScroll>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <AnimationOnScroll animateIn="animate__bounceIn">
              <Card className="roadmap-card">
                <Card.Header className="roadmap-header">
                  Phase Infinity - By End of 2022
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm={3}>
                        <img src="images/infinity.png" width="150" />
                      </Col>
                      <Col sm={9}>
                        <Card.Title className="roadmap-title">
                          Integrate Arcanar across ETH 2.0 - Polygon - Cardano
                          ecosystems for a green planet.
                        </Card.Title>
                        <Card.Text className="roadmap-text">
                          Integrate between all the major Proof Of Stake
                          protocols to make our planet greener. Partner with
                          Charity foundations to make our world a better place.
                        </Card.Text>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </AnimationOnScroll>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RoadmapScreen;
