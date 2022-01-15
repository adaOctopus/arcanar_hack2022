import React from 'react'
import { Modal, Loader, Button } from 'react-bootstrap';
import './PolygonModal.css';
import styles from "../../../UI/LandingUI/ButtonCTA.module.css";
import "../../../UI/LandingUI/HeroSection.css"

function PolygonModal(props) {

    return (
        <Modal
        {...props}
        className="polygon-modal text-center"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        fullscreen="true"
        centered
      >
        {/* <Modal.Header closeButton style={{ justifyContent: "center", marginTop: "20px"}}>
          <Modal.Title id="contained-modal-title-vcenter" style={{color: "#fff", textAlign: "center"}}>
              
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: "transparent", fontFamily: "Roboto Mono"}} onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
        <iframe style={{height:"100%", borderRadius: "50px", backgroundColor: "transparent", border: "none"}}
                              src="https://wallet-dev.polygon.technology/login" />
      </Modal>
    );
}

export default PolygonModal
