const NFTContract = artifacts.require("NFT");

module.exports = function (deployer) {
  const trustedForwarder = "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b";
  deployer.deploy(NFTContract,trustedForwarder );
};
