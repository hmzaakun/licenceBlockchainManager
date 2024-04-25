// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTCollection is ERC721, ReentrancyGuard {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    address  public platformFeeAddress;
    uint256 public constant platformFeePercentage = 2;
    address  private creator;
    address public factoryAddress;
    string URI;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _mintPrice,
        uint256 _maxSupply,
        address _platformFeeAddress,
        string memory _URI
    ) ERC721(name, symbol) {
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        platformFeeAddress = _platformFeeAddress;
        creator = tx.origin;
        factoryAddress = msg.sender;
        URI = _URI;
    }
 function mint() public payable nonReentrant onlyFactory {
        require(msg.value > 0 ,"0 ether");
         uint256 quantity = SafeMath.div(msg.value,mintPrice);
         require(quantity > 0 ,"moins de 1");
        require(SafeMath.mul(quantity,mintPrice) == msg.value, "Ether value sent is not correct");
        require(SafeMath.add(totalSupply,quantity) <= maxSupply,"Exceeds max supply");
        uint totalPlatformFee = SafeMath.div(SafeMath.mul(msg.value,platformFeePercentage),100);
        (bool platformFeeSent,) = platformFeeAddress.call{value: totalPlatformFee}("");
        require(platformFeeSent, "Failed to send platform fee");
        (bool factorySent,) = factoryAddress.call{value: SafeMath.sub(msg.value,totalPlatformFee)}("");
        require(factorySent, "Failed to send creator fund");



        for (uint256 i = 0; i < quantity; i++) {
            totalSupply = SafeMath.add(totalSupply,1);
            _safeMint(msg.sender, totalSupply);
        }
    }

    function getCreator() public view returns (address) {
    return creator;
}
 function tokenURI() public view  returns (string memory) {
        return URI;
    }



    modifier onlyFactory {
        require(msg.sender == factoryAddress,"Only Factory");
        _;
    }





}
