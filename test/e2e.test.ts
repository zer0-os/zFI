import { smock } from "@defi-wonderland/smock";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as hre from "hardhat";
import { ethers } from "hardhat";
import {
  MockToken__factory,
  ZStakeCorePool__factory,
  ZStakePoolFactory__factory,
} from "../typechain";
import { getEvent } from "./helpers";

describe("me", () => {
  it("is hard to describe", async () => {
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();

    const erc20Factory = new MockToken__factory(signers[0]);
    const wildToken = await erc20Factory.deploy();
    const lpToken = await erc20Factory.deploy();

    console.log(wildToken.address);

    const poolFactory = await new ZStakePoolFactory__factory(signers[0]).deploy(
      wildToken.address,
      ethers.utils.parseEther("10"),
      5, // ?
      12739260, // ?
      19856916 // ?
    );

    let tx = await poolFactory.createPool(wildToken.address, 12739260, 1);
    let event = await getEvent(tx, "PoolRegistered", poolFactory);
    const wildStakingPool = ZStakeCorePool__factory.connect(event.args["poolAddress"], signers[0]);

    tx = await poolFactory.createPool(lpToken.address, 12739260, 999999999);

    event = await getEvent(tx, "PoolRegistered", poolFactory);

    const lpStakingPool = ZStakeCorePool__factory.connect(event.args["poolAddress"], signers[0]);

    // await stakedWildToken.updateRole(
    //   lpStakingPool.address,
    //   await stakedWildToken.ROLE_TOKEN_CREATOR()
    // );

    console.log(lpStakingPool.address);

    const user1 = signers[1];
    const user2 = signers[2];
    const user3 = signers[3];

    await lpToken.mintForUser(user1.address, ethers.utils.parseEther("30"));
    await lpToken.mintForUser(user2.address, ethers.utils.parseEther("30"));
    await lpToken.mintForUser(user3.address, ethers.utils.parseEther("30"));

    await lpToken.connect(user1).approve(lpStakingPool.address, ethers.constants.MaxUint256);

    await lpToken.connect(user2).approve(lpStakingPool.address, ethers.constants.MaxUint256);

    await hre.ethers.provider.send("evm_setAutomine", [false]);
    //await hre.ethers.provider.send("evm_setIntervalMining", [5000]);

    console.log("user 1 stake");
    await lpStakingPool.connect(user1).stake(ethers.utils.parseEther("1"), 0);

    console.log(`user 2 stake tokens`);
    await lpStakingPool.connect(user2).stake(ethers.utils.parseEther("1"), 0);

    await hre.ethers.provider.send("evm_mine", []);

    await hre.ethers.provider.send("evm_setAutomine", [true]);

    console.log(`mine 10 blocks`);

    for (let i = 0; i < 10; ++i) {
      await hre.ethers.provider.send("evm_mine", []);
    }

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
  });
});
