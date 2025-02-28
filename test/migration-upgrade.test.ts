import * as hre from "hardhat";
import { MockToken, MockToken__factory, ZStakeCorePool } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";


describe.only("Migration Upgrade", () => {
  let deployer : SignerWithAddress;
  let rewardVault : SignerWithAddress;
  let user1 : SignerWithAddress;
  let user2 : SignerWithAddress;

  let wildMock : MockToken;
  let lpMock : MockToken;

  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;

  // values from Ethereum contracts
  const rewardTokensPerBlock = BigInt("12000000000000000000");
  const poolWeight = BigInt("150000000");

  let initBlock : number;
  let lockUntil : number;

  before(async () => {
    [deployer, rewardVault, user1, user2] = await hre.ethers.getSigners();

    const mockTokenFactory = new MockToken__factory(deployer);
    wildMock = await mockTokenFactory.deploy();
    lpMock = await mockTokenFactory.deploy();

    // Deploy the original system
    const stakePoolFactoryFactory = await hre.ethers.getContractFactory("zStakePoolFactory");
    const corePoolFactory = await hre.ethers.getContractFactory("zStakeCorePool");

    const stakePoolFactory = await hre.upgrades.deployProxy(
      stakePoolFactoryFactory,
      [
        wildMock.address,
        rewardVault.address,
        rewardTokensPerBlock,
      ]
    );

    const provider = hre.ethers.getDefaultProvider();
    initBlock = await provider.getBlockNumber();

    wildPool = await hre.upgrades.deployProxy(
      corePoolFactory,
      [
        wildMock.address,
        stakePoolFactory.address,
        wildMock.address,
        initBlock,
        poolWeight,
      ]
    ) as ZStakeCorePool;

    lpPool = await hre.upgrades.deployProxy(
      corePoolFactory,
      [
        wildMock.address,
        stakePoolFactory.address,
        lpMock.address,
        initBlock,
        poolWeight,
      ]
    ) as ZStakeCorePool;

    // register pools with the Factory
    await stakePoolFactory.registerPool(wildPool.address);
    await stakePoolFactory.registerPool(lpPool.address);

    // mint tokens
    await wildMock.mintForUser(user1.address, hre.ethers.utils.parseEther("1000"));
    await lpMock.mintForUser(user2.address, hre.ethers.utils.parseEther("1000"));
  });

  it("stake in both pools", async () => {
    const stakeAmt1 = hre.ethers.utils.parseEther("177");
    const stakeAmt2 = hre.ethers.utils.parseEther("231");

    await wildMock.connect(user1).approve(wildPool.address, stakeAmt1);
    await lpMock.connect(user2).approve(lpPool.address, stakeAmt2);

    // 15 days from now
    const lockUntil = await time.latest() + 86400 * 15;

    const userWildBalBefore = await wildMock.balanceOf(user1.address);
    const userLpBalBefore = await lpMock.balanceOf(user2.address);

    await wildPool.connect(user1).stake(stakeAmt1, lockUntil);
    await lpPool.connect(user2).stake(stakeAmt2, lockUntil);

    const userWildBalanceAfter = await wildMock.balanceOf(user1.address);
    const userLpBalanceAfter = await lpMock.balanceOf(user2.address);

    expect(userWildBalBefore.sub(userWildBalanceAfter).toString()).to.equal(stakeAmt1.toString());
    expect(userLpBalBefore.sub(userLpBalanceAfter).toString()).to.equal(stakeAmt2.toString());
  });
});
