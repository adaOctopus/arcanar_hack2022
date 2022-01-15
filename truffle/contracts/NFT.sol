// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";
import './EIP712MetaTransaction.sol';

contract NFT is ERC1155, BaseRelayRecipient{
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    address payable public owner;

     // Contract name
    string public name;
    address constant public biconomyTruster = 0x84a0856b038eaAd1cC7E297cF34A7e72685A8693;

function _msgSender() internal view override(Context, BaseRelayRecipient)
      returns (address sender) {
      sender = BaseRelayRecipient._msgSender();
  }

  function _msgData() internal view override(Context, BaseRelayRecipient)
      returns (bytes memory) {
      return BaseRelayRecipient._msgData();
  }
    
    //defining
    event MintToken(address _address, uint256 _tokenId);
    struct Stock {
        address _nftOwner;
        uint256 _nftId;
        string _nftUri;
    }
    
    mapping( uint256 => Stock) StockCollection;
    
    //constructor
     constructor() public ERC1155('') {
        owner = payable(msg.sender);
        _setTrustedForwarder(biconomyTruster);
    }

    

    function versionRecipient() external view override returns (string memory) {
        return "1";
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
