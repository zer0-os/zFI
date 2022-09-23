// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../zStakeCorePool.sol";

contract MockCaller {

  zStakeCorePool stakeCorePool;

  constructor (zStakeCorePool _stakeCorePool) {
    stakeCorePool = _stakeCorePool;
  }

  function stakeFromContract(uint256 _amount, uint64 _lockUntil) public {
    stakeCorePool.stake(_amount, _lockUntil);
  }

  function unstakeFromContract(uint256 _depositId, uint256 _amount) public {
    stakeCorePool.unstake(_depositId, _amount);
  }
}
