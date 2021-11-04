// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./token/zStakeERC20.sol";
import "./interfaces/ILinkedToWILD.sol";

/**
 * @title Illuvium Aware
 *
 * @notice Helper smart contract to be inherited by other smart contracts requiring to
 *      be linked to verified IlluviumERC20 instance and performing some basic tasks on it
 *
 * @author Basil Gorin
 */
abstract contract zStakeAware is ILinkedToWILD {
  /// @dev Link to ILV ERC20 Token IlluviumERC20 instance
  address public immutable override wild;

  /**
   * @dev Creates IlluviumAware instance, requiring to supply deployed IlluviumERC20 instance address
   *
   * @param _wild deployed Wilder World ERC20 instance address
   */
  constructor(address _wild) {
    // verify WILD address is set and is correct
    require(_wild != address(0), "WILD address not set");
    // require(zStakeERC20(_wild).TOKEN_UID() == 0xbe96a9a320977f7f9ece655f560a40a0d9173f0148d998977e21e01e50d7f922, "unexpected TOKEN_UID");

    // write WILD address
    wild = _wild;
  }

  /**
   * @dev Executes IlluviumERC20.safeTransferFrom(address(this), _to, _value, "")
   *      on the bound IlluviumERC20 instance
   *
   * @dev Reentrancy safe due to the IlluviumERC20 design
   */
  function transferWild(address _to, uint256 _value) internal {
    // just delegate call to the target
    transferWildFrom(address(this), _to, _value);
  }

  /**
   * @dev Executes IlluviumERC20.transferFrom(_from, _to, _value)
   *      on the bound IlluviumERC20 instance
   *
   * @dev Reentrancy safe due to the IlluviumERC20 design
   */
  function transferWildFrom(
    address _from,
    address _to,
    uint256 _value
  ) internal {
    // just delegate call to the target
    zStakeERC20(wild).transferFrom(_from, _to, _value);
  }

  /**
   * @dev Executes IlluviumERC20.mint(_to, _values)
   *      on the bound IlluviumERC20 instance
   *
   * @dev Reentrancy safe due to the IlluviumERC20 design
   */
  function mintWild(address _to, uint256 _value) internal {
    // just delegate call to the target
    zStakeERC20(wild).mint(_to, _value);
  }
}
