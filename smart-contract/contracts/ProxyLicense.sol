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
        _owner = msg.sender; // The address deploying the contract becomes the owner
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

    event Debug(address indexed from, address indexed target, bool success);

    function createLicenseCollection(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice,
        uint _maxSupply,
        string memory _URI
    ) public {
        (bool success, ) = _target.delegatecall(
            abi.encodeWithSignature(
                "createLicenseCollection(string,string,uint256,uint256,string,address)",
                _name,
                _symbol,
                _mintPrice,
                _maxSupply,
                _URI,
                msg.sender // Passer msg.sender si nécessaire pour la logique interne
            )
        );
        emit Debug(msg.sender, _target, success);
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

    // Proxy function for mintCollection
    function mintCollection(uint _index, address _to) public payable {
        (bool success, ) = _target.delegatecall(
            abi.encodeWithSignature(
                "mintCollection(uint256,address)",
                _index,
                _to
            )
        );
        require(success, "Delegatecall failed");
    }

    // Proxy function for claim
    function claim(address _caller) public {
        (bool success, ) = _target.delegatecall(
            abi.encodeWithSignature("claim(address)", _caller)
        );
        require(success, "Delegatecall failed");
    }

    // Proxy function for getCreatorCollections
    function getCreatorCollections(
        address _creator
    ) public view returns (address[] memory) {
        (bool success, bytes memory result) = _target.staticcall(
            abi.encodeWithSignature("getCreatorCollections(address)", _creator)
        );
        require(success, "Staticcall failed");
        return abi.decode(result, (address[]));
    }

    // Proxy function for getUserLicenses
    function getUserLicenses(
        address _user
    ) public view returns (address[] memory) {
        (bool success, bytes memory result) = _target.staticcall(
            abi.encodeWithSignature("getUserLicenses(address)", _user)
        );
        require(success, "Staticcall failed");
        return abi.decode(result, (address[]));
    }

    // Fallback function for handling other calls and delegate them to the target
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
