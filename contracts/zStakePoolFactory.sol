// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IPool.sol";
import "./zStakeCorePool.sol";
import "./utils/Ownable.sol";
import "./interfaces/IERC20.sol";

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title WILD Pool Factory - Fork of Illuvium Pool Factory
 *
 * @notice WILD Pool Factory manages WILD Yield farming pools, provides a single
 *      public interface to access the pools, provides an interface for the pools
 *      to mint yield rewards, access pool-related info, update weights, etc.
 *
 * @notice The factory is authorized (via its owner) to register new pools, change weights
 *      of the existing pools, removing the pools (by changing their weights to zero)
 *
 *
 * @author Pedro Bergamini, reviewed by Basil Gorin, modified by Zer0
 */
contract zStakePoolFactory is OwnableUpgradeable {
  /// @dev The WILD token
  address public wild;

  /// @dev The vault that cointains WILD tokens which are to be given as staking rewards.
  address public rewardVault;

  /// @dev Auxiliary data structure used only in getPoolData() view function
  struct PoolData {
    // @dev pool token address (like WILD)
    address poolToken;
    // @dev pool address (like deployed core pool instance)
    address poolAddress;
    // @dev pool weight (200 for WILD pools, 800 for WILD/ETH pools - set during deployment)
    uint32 weight;
    // @dev flash pool flag
    bool isFlashPool;
  }

  /**
   * @dev WILD/block determines yield farming reward base
   *      used by the yield pools controlled by the factory
   */
  uint256 internal wildPerBlock;

  /**
   * @dev The yield is distributed proportionally to pool weights;
   *      total weight is here to help in determining the proportion
   */
  uint32 public totalWeight;

  /// @dev Maps pool token address (like WILD) -> pool address (like core pool instance)
  mapping(address => address) public pools;

  /// @dev Keeps track of registered pool addresses, maps pool address -> exists flag
  mapping(address => bool) public poolExists;

  /**
   * @dev Fired in createPool() and registerPool()
   *
   * @param _by an address which executed an action
   * @param poolToken pool token address (like WILD)
   * @param poolAddress deployed pool instance address
   * @param weight pool weight
   * @param isFlashPool flag indicating if pool is a flash pool
   */
  event PoolRegistered(
    address indexed _by,
    address indexed poolToken,
    address indexed poolAddress,
    uint64 weight,
    bool isFlashPool
  );

  /**
   * @dev Fired in changePoolWeight()
   *
   * @param _by an address which executed an action
   * @param poolAddress deployed pool instance address
   * @param weight new pool weight
   */
  event WeightUpdated(address indexed _by, address indexed poolAddress, uint32 weight);

  /**
   * @dev Fired in updateWILDPerBlock()
   *
   * @param _by an address which executed an action
   * @param newIlvPerBlock new WILD/block value
   */
  event WildRatioUpdated(address indexed _by, uint256 newIlvPerBlock);

  /**
   * @dev Creates/deploys a factory instance
   *
   * @param _wild WILD ERC20 token address
   * @param _rewardsVault The vault which contains WILD tokens that are staking rewards
   * @param _wildPerBlock initial WILD/block value for rewards
   */
  function initialize(
    address _wild,
    address _rewardsVault,
    uint192 _wildPerBlock
  ) public initializer {
    __Ownable_init();

    // verify the inputs are set
    require(_wildPerBlock > 0, "WILD/block not set");

    // save the inputs into internal state variables
    wild = _wild;
    rewardVault = _rewardsVault;
    wildPerBlock = _wildPerBlock;
  }

  /**
   * @notice Given a pool token retrieves corresponding pool address
   *
   * @dev A shortcut for `pools` mapping
   *
   * @param poolToken pool token address (like WILD) to query pool address for
   * @return pool address for the token specified
   */
  function getPoolAddress(address poolToken) external view returns (address) {
    // read the mapping and return
    return pools[poolToken];
  }

  /**
   * @notice Reads pool information for the pool defined by its pool token address,
   *      designed to simplify integration with the front ends
   *
   * @param _poolToken pool token address to query pool information for
   * @return pool information packed in a PoolData struct
   */
  function getPoolData(address _poolToken) public view returns (PoolData memory) {
    // get the pool address from the mapping
    address poolAddr = pools[_poolToken];

    // throw if there is no pool registered for the token specified
    require(poolAddr != address(0), "pool not found");

    // read pool information from the pool smart contract
    // via the pool interface (IPool)
    address poolToken = IPool(poolAddr).poolToken();
    bool isFlashPool = IPool(poolAddr).isFlashPool();
    uint32 weight = IPool(poolAddr).weight();

    // create the in-memory structure and return it
    return
      PoolData({
        poolToken: poolToken,
        poolAddress: poolAddr,
        weight: weight,
        isFlashPool: isFlashPool
      });
  }

  /**
   * @dev Registers an already deployed pool instance within the factory
   *
   * @dev Can be executed by the pool factory owner only
   *
   * @param poolAddr address of the already deployed pool instance
   */
  function registerPool(address poolAddr) public onlyOwner {
    // read pool information from the pool smart contract
    // via the pool interface (IPool)
    address poolToken = IPool(poolAddr).poolToken();
    bool isFlashPool = IPool(poolAddr).isFlashPool();
    uint32 weight = IPool(poolAddr).weight();

    // ensure that the pool is not already registered within the factory
    require(pools[poolToken] == address(0), "this pool is already registered");

    // create pool structure, register it within the factory
    pools[poolToken] = poolAddr;
    poolExists[poolAddr] = true;
    // update total pool weight of the factory
    totalWeight += weight;

    // emit an event
    emit PoolRegistered(msg.sender, poolToken, poolAddr, weight, isFlashPool);
  }

  /**
   * @dev Transfers WILD tokens from the rewards vault. Executed by WILD Pool only
   *
   * @dev Requires factory to have allowance on rewardVault
   *
   * @param _to an address to mint tokens to
   * @param _amount amount of WILD tokens to transfer
   */
  function transferRewardYield(address _to, uint256 _amount) external {
    // verify that sender is a pool registered withing the factory
    require(poolExists[msg.sender], "access denied");

    // transfer WILD tokens as required
    IERC20(wild).transferFrom(rewardVault, _to, _amount);
  }

  /**
   * @dev Changes the weight of the pool;
   *      executed by the pool itself or by the factory owner
   *
   * @param poolAddr address of the pool to change weight for
   * @param weight new weight value to set to
   */
  function changePoolWeight(address poolAddr, uint32 weight) external {
    // verify function is executed either by factory owner or by the pool itself
    require(msg.sender == owner() || poolExists[msg.sender]);

    // recalculate total weight
    totalWeight = totalWeight + weight - IPool(poolAddr).weight();

    // set the new pool weight
    IPool(poolAddr).setWeight(weight);

    // emit an event
    emit WeightUpdated(msg.sender, poolAddr, weight);
  }

  /**
   * @dev Changes the amount of wild given per block
   *
   * @param perBlock Amount of wild given per block
   */
  function changeWildPerBlock(uint256 perBlock) external {
    require(wildPerBlock != perBlock, "No change");
    wildPerBlock = perBlock;
  }

  /**
   * @dev Testing time-dependent functionality is difficult and the best way of
   *      doing it is to override block number in helper test smart contracts
   *
   * @return `block.number` in mainnet, custom values in testnets (if overridden)
   */
  function blockNumber() public view virtual returns (uint256) {
    // return current block number
    return block.number;
  }

  /**
   * @dev Returns amount of wild to be given per block, may be upgraded in the future
   *
   * @return Amount of WILD tokens to reward per block
   */
  function getWildPerBlock() public view returns (uint256) {
    return wildPerBlock;
  }
}
