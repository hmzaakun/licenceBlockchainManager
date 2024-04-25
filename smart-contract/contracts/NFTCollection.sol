// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./utils/ReentrancyGuard.sol";
import "./utils/SafeMath.sol";

contract NFTCollection is ERC721, ReentrancyGuard {
    uint256 private mintPrice;
    uint256 private totalSupply;
    uint256 private maxSupply;
    address private platformFeeAddress;
    uint256 private constant platformFeePercentage = 2;
    address private creator;
    address private factoryAddress;
    string private URI;

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
        require(msg.value > 0, "0 ether");
        uint256 quantity = SafeMath.div(msg.value, mintPrice);
        require(quantity > 0, "Less than 1 token");
        require(
            SafeMath.mul(quantity, mintPrice) == msg.value,
            "Ether value sent is not correct"
        );
        require(
            SafeMath.add(totalSupply, quantity) <= maxSupply,
            "Exceeds max supply"
        );

        // Calcul du montant de la taxe de plateforme
        uint256 platformFee = SafeMath.div(
            SafeMath.mul(msg.value, platformFeePercentage),
            100
        );

        // Vérifier que la taxe de plateforme est supérieure à zéro
        require(platformFee > 0, "Must pay a platform fee");

        // Vérifier que le contrat dispose d'un solde suffisant pour payer la taxe de plateforme
        require(address(this).balance >= platformFee, "Insufficient balance");

        // Effectuer le transfert de la taxe de plateforme
        (bool platformFeeSent, ) = platformFeeAddress.call{value: platformFee}(
            ""
        );
        require(platformFeeSent, "Failed to send platform fee");

        // Distribuer les fonds restants au créateur
        uint256 creatorFunds = msg.value - platformFee;
        (bool factorySent, ) = factoryAddress.call{value: creatorFunds}("");
        require(factorySent, "Failed to send creator fund");

        // Incrémenter le totalSupply et émettre les tokens
        for (uint256 i = 0; i < quantity; i++) {
            totalSupply = SafeMath.add(totalSupply, 1);
            _mint(msg.sender, totalSupply);
        }
    }

    function getMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getPlatformFeeAddress() public view returns (address) {
        return platformFeeAddress;
    }

    function getPlatformFeePercentage() public pure returns (uint256) {
        return platformFeePercentage;
    }

    function getCreator() public view returns (address) {
        return creator;
    }

    function getFactoryAddress() public view returns (address) {
        return factoryAddress;
    }

    function getTokenURI() public view returns (string memory) {
        return URI;
    }

    modifier onlyFactory() {
        require(msg.sender == factoryAddress, "Only Factory");
        _;
    }
}
