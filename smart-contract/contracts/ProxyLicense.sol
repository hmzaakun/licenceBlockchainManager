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

    function createLicenseCollection(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice,
        uint _maxSupply,
        string memory _URI
    ) public {
        (bool success, ) = _target.delegatecall(
            abi.encodeWithSignature(
                "createLicenseCollection(string,string,uint256,uint256,string)",
                _name,
                _symbol,
                _mintPrice,
                _maxSupply,
                _URI
            )
        );
        require(success, "Delegatecall failed");
    }

    function getCollection(uint _index) public view returns (address) {
        (bool success, bytes memory result) = _target.staticcall(
            abi.encodeWithSignature("getCollection(uint256)", _index)
        );
        require(success, "Staticcall failed");
        return abi.decode(result, (address));
    }

    function getAllCollections() public view returns (address[] memory) {
        (bool success, bytes memory result) = _target.staticcall(
            abi.encodeWithSignature("getAllCollections()")
        );
        require(success, "Staticcall failed");
        return abi.decode(result, (address[]));
    }

    function testProxy(uint number) public returns (bool) {
        (bool success, bytes memory result) = _target.delegatecall(
            abi.encodeWithSignature("testProxy(uint256)", number)
        );
        require(success, "Delegatecall failed");
        return abi.decode(result, (bool));
    }

    fallback() external payable {
        address implementation = _target;
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

    receive() external payable {}
}
