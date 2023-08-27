// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleMessage {
    string private message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
