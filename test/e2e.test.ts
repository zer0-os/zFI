import { smock } from "@defi-wonderland/smock";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import * as hre from "hardhat";
import { ethers } from "hardhat";
import {
  MockToken,
  MockToken__factory,
  ZStakeCorePool__factory,
  ZStakePoolFactory__factory,
} from "../typechain";
import { advanceBlockTimestampBy, asSingleBlock, mineBlocks, secondsPerYear } from "../utilities";
import { getEvent } from "./helpers";
import chai from "chai";

chai.use(smock.matchers);

describe("me", () => {
  it("is hard to describe", async () => {
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();

    const erc20Factory = await smock.mock<MockToken__factory>("MockToken", signers[0]); // new MockToken__factory(signers[0]);
    const wildToken = await erc20Factory.deploy();
    const lpToken = await erc20Factory.deploy();

    console.log(wildToken.address);

    const rewardsVault = signers[8];

    const poolFactory = await new ZStakePoolFactory__factory(signers[0]).deploy(
      wildToken.address,
      rewardsVault.address,
      ethers.utils.parseEther("10"),
      5, // blocks per update (reduce by 3% after this many blocks pass)
      12739260, // start block (start reducing by 3%)
      19856916 // end block (no more rewards by this block)
    );

    let tx = await poolFactory.createPool(wildToken.address, 12739260, 1);
    let event = await getEvent(tx, "PoolRegistered", poolFactory);
    const wildStakingPool = ZStakeCorePool__factory.connect(event.args["poolAddress"], signers[0]);

    tx = await poolFactory.createPool(lpToken.address, 12739260, 999999999);

    event = await getEvent(tx, "PoolRegistered", poolFactory);

    const lpStakingPool = ZStakeCorePool__factory.connect(event.args["poolAddress"], signers[0]);

    console.log(lpStakingPool.address);

    const user1 = signers[1];
    const user2 = signers[2];
    const user3 = signers[3];

    await lpToken.mintForUser(user1.address, ethers.utils.parseEther("30"));
    await lpToken.mintForUser(user2.address, ethers.utils.parseEther("30"));
    await lpToken.mintForUser(user3.address, ethers.utils.parseEther("30"));

    await lpToken.connect(user1).approve(lpStakingPool.address, ethers.constants.MaxUint256);

    await lpToken.connect(user2).approve(lpStakingPool.address, ethers.constants.MaxUint256);

    await asSingleBlock(async () => {
      console.log("user 1 stake");
      await lpStakingPool.connect(user1).stake(ethers.utils.parseEther("1"), 0);

      console.log(`user 2 stake tokens`);
      await lpStakingPool.connect(user2).stake(ethers.utils.parseEther("1"), 0);
    });

    console.log(`mine 10 blocks`);
    await mineBlocks(10);

    console.log(
      `user1 pyr: ${ethers.utils.formatEther(
        await lpStakingPool.pendingYieldRewards(user1.address)
      )}`
    );
    console.log(
      `user2 pyr: ${ethers.utils.formatEther(
        await lpStakingPool.pendingYieldRewards(user2.address)
      )}`
    );

    // setup reward vault
    await wildToken.mintForUser(rewardsVault.address, ethers.utils.parseEther("10000"));
    await wildToken.connect(rewardsVault).approve(poolFactory.address, ethers.constants.MaxUint256);

    await lpStakingPool.connect(user1).processRewards();

    await advanceBlockTimestampBy(secondsPerYear);

    let rewardAmount = (await wildStakingPool.getDeposit(user1.address, 0))[0];

    console.log(ethers.utils.formatEther(rewardAmount));

    wildToken.transferFrom.reset();

    await wildStakingPool.connect(user1).processRewards();

    console.log(wildToken.transferFrom._watchable.getCallCount());

    await wildStakingPool.connect(user1).processRewards();

    console.log(wildToken.transferFrom._watchable.getCallCount());

    console.log((await wildStakingPool.getDepositsLength(user1.address)).toString());

    console.log(ethers.utils.formatEther(await wildToken.balanceOf(user1.address)));

    console.log(await wildStakingPool.pendingYieldRewards(user1.address));

    let t = wildStakingPool.connect(user1);

    wildToken.transferFrom.reset();
    console.log(wildToken.transferFrom._watchable.getCallCount());
    await wildToken.tfCallCountReset();

    console.log((await wildToken.tfCallCount()).toString());
    await t.unstake(0, ethers.utils.parseEther("1"), {
      gasLimit: 10000000,
    });
    console.log((await wildToken.tfCallCount()).toString());
    console.log("fo");
    const count = wildToken.transferFrom._watchable.getCallCount();
    console.log(count);

    expect(wildToken.transferFrom).to.be.calledOnce;

    console.log(ethers.utils.formatEther(await wildToken.balanceOf(user1.address)));

    rewardAmount = (await wildStakingPool.getDeposit(user1.address, 1))[0];
    console.log(ethers.utils.formatEther(rewardAmount));
  });
});
