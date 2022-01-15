import React from 'react'
import { Modal, Loader, Button } from 'react-bootstrap';
import './TokenModal.css';
import styles from "../../UI/LandingUI/ButtonCTA.module.css";
import "../../UI/LandingUI/HeroSection.css"

function TokenModal(props) {

    return (
        <Modal
        {...props}
        className="my-modal text-center"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ justifyContent: "center", marginTop: "20px"}}>
          <Modal.Title id="contained-modal-title-vcenter" style={{color: "#fff", textAlign: "center"}}>
              Awesome. Your NFT is ready 🎉
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <button
          className={styles.wallet}
          style={{
            fontSize: "18px",
            marginTop: "20px",
            fontWeight: "600",
            fontFamily: "Roboto Mono",
            color: "#000",
            underline: "none",
            textDecoration: "none",
            borderColor: "#4c32ff",
          }}
        >View on OpenSea</button>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: "transparent", fontFamily: "Roboto Mono"}} onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default TokenModal
