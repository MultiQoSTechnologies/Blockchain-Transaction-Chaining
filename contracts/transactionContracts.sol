// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionDemo {
  event TransactionSent(address indexed from, address indexed to, uint256 value);

  // Function to send Ether and emit an event
  function sendTransaction(address payable _to) public payable {
    require(msg.value > 0, "Send some Ether!");

    // Transfer the value to the recipient
    _to.transfer(msg.value);

    // Emit the event with transaction details
    emit TransactionSent(msg.sender, _to, msg.value);
  }
}
