import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import {Biconomy} from "@biconomy/mexa";
import Web3 from "web3";
import NFT from "contracts/NFT.json";
import { create } from "ipfs-http-client";
// import { POSClient } from "@maticnetwork/maticjs";
import { NFTStorage, File } from "nft.storage";
import { Alert } from "react-bootstrap";

// ***  Configurations for different networks & RPCs
// nft.storage configurations
const apiKey = process.env.REACT_APP_NFT_STORAGE_TOKEN;
const nftClient = new NFTStorage({ token: apiKey });
// web3.storage configurations
const web3_token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
const web3Client = new Web3Storage({ token: web3_token });

let selectedAccount;
let nftContract;
let arcanarContract;
let isInitialised = false;

// Creating IPFS instance from the infura account
const projectId = "20MlWf8MyFnQI6NhcaTggcqdqgx";
const projectSecret = "eef35cd31f6f4c9e716bb224ab854c4d";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfsClient = create({
  url: "https://ipfs.infura.io:5001",
  headers: {
    authorization: auth,
  },
});
////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Biconomy DApp tutorial - Defining data structures for message sign
let domainData = {
  name: "Arcanar DApp",
  version: "1",
  chainId : "80001", // Kovan
  verifyingContract: "0x02518A06dcd610aD68728E8eAd22dC26B97e1D33"
};
const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" }
];
const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

let message = {};
message.nonce = "1";
message.from = selectedAccount;

const dataToSign = JSON.stringify({
    types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// Enabling Biconomy Relayers for Meta Transactions ////////////////////////
// let infura_provider = new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/bed32ebaaacb44959342fc2eacbdb3d7');
// const biconomy = new Biconomy(infura_provider,{apiKey: 't_gkqtgTd.a93b199c-77be-46d3-bf5a-6b385b032552', debug: true});
// const biconomyWeb3 = new Web3(biconomy);
////////////////////////////////////////////////////////////////////////////

// Main function to check if Metamask installed and access the wallet address
export const init = async () => {
  let provider = window.ethereum;
  // the [provider] here is what has isMetamask, chainId, network version, selectedAddress etc etc
  if (typeof provider !== "undefined") {

    // Start Biconomy Initialization
    await provider.enable();
    const biconomy = new Biconomy(provider,{apiKey: 't_gkqtgTd.a93b199c-77be-46d3-bf5a-6b385b032552', debug: true});
    const biconomyWeb3 = new Web3(biconomy);
    biconomy.onEvent(biconomy.READY, () => {
      arcanarContract = new biconomyWeb3.eth.Contract(
        NFT.abi,
        NFT.networks[networkId].address
      );
      provider
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is: ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    }).onEvent(biconomy.ERROR, (error, message) => {
      console.log(error)
    });

    // window.ethereum.on("accountsChanged", function (accounts) {
    //   selectedAccount = accounts[0];
    //   console.log(`Selected account changed to ${selectedAccount}`);
    // });

    // const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();
    // nftContract = new web3.eth.Contract(
    //   NFT.abi,
    //   NFT.networks[networkId].address
    // );
    // console.log(nftContract);

    isInitialised = true;
  } else {
    Alert("Oops, Metamask not installed!");
  }
};
////////////////////////////////////////////////////////////////////

// Create contract interaction function to mint NFT token
export const contractInteraction = async (metadataURI, amount) => {
  if (!isInitialised) {
    await init();
  }
  let provider = window.ethereum;
  const biconomy = new Biconomy(provider,{apiKey: 't_gkqtgTd.a93b199c-77be-46d3-bf5a-6b385b032552', debug: true});
  const biconomyWeb3 = new Web3(biconomy);
  return biconomyWeb3.currentProvider.sendAsync(
   {
      jsonrpc: "2.0",
      id: 999999999999,
      method: "eth_signTypedData_v4",
      params: [selectedAccount, dataToSign]
   },
   function(err, result) {
       if (err) {
           return console.error(err);
       }
       const signature = result.result.substring(2);
       const r = "0x" + signature.substring(0, 64);
       const s = "0x" + signature.substring(64, 128);
       const v = parseInt(signature.substring(128, 130), 16);
       },
       
       arcanarContract.methods
             .createProduct(selectedAccount,metadataURI, r, s, v, amount)
             .send({
               from: selectedAccount
             })
   );
};
////////////////////////////////////////////////////////////////

// Add file to ipfs storage
export const ipfsAction = async (item) => {
  try {
    const addFileToIpfs = await ipfsClient.add(item);
    console.log(`${addFileToIpfs.path}`);
    const url = `https://ipfs.infura.io:5001/${addFileToIpfs.path}`;
    return url;
  } catch (error) {
    console.log(error.message);
  }
};
////////////////////////////////////////////////////////////////////

// Get the cid of the file from wEB3 Client
export const storeFiles = async (files) => {
  const cid = await web3Client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
};
////////////////////////////////////////////////////////////////////

// nft.storage -> Store nft metadata to ipfs -> Open Sea compatible
export const nftStorageIpfs = async (data) => {
  const metadata = await nftClient.store({
    name: data.projectName,
    description: data.projectDescription,
    linkURL: data.projLink,
    founderName: data.creator,
    industry: data.projIndustry,
    image: data.imageFile,
  });

  return metadata;
  //https://ipfs.io/ipfs/bafyreiaxfot4dn3zqpcxjzu7wqkwayty7yknp6bno42zkxqnvxd2v4eddy/metadata.json
};
////////////////////////////////////////////////////////////////////

