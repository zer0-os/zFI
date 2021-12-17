import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as ethers from "ethers";
import * as dotenv from "dotenv";

import { ZStakeCorePool, ZStakePoolFactory } from "../typechain";

chai.use(chaiAsPromised.default);
const expect = chai.expect;
dotenv.config();

import * as zStakeCorePoolArtifact from "../artifacts/contracts/zStakeCorePool.sol/zStakeCorePool.json";
import * as zStakePoolFactoryArtifact from "../artifacts/contracts/zStakePoolFactory.sol/zStakePoolFactory.json";

/**
 * This is the end to end testing example of the zFI system deployed to kovan.
 * 
 * These tests cannot all be run simultaneously, as there are state requirements
 * for each that may not be met. Instead, each non-view function is commented 
 * out below and requires you to manually uncomment it to run. Once you've executed
 * one transaction, you'll be able to make changes based on that state. Some functions 
 * will only be called a single time (like ERC20 approve) while others will be called 
 * repeatedly (stake, unstake, processRewards, updateStakeLock, etc.)
 * 
 * The general flow after instantiating each contract follows
 * 
 * - Have the ERC20 (Wild in this case) contract approve the pools to spend the token
 * - Use the factory to set rewardsPerBlock if it is not already set
 * - Stake a value for no lock time or for a lock period 0 < lockPeriod < 365 days, specified as a timestamp
 * - Check for rewards with `pendingYieldRewards`
 * - Call to process rewards when they exist using `processRewards`
 * - (Optional) Update a stake's locking period
 * - Unstake a part of or a whole specific deposit
 */

describe("End to end test", () => {
  // Addresses
  const rewardVaultAddress = "0x4Afc79F793fD4445f4fd28E3aa708c1475a43Fc4";
  const config = {
    provider: new ethers.providers.JsonRpcProvider(process.env["INFURA_URL"]),
    factoryAddress: "0x47946797E05A34B47ffE7151D0Fbc15E8297650E",
    lpTokenPoolAddress: "0x9CF0DaD38E4182d944a1A4463c56CFD1e6fa8fE7",
    wildPoolAddress: "0x4E226a8BbECAa435d2c77D3E4a096F87322Ef1Ae",
  };

  const privateKey = process.env["WALLET_PRIVATE_KEY"];
  if (!privateKey) throw Error();

  // Setup accounts
  const staker = new ethers.Wallet(privateKey, config.provider);

  // Create contracts for test interaction
  const factory = new ethers.Contract(
    config.factoryAddress,
    zStakePoolFactoryArtifact.abi,
    config.provider
  ) as ZStakePoolFactory;

  const wildStakingPool = new ethers.Contract(
    config.wildPoolAddress,
    zStakeCorePoolArtifact.abi,
    config.provider
  ) as ZStakeCorePool;

  const lpStakingPool = new ethers.Contract(
    config.lpTokenPoolAddress,
    zStakeCorePoolArtifact.abi,
    config.provider
  ) as ZStakeCorePool;

  // Add ERC20 `approve` to this test, signature is enough
  const erc20Abi = ["function approve(address spender, uint256 amount) public"];

  it("runs", async () => {
    // Confirm we're connected.
    const rewardVault = await factory.rewardVault();
    expect(rewardVault).to.eq(rewardVaultAddress);
  });

  // View functions
  it("Checks for any existing stake reward", async () => {
    const stakerAddress = await staker.getAddress();
    const pendingYieldRewards = await wildStakingPool.pendingYieldRewards(stakerAddress);
    console.log("Pending yield: " + pendingYieldRewards.toString());
  });
  it("Gets the user data for each given address", async () => {
    const stakerData = await wildStakingPool.users(await staker.getAddress());
    console.log(stakerData);
  });
  it("Gets a deposit given the user and deposit ID", async () => {
    const address = await staker.getAddress();
    const id = ethers.BigNumber.from("8");
    const length = await wildStakingPool.getDepositsLength(address);
    const deposit = await wildStakingPool.getDeposit(address, id);
    console.log(deposit);
    console.log(length);
    console.log(id);
  });

  // Non-view functions
  it("Approves WILD usage for both pools", async () => {
    // Have WILD ERC20 Contract approve the WILD Pool
    // Only need to approve one time, can comment out otherwise
    // const wildTokenInstance = new ethers.Contract(rewardTokenAddress, erc20Abi, config.provider);
    // await wildTokenInstance
    //   .connect(staker)
    //   .approve(wildStakingPool.address, ethers.constants.MaxUint256);
    // await wildTokenInstance
    //   .connect(staker)
    //   .approve(lpStakingPool.address, ethers.constants.MaxUint256);
  });
  it("changes the reward tokens per block", async () => {
    // Set rewards per block to 1000 Wild
    // Calls with the same value will be **rejected**, either change the value or comment out
    // const rewardsPerBlock = ethers.utils.parseUnits("1000", 18);
    // await factory.connect(deployer).changeRewardTokensPerBlock(rewardsPerBlock);
    // console.log(`Rewards per block: ${rewardsPerBlock}`);
  });
  it("Stakes", async () => {
    // Date.now() is in ms, convert to s and add 1 day (86400 seconds)
    // const stakeAmount = ethers.utils.parseUnits("1000", 18);
    // const lock = Math.round(Date.now() / 1000) + 86400;
    // const stakeLockUntil = ethers.BigNumber.from(lock);
    
    // Call to stake Wild
    // try {
    //   const tx = await wildStakingPool
    //     .connect(staker)
    //     .stake(stakeAmount, stakeLockUntil);
    //   console.log(tx);
    //   const receipt = await tx.wait(1);
    //   console.log(receipt);
    // } catch (e) {
    //   console.log(e);
    // }
  });
  it("Updates stake lock", async () => {
    // try {
    //   const address = await staker.getAddress();
    //   const id = ethers.BigNumber.from("8");
    //   const deposit = await wildStakingPool.getDeposit(address, id);
    //   console.log(deposit);
    //   const depositId = ethers.BigNumber.from("8");
      
    //   // Convert ms to s
    //   const lockedValue = Math.round(Date.now() / 1000) + 86400;
    //   const lockedUntil = ethers.BigNumber.from(lockedValue);
    //   const tx = await wildStakingPool.connect(staker).updateStakeLock(depositId, lockedUntil);
    //   console.log(tx);
    //   const receipt = await tx.wait(1);
    //   console.log(receipt);
    // } catch (e) {
    //   console.log(e);
    // }
  });
  it("Processes rewards when pool is reward token pool", async () => {
    // try {
    //   const tx = await wildStakingPool.connect(staker).processRewards();
    //   console.log(tx);
    //   const receipt = await tx.wait(1);
    //   console.log(receipt);
    // } catch (e) {
    //   console.log(e);
    // }
  });
  it("Unstakes", async () => {
    // try {
    //   const address = await staker.getAddress();
    //   const id = ethers.BigNumber.from("5");
    //   const deposit = await wildStakingPool.getDeposit(address, id)
    //   // Fails on deposits that are still locked or if the amount requested is greater than the stake
    //   const tx = await wildStakingPool.connect(staker).unstake(id, deposit.tokenAmount)
    //   const receipt = await tx.wait(1);
    //   console.log(receipt);
    // } catch (e) {
    //   console.log(e);
    // }
  });
});
