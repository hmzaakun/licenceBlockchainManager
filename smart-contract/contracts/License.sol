// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTCollection.sol";
import "./utils/ReentrancyGuard.sol";
import "./utils/SafeMath.sol";

contract LicenseFactory is ReentrancyGuard {
    address public Owner;
    address[] private collections;
    address public smartAccountTreasury;

    // mapping creator to collection
    mapping(address => address[]) public creatorCollections;
    // creator and earned amount
    mapping(address => uint256) public creatorEarned;
    // user and licenses
    mapping(address => address[]) public userLicenses;

    event CollectionCreated(
        address indexed creator,
        address indexed collection
    );

    constructor(address _smartAccountTreasury) {
        Owner = msg.sender;
        smartAccountTreasury = _smartAccountTreasury;
    }

    function createLicenseCollection(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice,
        uint _maxSupply,
        string memory _URI,
        address _dest
    ) public {
        NFTCollection newNFT = new NFTCollection(
            _name,
            _symbol,
            _mintPrice,
            _maxSupply,
            smartAccountTreasury,
            _URI,
            _dest
        );
        collections.push(address(newNFT));
        creatorCollections[_dest].push(address(newNFT));
        emit CollectionCreated(_dest, address(newNFT));
    }

    function getCollection(uint _index) public view returns (address) {
        return collections[_index];
    }

    function getPlatformFeeAddress(uint _index) public view returns (address) {
        address collectionAddress = getCollection(_index);
        NFTCollection nftCollection = NFTCollection(collectionAddress);
        return nftCollection.getPlatformFeeAddress();
    }

    function getAllCollections() external view returns (address[] memory) {
        address[] memory tempCollections = new address[](collections.length);
        for (uint i = 0; i < collections.length; i++) {
            tempCollections[i] = collections[i];
        }
        return tempCollections;
    }

    function testProxy(uint number) public pure returns (bool) {
        return number % 2 == 0;
    }

    function getOwnerOfCollection(
        uint256 _index
    ) public view returns (address) {
        address collectionAddress = getCollection(_index);
        NFTCollection nftCollection = NFTCollection(collectionAddress);
        return nftCollection.getCreator();
    }
    function getCreatorCollections(
        address _creator
    ) public view returns (address[] memory) {
        return creatorCollections[_creator];
    }

    function mintCollection(uint _index, address _to) public payable {
        address collectionAddress = getCollection(_index);
        NFTCollection(collectionAddress).mint{value: msg.value}();
        uint quantity = msg.value /
            NFTCollection(collectionAddress).getMintPrice();
        uint256 platformFee = SafeMath.div(SafeMath.mul(msg.value, 2), 100);
        uint256 creatorFee = msg.value - platformFee;
        creatorEarned[
            NFTCollection(collectionAddress).getCreator()
        ] += creatorFee;
        userLicenses[_to].push(collectionAddress);

        for (uint i = 0; i < quantity; i++) {
            NFTCollection(collectionAddress).safeTransferFrom(
                address(this),
                _to,
                NFTCollection(collectionAddress).getTotalSupply() -
                    quantity +
                    i +
                    1
            );
        }
    }

    function getUserLicenses(
        address _user
    ) public view returns (address[] memory) {
        return userLicenses[_user];
    }

    function claim(address _caller) public nonReentrant {
        uint earned = creatorEarned[_caller];

        require(earned > 0, "No funds to claim");

        creatorEarned[_caller] = 0;

        (bool sent, ) = (_caller).call{value: earned}("");
        require(sent, "Failed to send ether");
    }

    receive() external payable {}
    fallback() external payable {}
}
