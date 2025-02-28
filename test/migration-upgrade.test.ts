import * as hre from "hardhat";
import {
  MockToken,
  MockToken__factory,
  ZStakeCorePool,
  ZStakeCorePool__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { impersonateAccount, time } from "@nomicfoundation/hardhat-network-helpers";
import { FACTORY_ADDRESS, LP_POOL_ADDRESS, LP_TOKEN_ADDRESS, OWNER_ADDRESS, WILD_POOL_ADDRESS, WILD_TOKEN_ADDRESS } from "./constants";


describe.only("Migration Upgrade", () => {
  let deployer : SignerWithAddress;
  let owner : SignerWithAddress;
  let rewardVault : SignerWithAddress;
  let user1 : SignerWithAddress;
  let user2 : SignerWithAddress;

  let wildToken : MockToken;
  let lpToken : MockToken;

  let factory : ZStakePoolFactory;
  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;

  before(async () => {

    console.log(hre.network.name);
    // Also need to impersonate stakers and give balance
    await impersonateAccount(OWNER_ADDRESS);
    // await hre.network.provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [OWNER_ADDRESS],
    // });

    [owner] = await hre.ethers.getSigners();

    // const provider = hre.ethers.provider;
    // await provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [address],
    // });

    // [deployer, owner, rewardVault, user1, user2] = await hre.ethers.getSigners();

    factory = new ZStakePoolFactory__factory(owner).attach(FACTORY_ADDRESS);
    wildPool = new ZStakeCorePool__factory(owner).attach(WILD_POOL_ADDRESS);
    lpPool = new ZStakeCorePool__factory(owner).attach(LP_POOL_ADDRESS);

    wildToken = new MockToken__factory(owner).attach(WILD_TOKEN_ADDRESS);

    // LP Token is not regular ERC20, but shouldn't matter for testing
    lpToken = new MockToken__factory(owner).attach(LP_TOKEN_ADDRESS);

    console.log(await wildPool.getDepositsLength(
      owner.address
    ));

    // Deploy the original system
    // const stakePoolFactoryFactory = await hre.ethers.getContractFactory("zStakePoolFactory");
    // const corePoolFactory = await hre.ethers.getContractFactory("zStakeCorePool");

    // const stakePoolFactory = await hre.upgrades.deployProxy(
    //   stakePoolFactoryFactory,
    //   [
    //     wildMock.address,
    //     rewardVault.address,
    //     rewardTokensPerBlock,
    //   ]
    // );

    // const initBlock = await hre.ethers.provider.getBlock("latest");
    // initBlock = await provider.getBlockNumber();

    // wildPool = await hre.upgrades.deployProxy(
    //   corePoolFactory,
    //   [
    //     wildMock.address,
    //     stakePoolFactory.address,
    //     wildMock.address,
    //     initBlock.number,
    //     poolWeight,
    //   ],
    //   {
    //     unsafeAllow: ["external-library-linking"],
    //     unsafeSkipStorageCheck: true
    //   }
    // ) as ZStakeCorePool;

    // lpPool = await hre.upgrades.deployProxy(
    //   corePoolFactory,
    //   [
    //     wildMock.address,
    //     stakePoolFactory.address,
    //     lpMock.address,
    //     initBlock.number,
    //     poolWeight,
    //   ],
    //   {
    //     unsafeAllow: ["external-library-linking"],
    //     unsafeSkipStorageCheck: true
    //   }
    // ) as ZStakeCorePool;

    // register pools with the Factory
    // await stakePoolFactory.registerPool(wildPool.address);
    // await stakePoolFactory.registerPool(lpPool.address);

    // mint tokens
    // await wildToken.mintForUser(user1.address, hre.ethers.utils.parseEther("1000"));
    // await lpToken.mintForUser(user2.address, hre.ethers.utils.parseEther("1000"));
  });

  it("stake in both pools", async () => {
    const stakeAmt1 = hre.ethers.utils.parseEther("177");
    const stakeAmt2 = hre.ethers.utils.parseEther("231");

    // await wildToken.connect(user1).approve(wildPool.address, stakeAmt1);
    // await lpToken.connect(user2).approve(lpPool.address, stakeAmt2);

    // 15 days from now
    const lockUntil = await time.latest() + 86400 * 15;

    const userWildBalBefore = await wildToken.balanceOf(user1.address);
    const userLpBalBefore = await lpToken.balanceOf(user2.address);

    await wildPool.connect(user1).stake(stakeAmt1, lockUntil);
    await lpPool.connect(user2).stake(stakeAmt2, lockUntil);

    const userWildBalanceAfter = await wildToken.balanceOf(user1.address);
    const userLpBalanceAfter = await lpToken.balanceOf(user2.address);

    expect(userWildBalBefore.sub(userWildBalanceAfter).toString()).to.equal(stakeAmt1.toString());
    expect(userLpBalBefore.sub(userLpBalanceAfter).toString()).to.equal(stakeAmt2.toString());
  });
});
