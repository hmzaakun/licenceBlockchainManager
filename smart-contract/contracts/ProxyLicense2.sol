// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProxyLicense {
    address private _target;
    address private _owner;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can perform this action");
        _;
    }

    constructor(address target) {
        _owner = msg.sender;
        _target = target;
    }

    function setTarget(address newTarget) public onlyOwner {
        _target = newTarget;
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
        address target = _target;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
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

    receive() external payable {}
}
