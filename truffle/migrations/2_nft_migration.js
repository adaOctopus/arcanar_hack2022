const NFTContract = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(NFTContract);
};
