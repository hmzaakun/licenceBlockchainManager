// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTCollection.sol";

contract LicenseFactory {
    address public Owner;
    address[] private collections;
    

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
        NFTCollection newNFT = new NFTCollection(_name, _symbol, _mintPrice, _maxSupply, address(this),_URI);
        collections.push(address(newNFT));
    }

    function getCollection(uint _index) public view returns(address) {
        return collections[_index];
    }

    function getAllCollections() external view returns(address[] memory) {
        address[] memory tempCollections = new address[](collections.length);
        for (uint i = 0; i < collections.length; i++) {
            tempCollections[i] = collections[i];
        }
        return tempCollections;
    }

    function getOwnerOfCollection(uint256 _index) public view returns (address) {
        address collectionAddress = getCollection(_index);
        NFTCollection nftCollection = NFTCollection(collectionAddress);
        return nftCollection.getCreator();
    }

    function mintCollection(uint _index) public payable {  
    address collectionAddress = getCollection(_index);

     NFTCollection(collectionAddress).mint{value: msg.value}();
    
    }
    
    function claim(uint _index) public {
    
    }


}
