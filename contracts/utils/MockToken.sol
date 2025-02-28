// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20.sol";

contract MockToken is ERC20 {
  constructor() ERC20("Mock Token", "MT") {}

  function mintForUser(address user, uint256 amount) public {
    _mint(user, amount);
  }
}
