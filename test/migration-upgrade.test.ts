import * as hre from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  MockToken, MockToken__factory,
  ZStakeCorePool,
  ZStakeCorePool__factory, ZStakeCorePoolMigration, ZStakeCorePoolMigration__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory
} from "../typechain";
import { expect } from "chai";
import { getStorageLayout, getUnlinkedBytecode, getVersion } from "@openzeppelin/upgrades-core";
import { readValidations } from "@openzeppelin/hardhat-upgrades/dist/utils/validations";
import { BigNumber, Contract, ContractFactory } from "ethers";


const OWNER_ADDRESS = "0x1A1d3644fc9906B1EE3d35842789A83D33e99943";
const FACTORY_ADDRESS = "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a";
const WILD_POOL_ADDRESS = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4";
const LP_POOL_ADDRESS = "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF";
const WILD_TOKEN_ADDRESS = "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34";
const LP_TOKEN_ADDRESS = "0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5";

export type ContractStorageData = Array<{
  [label: string]: string | number | Array<{}>
}>;


export const readContractStorage = async (
  contractFactory : ContractFactory,
  contractObj : Contract,
) : Promise<ContractStorageData> => {
  const validations = await readValidations(hre);
  const unlinkedBytecode = getUnlinkedBytecode(validations, contractFactory.bytecode);
  const encodedArgs = contractFactory.interface.encodeDeploy();
  const version = getVersion(unlinkedBytecode, contractFactory.bytecode, encodedArgs);
  const layout = getStorageLayout(validations, version);

  return await layout.storage.reduce(
    async (acc : Promise<ContractStorageData> , {
      contract,
      label,
      type
    }) : Promise<ContractStorageData> => {
      const newAcc = await acc;

      // TODO: to make it general for any contract change this to more generally pick exceptions here
      if(
        (
          contract === "zStakePoolBase" ||
          contract === "zStakeCorePool" ||
          contract === "zStakeCorePoolMigration"
        ) && !type.includes("mapping")) {
        try {
          let value = await contractObj[label]();
          if (value._isBigNumber) {
            value = value.toString();
          }

          newAcc.push({ [label]: value });
        } catch (e) {
          console.log(`Error on LABEL ${label}: ${e.message}`);
        }
      }

      return newAcc;
    }, Promise.resolve([])
  );
};


describe.only("Migration Upgrade", () => {
  let owner: SignerWithAddress;
  let tokenVault: SignerWithAddress;

  let poolContractFactory : ZStakeCorePool__factory;

  let factory: ZStakePoolFactory;
  let wildPool: ZStakeCorePool;
  let lpPool: ZStakeCorePool;
  let wildToken: MockToken;
  let lpToken: MockToken;

  // upgraded
  let wildPoolNew: ZStakeCorePoolMigration;
  let lpPoolNew: ZStakeCorePoolMigration;

  let lpPoolStatePreUpgrade: ContractStorageData;
  let wildPoolStatePreUpgrade: ContractStorageData;

  before(async () => {
    await impersonateAccount(OWNER_ADDRESS);

    owner = await hre.ethers.getSigner(OWNER_ADDRESS);
    [,,tokenVault] = await hre.ethers.getSigners();

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

    // if we want to see it ->
    // const lpPoolDataStr = JSON.stringify(lpPoolStatePreUpgrade, null, "\t");
    // const wildPoolDataStr = JSON.stringify(wildPoolStatePreUpgrade, null, "\t");

    // console.log(`
    // LP Pool Storage Data: ${lpPoolDataStr}
    // --------------------------
    // Wild Pool Storage Data: ${wildPoolDataStr}
    // `);
  });

  it("should upgrade the WILD Pool contract and validate the main state vars", async () => {
    const corePoolContractFact = new ZStakeCorePoolMigration__factory(owner);

    // Upgrade the WILD Pool contract
    wildPoolNew = await hre.upgrades.upgradeProxy(wildPool, corePoolContractFact) as ZStakeCorePoolMigration;

    const wildPoolStatePostUpgrade = await readContractStorage(poolContractFactory, wildPoolNew);

    wildPoolStatePostUpgrade.forEach(
      (stateVar, idx) => {
        const [key, value] = Object.entries(stateVar)[0];

        expect(value).to.equal(wildPoolStatePreUpgrade[idx][key], `Mismatch on state var ${key} at idx ${idx}`);
      }
    );
  });

  it("should upgrade the LP Pool contract and validate the main state vars", async () => {
    const corePoolContractFact = new ZStakeCorePoolMigration__factory(owner);

    // Upgrade the LP Pool contract
    lpPoolNew = await hre.upgrades.upgradeProxy(lpPool, corePoolContractFact) as ZStakeCorePoolMigration;

    const lpPoolStatePostUpgrade = await readContractStorage(poolContractFactory, lpPoolNew);

    lpPoolStatePostUpgrade.forEach(
      (stateVar, idx) => {
        const [key, value] = Object.entries(stateVar)[0];

        expect(value).to.equal(lpPoolStatePreUpgrade[idx][key], `Mismatch on state var ${key} at idx ${idx}`);
      }
    );
  });

  it("should withdraw all WILD tokens from the WILD Pool as the owner", async () => {
    const poolTokenBalancePre = await wildToken.balanceOf(wildPoolNew.address);
    const vaultBalancePre = await wildToken.balanceOf(tokenVault.address);

    await wildPoolNew.connect(owner).migrationWithdraw(wildToken.address, tokenVault.address);

    const poolTokenBalancePost = await wildToken.balanceOf(wildPoolNew.address);
    const vaultBalancePost = await wildToken.balanceOf(tokenVault.address);

    expect(poolTokenBalancePre).to.not.equal(0);
    expect(poolTokenBalancePost).to.equal(0);
    expect(vaultBalancePost).to.equal(vaultBalancePre.add(poolTokenBalancePre));
  });

  it("should revert when trying to withdraw WILD tokens from the WILD Pool as a non-owner", async () => {
    await expect(wildPoolNew.connect(tokenVault).migrationWithdraw(wildToken.address, tokenVault.address))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });
});
