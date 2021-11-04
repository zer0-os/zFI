import { smock } from "@defi-wonderland/smock";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as hre from "hardhat";
import { ethers } from "hardhat";
import {
  EscrowedERC20,
  EscrowedERC20__factory,
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

    // const stakedLPToken = await new EscrowedERC20__factory(signers[0]).deploy();

    const stakedWildToken = await new EscrowedERC20__factory(
      signers[0]
    ).deploy();

    const poolFactory = await new ZStakePoolFactory__factory(signers[0]).deploy(
      wildToken.address,
      stakedWildToken.address,
      ethers.utils.parseEther("10"),
      5, // ?
      12739260, // ?
      19856916 // ?
    );

    let tx = await poolFactory.createPool(wildToken.address, 12739260, 800);
    let event = await getEvent(tx, "PoolRegistered", poolFactory);
    const wildStakingPool = ZStakeCorePool__factory.connect(
      event.args["poolAddress"],
      signers[0]
    );

    tx = await poolFactory.createPool(lpToken.address, 12739260, 800);

    event = await getEvent(tx, "PoolRegistered", poolFactory);

    const lpStakingPool = ZStakeCorePool__factory.connect(
      event.args["poolAddress"],
      signers[0]
    );

    // await stakedWildToken.updateRole(
    //   lpStakingPool.address,
    //   await stakedWildToken.ROLE_TOKEN_CREATOR()
    // );

    console.log(lpStakingPool.address);

    const user1 = signers[1];

    await lpToken.mintForUser(user1.address, ethers.utils.parseEther("30"));

    await lpToken
      .connect(user1)
      .approve(lpStakingPool.address, ethers.constants.MaxUint256);

    console.log("stake 1");
    await lpStakingPool
      .connect(user1)
      .stake(ethers.utils.parseEther("1"), 0, false);

    console.log("stake 2");
    await lpStakingPool
      .connect(user1)
      .stake(ethers.utils.parseEther("1"), 0, false);
  });
});
