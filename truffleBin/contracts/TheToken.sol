// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract TheToken {
    address private _admin;

    constructor(address deployer) {
        // Make the deployer of the contract the administrator
        _admin = deployer;
    }

    function isAdministrator(address user) public view returns (bool) {
        return user == _admin;
    }
}