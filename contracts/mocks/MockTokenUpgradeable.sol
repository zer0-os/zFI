// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MockTokenUpgradeable is Initializable, ERC20Upgradeable {
  function initialize() public initializer {
    __ERC20_init("Mock wrapped Ethereum", "MwETH");
  }

  function mint() public {
    _mint(msg.sender, 10000 * 10**18);
  }
}
