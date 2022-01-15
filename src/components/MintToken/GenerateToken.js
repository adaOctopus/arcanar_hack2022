//*********************************************//
//*********************************************//
//********** ALL IMPORTS START HERE ***********//

import React, { useState, useEffect } from "react";
import "./MinterForm.css";
import Web3 from "web3";
import { Button } from "../UI/LandingUI/Button";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreator,
  setProject,
  setProjDescription,
  setHashingCode,
  setProjIndustry,
  setProjLink,
  setWalletAddress,
} from "../../redux/slicer/nftSlice";
import html2canvas from "html2canvas";
import { Container, Row, Col } from "react-bootstrap";
import { nftStorageIpfs, contractInteraction } from "../../utils/web3Client";
import { sha256, sha224 } from "js-sha256";
import Identicon from "react-identicons";
import TokenCard from "./TokenCard/Card";
import TokenModal from "../UI/TokenModal/TokenModal";
import { Spinner } from "react-bootstrap";

//********** ALL IMPORTS END HERE *************//
//*********************************************//
//*********************************************//

function UIMinterForm(props) {
  //All state attributes
  const [linkURL, setLinkUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState(null);
  const [founderName, setFounderName] = useState("");
  const [hashData, setHashData] = useState("");
  const [generatedNFT, setGeneratedNFT] = useState(false);
  const [uploadImageVisible, setUploadImageVisible] = useState(false);
  const [readyToBlockchain, setReadyToBlockchain] = useState(false);
  const [isUploadingIpfs, setIsUploadingIpfs] = useState(false);
  const [isCompletedIpfs, setIsCompletedIpfs] = useState(false);
  const [isNftMinted, setIsNftMinted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //{ENDS HERE} All state attributes

  //*********************************************//
  //*********************************************//
  //*********************************************//

  //Download Component As PNG Logic
  const printRef = React.useRef();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: "transparent",
      background: "none",
    });

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `${
        !tokenData.projectName
          ? "my-nft-card"
          : tokenData.projectName.toLowerCase().replace(/\s/g, '')
      }.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setUploadImageVisible(true);
        setGeneratedNFT(false);
      }, 500);
    } else {
      window.open(data);
    }
  };
  // {ENDS HERE} Download Component As PNG Logic

  //*********************************************//
  //*********************************************//
  //*********************************************//

  //Handling NFT Card Upload
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  //{ENDS HERE} Handling NFT Card Upload

  //*********************************************//
  //*********************************************//
  //*********************************************//

  // Accessing url path & redux store state data
  const { pathname } = useLocation();
  const walletData = useSelector((state) => state.wallet);
  const tokenData = useSelector((state) => state.nft);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // {ENDS HERE} Accessing url path & redux

  //*********************************************//
  //*********************************************//
  //*********************************************//

  // Function that generates the uniq hash data
  const hashingData = () => {
    const concatString = projectName + description + founderName + linkURL + industry;
    const hashedData =
      projectName.toLowerCase() + sha256(concatString)
    setHashData(hashedData);
    dispatch(setHashingCode(hashData));
    dispatch(setHashingCode(hashData));
  };
  //{ENDS HERE} Function that generates the uniq hash data

  //*********************************************//
  //*********************************************//
  //*********************************************//

  // Batch Dispatch of the actions that store state in redux slice
  const batchDispatch = () => {
    dispatch(setCreator(founderName));
    dispatch(setProject(projectName));
    // dispatch(setNftImage(imageFile));
    dispatch(setProjLink(linkURL));
    dispatch(setProjIndustry(industry));
    dispatch(setProjDescription(description));
    dispatch(setHashingCode(hashData));
  };
  // {ENDS HERE} Batch Dispatch of the actions that store state in redux slice

  //*********************************************//
  //*********************************************//
  //*********************************************//

  // ALL functions that handle the user input in the form
  const handleFounderName = (e) => {
    setFounderName(e.target.value);
    dispatch(setCreator(e.target.value));
  };

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
    dispatch(setProject(e.target.value));
  };

  const handleImageFile = (e) => {
    setImageFile(e.target.files[0]);
    // dispatch(setNftImage(imageFile));
    setGeneratedNFT(false);
    setReadyToBlockchain(true);
  };

  const handleLinkURL = (e) => {
    setLinkUrl(e.target.value);
    dispatch(setProjLink(e.target.value));
  };

  const handleIndustry = (e) => {
    setIndustry(e.target.value);
    dispatch(setProjIndustry(e.target.value));
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    dispatch(setProjDescription(e.target.value));
  };
  // {ENDS HERE} ALL functions that handle the user input in the form

  //*********************************************//
  //*********************************************//
  //*********************************************//

  // Final Function That Creates NFT on the blockchain
  // web3Client.js has all the functions used in here
  const generateToken = () => {
    setIsUploadingIpfs(true);
    const metadata = {
      projectName: projectName,
      projLink: linkURL,
      creator: founderName,
      projectDescription: description,
      projIndustry: industry,
      imageFile: imageFile,
    };
    nftStorageIpfs(metadata)
      .then((data) => {
        console.log("after this");
        console.log(data);
        let urlPath = data.url;
        let cleanURL = urlPath.substring(urlPath.indexOf("/") + 2);
        const nftURL = `https://ipfs.io/ipfs/${cleanURL}`;
        console.log("Congrats Non-Fungible Token created successfully! 🥂");
        console.log(nftURL);
        //console.log(`https://ipfs.io/${data.url}`);
        contractInteraction(nftURL,1).then((data) => {
          console.log(data);
          //Open Sea path
          // https://testnets.opensea.io/assets/0x2407b1f1a63c00be111258b67a05c32f68aafc95/1
          setTimeout(() => {

            setIsUploadingIpfs(false);
            setIsCompletedIpfs(true);
            setShowModal(true);
  
          }, 500)
        }).catch((error)=> console.log(error));
      })
      .catch((error) => console.log(error));
  };
  //{ENDS HERE} Final Function That Creates NFT on the blockchain

  //*********************************************//
  //*********************************************//
  //*********************************************//

    // Function that moves the Metamask back to the ethereum network to bridge funds
    // const quietMoveToPolygon = () => {
    //   let ethereum = window.ethereum;
    //   const web3 = new Web3(ethereum);
    //   let mumbaiTestnetID = 80001;
    //   mumbaiTestnetID = web3.utils.toHex(mumbaiTestnetID);
    //   try {
    //     ethereum.request({
    //       method: 'wallet_switchEthereumChain',
    //       params: [{ chainId: mumbaiTestnetID }],
    //     }).then(()=>console.log('switched to mumbai'));
    //   } catch (switchError) {
    //     console.log(switchError.message);
    //   }
  
    // }
    ////////////////////////////////////////////////////////////////////////////////

  // Function that handles the Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const metadata = {
      projectName: projectName,
      projLink: linkURL,
      founderName: founderName,
      projectDescription: description,
      projIndustry: industry,
      // imageFile: imageFile,
    };
    props.readMetadata(metadata);
    batchDispatch();
    setGeneratedNFT(true);
  };
  // {ENDS HERE} Function that handles the Form Submission ENDS HERE

  //*********************************************//
  //*********************************************//
  //*********************************************//
  return (
    <div
      className="hero-container"
      style={{
        marginTop: "00px",
        // backgroundImage: `url("images/mintbak.png")`,
        // backgroundColor: "#fff"
      }}
    >
      <video src="/videos/nebulano.mp4" autoPlay loop muted />
      <Container>
        <Row>
          <Col>
            <div className="container" style={{ marginTop: "50px" }}>
              <h3
                style={{
                  fontWeight: "900",
                  fontFamily: "Roboto",
                  color: "#fff",
                  marginLeft: "10px",
                }}
              >
                {" "}
              </h3>
              <form id="form" onSubmit={handleSubmit}>
                <div className="input-container">
                  <div></div>
                  <input
                    onChange={handleProjectName}
                    value={projectName}
                    style={{
                      fontFamily: "Roboto Mono",
                      letterSpacing: "-1px",
                      color: "#fff",
                      background: "rgba(255, 255, 255, 0.15)",
                    }}
                    type="text"
                    placeholder="  Your project's name"
                    required
                  />
                </div>

                <div className="input-container">
                  {/* <h4>Founder's Name</h4> */}
                  <input
                    onChange={handleFounderName}
                    value={founderName}
                    style={{
                      fontFamily: "Roboto Mono",
                      color: "#fff",
                      letterSpacing: "-1px",
                      background: "rgba(255, 255, 255, 0.15)",
                    }}
                    type="text"
                    placeholder="  Creator(s) name(s)"
                    required
                  />
                </div>

                <div className="input-container">
                  {/* <h4 style={{color: "#F0F0F0", fontFamily:"Roboto"}}>Linkedin Profile</h4> */}
                  <input
                    onChange={handleLinkURL}
                    value={linkURL}
                    style={{
                      fontFamily: "Roboto Mono",
                      letterSpacing: "-1px",
                      color: "#fff",
                      background: "rgba(255, 255, 255, 0.15)",
                    }}
                    type="text"
                    placeholder="  Your project's social link or website"
                    required
                  />
                </div>

                <div className="input-container">
                  <select
                    value={industry}
                    onChange={handleIndustry}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      fontFamily: "Roboto Mono",
                      color: "#CAC9CA",
                      width: "70%",
                      padding: "10px",
                      fontSize: "16px",
                      letterSpacing: "-1px"
                    }}
                  >
                    <option
                      defaultValue="Project's Industry"
                      value=""
                      style={{ color: "#000", fontFamily: "Roboto Mono" }}
                    >
                      Your Project's Industry
                    </option>
                    <option
                      value="Artificial Intelligence"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Artificial Intelligence
                    </option>
                    <option
                      value="Blockchain"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Blockchain
                    </option>
                    <option
                      value="Crypto"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Crypto
                    </option>
                    <option
                      value="Consumer Product"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Consumer Product
                    </option>
                    <option
                      value="Ecommerce"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Ecommerce
                    </option>
                    <option
                      value="Education Tech"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Education Tech
                    </option>
                    <option
                      value="Financial Tech"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Financial Tech
                    </option>
                    <option
                      value="Marketplace"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Marketplace
                    </option>
                    <option
                      value="Marketing Tool"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Marketing Tool
                    </option>
                    <option
                      value="Non technical product"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Non technical product
                    </option>
                    <option
                      value="Other"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Other
                    </option>
                    <option
                      value="SaaS"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      SaaS
                    </option>
                    <option
                      value="Service"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono" }}
                    >
                      Service
                    </option>
                    <option
                      value="Social media"
                      style={{ color: "#000", fontWeight: "700", fontFamily: "Roboto Mono"}}
                    >
                      Social media
                    </option>
                  </select>
                </div>

                <div className="input-container">
                  {/* <h4 style={{color: "#F0F0F0", fontFamily:"Roboto"}}>What does it do?</h4> */}

                  <input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      fontFamily: "Roboto Mono",
                      color: "#fff",
                      letterSpacing: "-1px"
                    }}
                    value={description}
                    onChange={handleDescription}
                    type="textarea"
                    placeholder="  What's your project about (100 chars max)"
                    required
                  />
                </div>
                {!uploadImageVisible ? (
                  ""
                ) : (
                  <div className="input-container">
                    <input
                      style={{ borderColor: "transparent", display: "none" }}
                      type="file"
                      id="imageFile"
                      onChange={handleImageFile}
                      ref={hiddenFileInput}
                    />
                    <button
                      style={{
                        color: "#fff",
                        height: "40px",
                        width: "50%",
                        // backgroundImage:
                        //   "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
                        backgroundColor: "#4c32ff",
                      }}
                      onClick={handleClick}
                    >
                      <p
                        style={{
                          marginTop: "-5px",
                          fontFamily: "Roboto Mono",
                          fontWeight: "200",
                          fontSize: "15px",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        <p style={{fontFamily: "Roboto Mono", letterSpacing: "-1px"}}>
                          {!imageFile ? (
                            " Upload created NFT 📁"
                          ) : (
                            <p>{imageFile.name} ✔️</p>
                          )}
                        </p>
                      </p>
                    </button>
                  </div>
                )}

                {!readyToBlockchain ? (
                  <button
                    style={{
                      color: "#fff",
                      height: "50px",
                      fontWeight: "200",
                      fontFamily: "Roboto Mono",
                      backgroundImage:
                        "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
                    }}
                    onClick={() => {
                      hashingData();
                      hashingData();
                    }}
                  >
                    <p
                      style={{
                        marginTop: "-5px",
                        fontFamily: "Roboto Mono",
                        // fontWeight: "500",
                        fontSize: "18px",
                      }}
                    >
                      GENERATE NFT CARD
                    </p>
                  </button>
                ) : (
                  <button
                    style={{
                      color: "#fff",
                      height: "50px",
                      fontWeight: "500",
                      fontFamily: "Roboto",
                      backgroundColor: "#fff"
                      // "#20e3b2",
                    }}
                    onClick={() => {
                      // quietMoveToPolygon();
                      generateToken();
                    }}
                  >
                    <p
                      style={{
                        marginTop: "-4px",
                        fontFamily: "Roboto",
                        fontWeight: "700",
                        letterSpacing: "-0.5px",
                        fontSize: "16.5px",
                        color: "#000",
                      }}
                    >
                      
                      {!isCompletedIpfs ? 'RELEASE NFT NOW' : 'NFT RELEASED ✔️'}
                      {isUploadingIpfs ? (
                        <span style={{ marginTop: "-30%" }}>
                          <Spinner
                            animation="border"
                            size="sm"
                            variant="dark"
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </button>
                 
                )}
                 <div style={{marginTop:"10px", marginLeft: "10px", fontFamily: "Roboto Mono"}}>
                 {isUploadingIpfs ? 'Do not refresh page 🙏🏽 Magic 🧙‍♀️ is happening...' : ''}
                   </div>
                <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                
                <TokenModal show={showModal}
                            onHide={() => setShowModal(false)}></TokenModal>
                            
                </div>
              </form>
            </div>
          </Col>
          <Col ref={printRef}>
            {/* ANIMATED NFT COMPONENT STARTS */}
            {/* I AM HERE FIGURING OUT PROPS */}
            <div  style={uploadImageVisible || generatedNFT  ? { marginTop: "90px"} : { marginTop: "60px"}}>
              <TokenCard />
            </div>
            <div>
              <h1 style={{color:"transparent", marginTop: "-30px"}}>Your NFT</h1>
            </div>

            {/* ANIMATED NFT COMPONENT ENDS */}
          </Col>
        </Row>
        <Row>
          <Col>
            {!generatedNFT ? (
              ""
            ) : generatedNFT && !uploadImageVisible ? (
              <div
                className="container"
                // style={{ marginTop: "40px", marginLeft: "-110px" }}
              >
                <Button
                  type="button"
                  onClick={handleDownloadImage}
                  buttonStyle="btn--outline"
                >
                  <span style={{ padding: "15px" }}>Download NFT</span>
                </Button>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UIMinterForm;
