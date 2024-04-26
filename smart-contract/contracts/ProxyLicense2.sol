// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProxyLicense {
    address private _implementation;
    address private _owner;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can perform this action");
        _;
    }

    constructor(address implementation) {
        _owner = msg.sender; // L'adresse déployant le contrat devient owner
        _implementation = implementation;
    }

    function setImplementation(address newImplementation) public onlyOwner {
        _implementation = newImplementation;
    }

    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        _owner = newOwner;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    // Fallback function is used when msg.data is not empty
    fallback() external payable {
        address implementation = _implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(
                gas(),
                implementation,
                0,
                calldatasize(),
                0,
                0
            )
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    // Receive function is used when msg.data is empty
    receive() external payable {
        // Optional: Add custom logic when receiving Ether with empty call data
    }
}
