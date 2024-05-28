import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  ZStakeCorePool,
  ZStakeCorePool__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory,
  MockToken,
  MockToken__factory
} from "../typechain"
import * as hre from "hardhat";
import { mine, time } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import { wildTokenContractAbi } from "./constants";
import { mineBlocks } from "../utilities";

describe.only("Change config", () => {
  let owner : SignerWithAddress;
  // let wildTokenOwner : SignerWithAddress;
  let staker : SignerWithAddress;
  let mockVault : SignerWithAddress;

  let rewardToken : MockToken;
  let wildPoolToken : MockToken; 
  let lpPoolToken : MockToken;

  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;
  
  let factory : ZStakePoolFactory;
  
  // values taken from mainnet
  const lpPoolWeight = 850000000;
  const wildPoolWeight = 150000000;
  const msPerDay = 86400;

  // Multsig, must impersonate to operate
  const ownerAddress = "0x1A1d3644fc9906B1EE3d35842789A83D33e99943"
  const wildTokenOwnerAddress = "0x32eB727B120Acf288306fBD67a60D1b6d8984476"

  // test wallet
  const stakerAddress = "0xaE3153c9F5883FD2E78031ca2716520748c521dB"

  const wildTokenAddress = "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34"
  const meowTokenAddress = "0x0eC78ED49C2D27b315D462d43B5BAB94d2C79bf8"

  const factoryAddress = "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a"
  const wildPoolAddress = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4"
  const lpPoolAddress = "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF"

  before(async () => {
    [owner, mockVault, staker] = await hre.ethers.getSigners();

    // Deploy ERC20 tokens
    rewardToken = await (new MockToken__factory(owner)).deploy();
    await rewardToken.deployed();

    wildPoolToken = await (new MockToken__factory(owner)).deploy();
    await wildPoolToken.deployed();

    lpPoolToken = await (new MockToken__factory(owner)).deploy();
    await lpPoolToken.deployed();

    // Deploy factory
    factory = await hre.upgrades.deployProxy(
      new ZStakePoolFactory__factory(owner),
      [
        rewardToken.address,
        mockVault.address,
        hre.ethers.utils.parseEther("4")
      ]
    ) as ZStakePoolFactory;
    await factory.deployed();

    // Deploy and register pools
    wildPool = await hre.upgrades.deployProxy(
      new ZStakeCorePool__factory(owner),
      [
        wildPoolToken.address, // reward token and pool token are the same
        factory.address,
        wildPoolToken.address,
        await time.latest(), // initBlock
        "150000000" // weight
      ]
    ) as ZStakeCorePool;

    lpPool = await hre.upgrades.deployProxy(
      new ZStakeCorePool__factory(owner),
      [
        wildPoolToken.address, // reward token
        factory.address,
        lpPoolToken.address,
        await time.latest(), // initBlock
        "850000000" // weight
      ]
    ) as ZStakeCorePool;

    // Fund the factory with rewards
    await rewardToken.connect(mockVault).approve(factory.address, hre.ethers.utils.parseEther("1000000000"));
    await rewardToken.connect(owner).mintForUser(mockVault.address, hre.ethers.utils.parseEther("1000000000"));

    // Give funds to staker
    await wildPoolToken.connect(owner).mintForUser(staker.address, hre.ethers.utils.parseEther("1000"));
    await lpPoolToken.connect(owner).mintForUser(staker.address, hre.ethers.utils.parseEther("1000"));
  });

  it("Connects", async () => {
    // console.log((await lpPool.weight()).toString());
    // console.log((await wildPool.weight()).toString());
    // console.log((await factory.getRewardTokensPerBlock()).toString());
  })

  it("Stakes", async () => {

    // before stake, view yieldrewardsperweight
    // const yrpw = await wildPool.yieldRewardsPerWeight();

    const stakeAmount = hre.ethers.utils.parseEther("100")
    const lockUntil = await time.latest() + msPerDay * 7;
    
    // should be zero
    // console.log(await wildPool.usersLockingWeight());

    // stake
    await wildPoolToken.connect(staker).approve(wildPool.address, stakeAmount);
    const tx = await wildPool.connect(staker).stake(stakeAmount, lockUntil);
    await tx.wait();
    
    console.log((await wildPool.blockNumber()).toString());

    await mineBlocks(10);

    console.log((await wildPool.blockNumber()).toString());
    
    console.log((await wildPool.lastYieldDistribution()).toString());
    await wildPool.sync();

    const user = await wildPool.users(staker.address);
    const deposit = await wildPool.getDeposit(staker.address, 0);

    console.log(await wildPool.pendingYieldRewards(staker.address));

    // console.log(await wildPool.usersLockingWeight());
    // console.log(await wildPool.yieldRewardsPerWeight());

    // // sync
    // await wildPool.sync();

    // console.log(await wildPool.yieldRewardsPerWeight());

    
    // Did this value change?
    // const yrpw2 = await wildPool.yieldRewardsPerWeight();

    // confirm deposit
    // const user = await wildPool.users(staker.address);
    // const deposit = await wildPool.getDeposit(staker.address, 0);

    // await time.increase(msPerDay * 8);

    // const pending = await wildPool.pendingYieldRewards(staker.address);

    // // stake a second time
    // await wildPoolToken.connect(staker).approve(wildPool.address, hre.ethers.utils.parseEther("100"));
    // await wildPool.connect(staker).stake(stakeAmount, (await time.latest() + (msPerDay * 7)));

    // await time.increase(msPerDay * 8);

    // const pending2 = await wildPool.pendingYieldRewards(staker.address);

    // await wildPool.processRewards();

    // const pending3 = await wildPool.pendingYieldRewards(staker.address);

    // const balanceBefore = await rewardToken.balanceOf(staker.address);

    // const depositsLength = await wildPool.getDepositsLength(staker.address);

    // const lyd = await wildPool.lastYieldDistribution();
    // const blockNumber = await wildPool.blockNumber();

    // const yrpw3 = await wildPool.yieldRewardsPerWeight();

    // for (let i = 0; i < depositsLength.toNumber(); i++) {
    //   const deposit = await wildPool.getDeposit(staker.address, i);
    //   console.log(deposit.isYield.toString());
    //   // await wildPool.connect(staker).unstake(i, deposit.tokenAmount);
    // }
    // Remove entire first deposit
    // const balanceAfter = await rewardToken.balanceOf(staker.address);




    // console.log(await time.latest())
    // console.log(await wildPool.yieldRewardsPerWeight())

    // console.log(await wildPool.pendingYieldRewards(staker.address));
    // // console.log(await lpPool.pendingYieldRewards(staker.address));

    // // confirm deposits
    // const user = await wildPool.users(staker.address);
    // // console.log(user.tokenAmount.toString());
    // console.log(`yrpw: ${await wildPool.yieldRewardsPerWeight()}`)
    // console.log(user.totalWeight.toString());
    // // console.log(user.subYieldRewards.toString());
    // // console.log(await wildPool.getDepositsLength(staker.address));
    // console.log(await wildPool.getDeposit(staker.address, 0));





    // const user = await wildPool.users(staker.address);
    // const deposit = await wildPool.getDeposit(staker.address, 0);

    // await wildPool.connect(staker).unstake(0, deposit.tokenAmount);
    // // claim through processRewards?
    // await wildPool.connect(staker).processRewards();




    // // 0s
    // console.log(balanceBefore.toString());
    // console.log(balanceAfter.toString());

  });
});