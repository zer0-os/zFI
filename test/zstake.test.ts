import { ethers } from "hardhat";
import * as chai from "chai";
import { solidity } from "ethereum-waffle"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockContract, MockContractFactory, smock } from "@defi-wonderland/smock";

import { 
  ZStakeCorePool,
  ZStakeCorePool__factory,
  EscrowedERC20,
  EscrowedERC20__factory,
  ERC20,
  ERC20__factory, 
  ZStakePoolFactory__factory,
  ZStakePoolFactory} from "../typechain";
import { expect } from "chai";

chai.use(solidity);

describe("zStake Tests", function () {
  let staker: SignerWithAddress;
  let faker: SignerWithAddress;

  let mockERC20: MockContract<ERC20>;
  let mockERC20Factory: MockContractFactory<ERC20__factory>;
  let mockEscrowedERC20: MockContract<EscrowedERC20>;
  let mockEscrowedERC20Factory: MockContractFactory<EscrowedERC20__factory>
  let mockZStakeCorePool: MockContract<ZStakeCorePool>;
  let mockZStakeCorePoolFactory: MockContractFactory<ZStakeCorePool__factory>;
  let mockZStakePoolFactory: MockContract<ZStakePoolFactory>;
  let mockZStakePoolFactoryFactory: MockContractFactory<ZStakePoolFactory__factory>

  let wildAddress: string;
  let stakedWildAddress: string;
  let poolFactory: string;
  let poolToken: string;

  before(async () => {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    staker = signers[0];
    faker = signers[1];

    mockERC20Factory = await smock.mock("ERC20");
    mockERC20 = await mockERC20Factory.deploy("Wilder World", "WILD");
    wildAddress = mockERC20.address;

    mockEscrowedERC20Factory = await smock.mock("EscrowedERC20");
    mockEscrowedERC20 = await mockEscrowedERC20Factory.deploy();
    stakedWildAddress = mockEscrowedERC20.address;

    const initBlock = "1";
    const endBlock = "2";
    const weight = "1";

    mockZStakePoolFactoryFactory = await smock.mock("zStakePoolFactory");
    mockZStakePoolFactory = await mockZStakePoolFactoryFactory.deploy(
      wildAddress,
      stakedWildAddress,
      // wild per block is 10*10^18
      ethers.BigNumber.from("10000000000000000000"),
      // Set blocks per update
      ethers.BigNumber.from("5"),
      initBlock,
      endBlock
    );

    mockZStakeCorePoolFactory = await smock.mock("zStakeCorePool");
    mockZStakeCorePool = await mockZStakeCorePoolFactory.deploy(
      wildAddress,
      stakedWildAddress,
      mockZStakePoolFactory.address,
      wildAddress,
      initBlock,
      weight
    );

  });
  it("Successfully get pending vault rewards", async () => {
    const data = {
      tokenAmount: ethers.BigNumber.from("1000"),
      totalWeight: ethers.BigNumber.from("50000000000000"), // 50*10^12
      subYieldRewards: ethers.BigNumber.from("10000000000000"), // 10*10^12
      subVaultRewards: ethers.BigNumber.from("10000000000000"), // 10*10^12
    }
    await mockZStakeCorePool.setVariable("users", {
      [staker.address]: data
    });

    // 10*10^12
    await mockZStakeCorePool.setVariable("vaultRewardsPerWeight", ethers.BigNumber.from("10000000000000"));

    const vaultRewards = await mockZStakeCorePool.pendingVaultRewards(staker.address);
    const formattedVaultRewards = ethers.utils.formatUnits(vaultRewards.toString(), 12);
    console.log(formattedVaultRewards);
    expect(formattedVaultRewards).to.equal("490.0");
  });
  it("Vault is set correctly", async () => {
    mockZStakePoolFactory.owner.returns(staker.address);

    // non-contract account error
    await mockZStakeCorePool.connect(staker).setVault(stakedWildAddress);

    const newVault = await mockZStakeCorePool.connect(staker).vault();
    expect(newVault).to.equal(stakedWildAddress);
  });
  it("Fails to set a vault if the wrong address calls the function", async () => {
    mockZStakePoolFactory.owner.returns(faker.address);
    const tx = mockZStakeCorePool.connect(staker).setVault(stakedWildAddress);
    await expect(tx).to.be.revertedWith("access denied")
  });
  it("Fails to set a vault if the given address is empty", async () => {
    const voidSigner = "0x0000000000000000000000000000000000000000"
    mockZStakePoolFactory.owner.returns(staker.address);
    const tx = mockZStakeCorePool.connect(staker).setVault(voidSigner);
    await expect(tx).to.be.revertedWith("zero input")
  });
});
