// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "../utils/ERC20.sol";
import "../utils/AccessControl.sol";

contract EscrowedERC20 is ERC20("Escrowed Illuvium", "sILV"), AccessControl {
  /**
   * @dev Smart contract unique identifier, a random number
   * @dev Should be regenerated each time smart contact source code is changed
   *      and changes smart contract itself is to be redeployed
   * @dev Generated using https://www.random.org/bytes/
   */
  // uint256 public constant TOKEN_UID = 0x00415d8163ba17aa3f5677b9f4f6e9c243ae08760efae1fe11d6b0ebe279e67b;

  /**
   * @notice Must be called by ROLE_TOKEN_CREATOR addresses.
   *
   * @param recipient address to receive the tokens.
   * @param amount number of tokens to be minted.
   */
  function mint(address recipient, uint256 amount) external {
    require(isSenderInRole(ROLE_TOKEN_CREATOR), "insufficient privileges (ROLE_TOKEN_CREATOR required)");
    _mint(recipient, amount);
  }

  /**
   * @param amount number of tokens to be burned.
   */
  function burn(uint256 amount) external {
    _burn(msg.sender, amount);
  }
}