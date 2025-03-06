import * as hre from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  MockToken,
  MockToken__factory,
  ZStakeCorePool,
  ZStakeCorePool__factory,
  ZStakeCorePoolMigration,
  ZStakeCorePoolMigration__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory,
} from "../typechain";
import { expect } from "chai";
import { compareStorageData, ContractStorageData, readContractStorage } from "../src/migration/storage-data";
import { upgradeStakingPool } from "../src/migration/upgrade-pool";
import { transferProxyAdminOwnership } from "../src/migration/transfer-ownership";
import { after } from "mocha";


const OWNER_ADDRESS = "0x1A1d3644fc9906B1EE3d35842789A83D33e99943";
const FACTORY_ADDRESS = "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a";
const WILD_POOL_ADDRESS = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4";
const LP_POOL_ADDRESS = "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF";
const WILD_TOKEN_ADDRESS = "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34";
const LP_TOKEN_ADDRESS = "0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5";


describe.only("Migration Upgrade", () => {
  let owner : SignerWithAddress;
  let tokenVault : SignerWithAddress;
  let upgradeOwner : SignerWithAddress;

  let poolContractFactory : ZStakeCorePool__factory;

  let factory : ZStakePoolFactory;
  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;
  let wildToken : MockToken;
  let lpToken : MockToken;

  // upgraded
  let wildPoolNew : ZStakeCorePoolMigration;
  let lpPoolNew : ZStakeCorePoolMigration;

  let lpPoolStatePreUpgrade : ContractStorageData;
  let wildPoolStatePreUpgrade : ContractStorageData;
  let stakerDataWildPoolPreUpgrade;
  let stakerDataLpPoolPreUpgrade;

  let originalConsoleLog : typeof console.log;

  before(async () => {
    originalConsoleLog = console.log;
    // disable console logging for tests
    console.log = () => {};

    await impersonateAccount(OWNER_ADDRESS);

    owner = await hre.ethers.getSigner(OWNER_ADDRESS);
    [,, tokenVault, upgradeOwner] = await hre.ethers.getSigners();

    poolContractFactory = new ZStakeCorePool__factory(owner);

    factory = new ZStakePoolFactory__factory(owner).attach(FACTORY_ADDRESS);
    wildPool = new ZStakeCorePool__factory(owner).attach(WILD_POOL_ADDRESS);
    lpPool = new ZStakeCorePool__factory(owner).attach(LP_POOL_ADDRESS);

    wildToken = new MockToken__factory(owner).attach(WILD_TOKEN_ADDRESS);

    // LP Token is not regular ERC20, but shouldn't matter for testing
    lpToken = new MockToken__factory(owner).attach(LP_TOKEN_ADDRESS);

    // Get state vars and their values from both pool contracts
    lpPoolStatePreUpgrade = await readContractStorage(poolContractFactory, lpPool);
    wildPoolStatePreUpgrade = await readContractStorage(poolContractFactory, wildPool);
  });

  it("should validate state of forked contracts", async () => {
    const wildPoolToken = await wildPool.poolToken();
    const lpPoolToken = await lpPool.poolToken();

    expect(wildPoolToken).to.equal(WILD_TOKEN_ADDRESS);
    expect(lpPoolToken).to.equal(LP_TOKEN_ADDRESS);
  });

  it("should be able to pause() blocking all core functionality", async () => {
    // this will fail, but much deeper in code with reason related to lock interval
    // `paused` is checked on the first line, so if it fails with any other reason,
    // the contract is not paused. we verify that here
    await expect(
      wildPool.connect(owner).stake(123, 129873192831928)
    ).to.be.revertedWith("invalid lock interval");

    // now we pause the contract
    await wildPool.connect(owner).setPauseStatus(true);
    await lpPool.connect(owner).setPauseStatus(true);

    expect(await wildPool.paused()).to.be.true;
    expect(await lpPool.paused()).to.be.true;

    const pauseReason = "contract is paused";
    // try calling pause locked functions. they all should fail
    const calls = {
      stake: [123, 129873192831928],
      unstake: [123, 123],
      updateStakeLock: [123, 123],
      sync: [],
      processRewards: [],
      setWeight: [123],
      stakeAsPool: [owner.address, 123],
    };

    const contracts = [wildPool.connect(owner), lpPool.connect(owner)];
    const callsArr = Object.entries(calls);

    // this weird way of writing this was the only way that worked with chai or ethers calls
    // triggering the "Promise rejection was handled asynchronously" warning
    for (let k = 0; k < contracts.length; k++) {
      for (let i = 0; i < callsArr.length; i++) {
        try {
          // @ts-ignore
          await contracts[k][callsArr[i][0]](...callsArr[i][1]);
        } catch (e) {
          expect(e.message).to.include(pauseReason);
        }
      }
    }

    // test unpausing
    await wildPool.connect(owner).setPauseStatus(false);
    await lpPool.connect(owner).setPauseStatus(false);

    expect(await wildPool.paused()).to.be.false;
    expect(await lpPool.paused()).to.be.false;

    // should fail with lock error that is after the pause check
    await expect(
      wildPool.connect(owner).stake(123, 129873192831928)
    ).to.be.revertedWith("invalid lock interval");

    // pause again to test further on the paused contract
    await wildPool.connect(owner).setPauseStatus(true);
    await lpPool.connect(owner).setPauseStatus(true);

    expect(await wildPool.paused()).to.be.true;
    expect(await lpPool.paused()).to.be.true;
  });

  it("should change ProxyAdmin owner to a different account", async () => {
    const proxyAdmin = await hre.upgrades.admin.getInstance();
    const proxyAdminOwner = await proxyAdmin.owner();

    expect(proxyAdminOwner).to.equal(OWNER_ADDRESS);
    expect(proxyAdminOwner).to.not.equal(upgradeOwner.address);

    await proxyAdmin.connect(owner).transferOwnership(upgradeOwner.address);
    const newOwnerAddressPost = await proxyAdmin.owner();
    expect(newOwnerAddressPost).to.equal(upgradeOwner.address);
  });

  it("should upgrade the WILD Pool contract, validate the main state vars", async () => {
    wildPoolNew = await upgradeStakingPool({
      pool: "wild",
      ownerExternal: upgradeOwner,
      transferOwnership: false,
    });
  });

  it("should upgrade the LP Pool contract and validate the main state vars", async () => {
    lpPoolNew = await upgradeStakingPool({
      pool: "lp",
      ownerExternal: upgradeOwner,
      transferOwnership: false,
    });
  });

  it("should use the same new implementation for both proxies, deployed once", async () => {
    const lpPoolImpl = await hre.upgrades.erc1967.getImplementationAddress(lpPoolNew.address);
    const wildPoolImpl = await hre.upgrades.erc1967.getImplementationAddress(wildPoolNew.address);
    expect(lpPoolImpl).to.equal(wildPoolImpl);
  });

  it("should transfer ownership of ProxyAdmin to the original owner", async () => {
    await transferProxyAdminOwnership(upgradeOwner);

    const proxyAdmin = await hre.upgrades.admin.getInstance();
    expect(await proxyAdmin.owner()).to.equal(OWNER_ADDRESS);
  });

  it("should withdraw all WILD tokens from the WILD Pool as the owner", async () => {
    const poolTokenBalancePre = await wildToken.balanceOf(wildPoolNew.address);
    const vaultBalancePre = await wildToken.balanceOf(tokenVault.address);
    expect(poolTokenBalancePre).to.not.equal(0);
    expect(vaultBalancePre).to.equal(0);

    await wildPoolNew.connect(owner).migrationWithdraw(wildToken.address, tokenVault.address);

    const poolTokenBalancePost = await wildToken.balanceOf(wildPoolNew.address);
    const vaultBalancePost = await wildToken.balanceOf(tokenVault.address);

    expect(poolTokenBalancePost).to.equal(0);
    expect(vaultBalancePost).to.equal(vaultBalancePre.add(poolTokenBalancePre));
  });

  it("should withdraw all LP tokens from the LP Pool as the owner", async () => {
    const poolTokenBalancePre = await lpToken.balanceOf(lpPoolNew.address);
    const vaultBalancePre = await lpToken.balanceOf(tokenVault.address);
    expect(poolTokenBalancePre).to.not.equal(0);
    expect(vaultBalancePre).to.equal(0);

    await lpPoolNew.connect(owner).migrationWithdraw(lpToken.address, tokenVault.address);

    const poolTokenBalancePost = await lpToken.balanceOf(lpPoolNew.address);
    const vaultBalancePost = await lpToken.balanceOf(tokenVault.address);

    expect(poolTokenBalancePost).to.equal(0);
    expect(vaultBalancePost).to.equal(vaultBalancePre.add(poolTokenBalancePre));
  });

  it("should revert when trying to withdraw WILD tokens from the WILD Pool as a non-owner", async () => {
    await expect(wildPoolNew.connect(tokenVault).migrationWithdraw(wildToken.address, tokenVault.address))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should validate state vars again after all the operations", async () => {
    const wildPoolStatePostUpgrade = await readContractStorage(poolContractFactory, wildPoolNew);

    compareStorageData(wildPoolStatePreUpgrade, wildPoolStatePostUpgrade);

    const lpPoolStatePostUpgrade = await readContractStorage(poolContractFactory, lpPoolNew);

    compareStorageData(lpPoolStatePreUpgrade, lpPoolStatePostUpgrade);
  });

  it("upgraded contract should still be paused and functions inaccessible", async () => {
    expect(await wildPoolNew.paused()).to.be.true;
    expect(await lpPoolNew.paused()).to.be.true;

    const pauseReason = "contract is paused";
    // try calling pause locked functions. they all should fail
    const calls = {
      stake: [123, 129873192831928],
      unstake: [123, 123],
      updateStakeLock: [123, 123],
      sync: [],
      processRewards: [],
      setWeight: [123],
      stakeAsPool: [owner.address, 123],
    };

    const contracts = [wildPoolNew.connect(owner), lpPoolNew.connect(owner)];
    const callsArr = Object.entries(calls);

    // this weird way of writing this was the only way that worked with chai or ethers calls
    // triggering the "Promise rejection was handled asynchronously" warning
    for (let k = 0; k < contracts.length; k++) {
      for (let i = 0; i < callsArr.length; i++) {
        try {
          // @ts-ignore
          await contracts[k][callsArr[i][0]](...callsArr[i][1]);
        } catch (e) {
          expect(e.message).to.include(pauseReason);
        }
      }
    }
  });

  it("should reset logging", async () => {
    // ! KEEP THIS AT THE END OF ALL TESTS !
    // after() hook doesn't seem to work in this version for some reason
    console.log = originalConsoleLog;
  });
});
