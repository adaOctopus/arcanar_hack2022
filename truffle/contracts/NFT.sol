// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract NFT is ERC1155, ERC2771Context {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    address payable public owner;

     // Contract name
    string public name;
    
    //defining
    event MintToken(address _address, uint256 _tokenId);
    struct Stock {
        address _nftOwner;
        uint256 _nftId;
        string _nftUri;
    }
    
    mapping( uint256 => Stock) StockCollection;
    
    //constructor
     constructor(address trustedForwarder) ERC1155('') ERC2771Context(trustedForwarder){
        owner = payable(msg.sender);
    }

    function _msgSender() internal override(Context, ERC2771Context)
      view returns (address) {
       return ERC2771Context._msgSender();
    }

     function _msgData() internal override(Context, ERC2771Context)
      view returns (bytes memory) {
       return ERC2771Context._msgData();
    }

    
    // check the ether balance of the smart contract
    function getBalance() view public returns(uint256 amount){
        return address(this).balance;
    }
    
    // return the uri based on the token_id
    function uri(uint256 tokenId) public view override returns (string memory) {
        return StockCollection[tokenId]._nftUri;
    }

    
    // mint the nft token
    function createProduct(string memory metadataURI, uint256 _amount) public payable returns (uint256){
        _tokenId.increment();
        uint256 _newTokenId = _tokenId.current();
        uint256 amount = _amount;
        //address openSeaProvider = _msgSender();
        _mint(_msgSender(),_newTokenId, amount, "");
        StockCollection[_newTokenId] = Stock(msg.sender, _newTokenId, metadataURI);
        return _newTokenId;

        }
}

