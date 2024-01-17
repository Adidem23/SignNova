// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // State variable to store the greeting message
    string private greeting;

    // Event emitted when the greeting is changed
    event GreetingChanged(string newGreeting);

    // Constructor to initialize the greeting message
    constructor() {
        greeting = "Hello, World!";
    }

    // Function to get the current greeting message
    function getGreeting() external view returns (string memory) {
        return greeting;
    }

    // Function to set a new greeting message
    function setGreeting(string memory _newGreeting) external {
        greeting = _newGreeting;
        emit GreetingChanged(_newGreeting);
    }
}
