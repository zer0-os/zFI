// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/**
 * @title Linked to ILV Marker Interface
 *
 * @notice Marks smart contracts which are linked to IlluviumERC20 token instance upon construction,
 *      all these smart contracts share a common ilv() address getter
 *
 * @notice Implementing smart contracts MUST verify that they get linked to real IlluviumERC20 instance
 *      and that ilv() getter returns this very same instance address
 *
 * @author Basil Gorin
 */
interface ILinkedToWILD {
  /**
   * @notice Getter for a verified IlluviumERC20 instance address
   *
   * @return IlluviumERC20 token instance address smart contract is linked to
   */
  function wild() external view returns (address);
}
