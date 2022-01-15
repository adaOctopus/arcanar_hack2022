import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [loggedInMetamask, setLoggedInMetamask] = useState(false);
  const navigation = useNavigate();

  const { pathname } = useLocation();
  const walletData = useSelector((state) => state.wallet.wallet);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          setUserWalletAddress(accounts[0]);
          setTimeout(() => {
            setLoggedInMetamask(true);
            const data = {
              walletAddress: accounts[0],
              loggedMetamask: true,
            };
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      alert("Oops you dont have Metamask. Lets install it real quick!");
      navigation("/connectWallet");
      console.log("thsi is it clicked");
    }
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div
          className=""
          // style={{ backgroundImage: `url("images/mintoras.png")` }}
        >
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu} style={{textDecoration: "none"}}>
          <h4
                style={{
                  fontFamily: "Roboto Mono",
                  fontWeight: "700",
                  textDecoration: "none",
                  fontSize: "22px",
                  marginTop:"-18px"
                }}
              >
               arcanar
              </h4>
           
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"} style={{marginTop: "-40px", marginBottom: "-20px",marginLeft: "120px"}}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li> */}

            {userWalletAddress == "" || pathname!= '/generateToken' ? (
              ""
            ) : (
              
                <Button variant="outline-dark"
                  style={{ fontFamily: "Roboto", fontSize: "15px", marginTop: "10px"}}
                  
                >
                  <p style={{fontWeight: "700", fontFamily: "Roboto Mono", color: "#fff", letterSpacing: "-1px"}}>
                    My wallet{" "}
                    <span className="">
                      <img width="20px" src="images/metamask.png" />
                    </span>: <span style={{color: "hsl(178, 100%, 50%)", fontWeight: "700",fontFamily: "Roboto Mono",}}>...{userWalletAddress.substr(20,22)}</span>
                  </p>
                </Button>
              
            )}

            {/* {walletData.walletAddress == '' && pathname != "/generateToken" ? (
             ''
            ) : (walletData.walletAddress != '' &&
              pathname == "/generateToken") ? (
              <li>
                <Button
                  style={{ fontFamily: "Roboto", fontSize: "15px" }}
                  buttonStyle="btn--outline"
                >
                   <p>{walletData.walletAddress}</p>
                </Button>
              </li>
            ) : (
              ""
            )} */}
            {/* {pathname != "/generateToken" && pathname != "/connectWallet" ? (
              <li>
                <Link to="/connectWallet">
                  <Button style={{fontFamily:"Roboto", fontSize: "15px"}} buttonStyle="btn--outline">LAUNCH APP</Button>
                </Link>
              </li>
            ) : (
              ''
              // <li>
                
                  <p style={{fontSize: "15px",color:"#fff"}}>power by <span className="">
                <img  width="45px" src="images/metamask.png"/>
              </span></p>
                
              // </li>
            )} */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
