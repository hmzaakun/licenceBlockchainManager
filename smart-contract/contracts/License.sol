// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTCollection.sol";
import "./utils/ReentrancyGuard.sol";
import "./utils/SafeMath.sol";

contract LicenseFactory is ReentrancyGuard {
    address public Owner;
    address[] private collections;

    // mapping creator to collection
    mapping(address => address[]) public creatorCollections;
    // creator and earned amount
    mapping(address => uint256) public creatorEarned;
    constructor() {
        Owner = msg.sender;
    }

    function createLicenseCollection(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice,
        uint _maxSupply,
        string memory _URI
    ) public {
        NFTCollection newNFT = new NFTCollection(
            _name,
            _symbol,
            _mintPrice,
            _maxSupply,
            address(this),
            _URI
        );
        collections.push(address(newNFT));
        creatorCollections[msg.sender].push(address(newNFT));
    }

    function getCollection(uint _index) public view returns (address) {
        return collections[_index];
    }

    function getAllCollections() external view returns (address[] memory) {
        address[] memory tempCollections = new address[](collections.length);
        for (uint i = 0; i < collections.length; i++) {
            tempCollections[i] = collections[i];
        }
        return tempCollections;
    }

    function getOwnerOfCollection(
        uint256 _index
    ) public view returns (address) {
        address collectionAddress = getCollection(_index);
        NFTCollection nftCollection = NFTCollection(collectionAddress);
        return nftCollection.getCreator();
    }

    function mintCollection(uint _index) public payable {
        address collectionAddress = getCollection(_index);
        NFTCollection(collectionAddress).mint{value: msg.value}();
        // apres le mint il faut envoyer les token de ce contract a l'acheteur
        uint quantity = msg.value /
            NFTCollection(collectionAddress).mintPrice();
        for (uint i = 0; i < quantity; i++) {
            NFTCollection(collectionAddress).safeTransferFrom(
                address(this),
                msg.sender,
                NFTCollection(collectionAddress).totalSupply() - 1
            );
        }
        uint256 platformFee = (msg.value * 2) / 100;
        uint256 creatorFee = msg.value - platformFee;
        creatorEarned[
            NFTCollection(collectionAddress).getCreator()
        ] += creatorFee;
    }

    function claim(uint _index) public nonReentrant entrancy {
        address collectionAddress = getCollection(_index);
        NFTCollection nftCollection = NFTCollection(collectionAddress);
        require(
            nftCollection.getCreator() == msg.sender,
            "Only creator can claim"
        );
        uint earned = creatorEarned[msg.sender];
        creatorEarned[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: earned}("");
        require(sent, "Failed to send ether");
    }
}
