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
  ZStakePoolFactory,
  ZStakePoolBase,
  ZStakePoolBase__factory,
  ZStakeERC20,
  ZStakeERC20__factory
} from "../typechain";
import { expect } from "chai";

chai.use(solidity);

describe("zStakeCorePool Tests", function () {
  let staker: SignerWithAddress;
  let faker: SignerWithAddress;
  let initialHolder: SignerWithAddress;

  let mockERC20: MockContract<ERC20>;
  let mockERC20Factory: MockContractFactory<ERC20__factory>;
  let mockEscrowedERC20: MockContract<EscrowedERC20>;
  let mockEscrowedERC20Factory: MockContractFactory<EscrowedERC20__factory>
  let mockZStakeCorePool: MockContract<ZStakeCorePool>;
  let mockZStakeCorePoolFactory: MockContractFactory<ZStakeCorePool__factory>;
  let mockZStakePoolFactory: MockContract<ZStakePoolFactory>;
  let mockZStakePoolFactoryFactory: MockContractFactory<ZStakePoolFactory__factory>;
  let mockZStakePoolBase: MockContract<ZStakePoolBase>;
  let mockZStakePoolBaseFactory: MockContractFactory<ZStakePoolBase__factory>;
  let mockZStakeERC20: MockContract<ZStakeERC20>;
  let mockZStakeERC20Factory: MockContractFactory<ZStakeERC20__factory>;

  let zStakePoolBase: ZStakePoolBase;

  let wildAddress: string;
  let stakedWildAddress: string;
  let poolFactory: string;
  let poolToken: string;

  before(async () => {

    const signers: SignerWithAddress[] = await ethers.getSigners();
    staker = signers[0];
    faker = signers[1];
    initialHolder = signers[2];

    mockZStakeERC20Factory = await smock.mock("zStakeERC20");
    mockZStakeERC20 = await mockZStakeERC20Factory.deploy(initialHolder.address);
    poolToken = mockZStakeERC20.address

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
      poolToken,
      initBlock,
      weight
    );

    mockZStakePoolBaseFactory = await smock.mock("zStakePoolBase");
    mockZStakePoolBase = await mockZStakePoolBaseFactory.deploy(
      wildAddress,
      stakedWildAddress,
      mockZStakePoolFactory.address,
      mockZStakeCorePool.address, // not pool token
      initBlock,
      weight
    );

    // For debugging
    console.log(poolToken);
    console.log(wildAddress);
    console.log(stakedWildAddress);
    console.log(mockZStakePoolFactory.address);
    // Don't mock, use actual instances
    // const zStakePoolBaseFactory = new ZStakePoolBase__factory();
    // zStakePoolBase = await zStakePoolBaseFactory.deploy(
    //   wildAddress,
    //   stakedWildAddress,
    //   mockZStakePoolFactory.address,
    //   poolToken,
    //   initBlock,
    //   weight
    // );

  });
  it("pendingVaultRewards: Successfully get pending vault rewards", async () => {
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
    expect(formattedVaultRewards).to.equal("490.0");
  });
  it("setVault: Vault is set correctly", async () => {
    mockZStakePoolFactory.owner.returns(staker.address);

    await mockZStakeCorePool.connect(staker).setVault(stakedWildAddress);

    const newVault = await mockZStakeCorePool.connect(staker).vault();
    expect(newVault).to.equal(stakedWildAddress);
  });
  it("setVault: Fails to set a vault if the wrong address calls the function", async () => {
    mockZStakePoolFactory.owner.returns(faker.address);

    const tx = mockZStakeCorePool.connect(staker).setVault(stakedWildAddress);

    await expect(tx).to.be.revertedWith("access denied")
  });
  it("setVault: Fails to set a vault if the given address is empty", async () => {
    const voidSigner = "0x0000000000000000000000000000000000000000"
    mockZStakePoolFactory.owner.returns(staker.address);

    const tx = mockZStakeCorePool.connect(staker).setVault(voidSigner);

    await expect(tx).to.be.revertedWith("zero input")
  });
  it("stake: Successfully stakes a specific value", async () => {
    const amount = ethers.BigNumber.from("10000000000000000000");
    const n = ethers.provider.blockNumber
    const lockUntil = n + 50;

    const data = {
      tokenAmount: ethers.BigNumber.from("1000"),
      totalWeight: ethers.BigNumber.from("50000000000000"), // 50*10^12
      subYieldRewards: ethers.BigNumber.from("10000000000000"), // 10*10^12
      subVaultRewards: ethers.BigNumber.from("10000000000000"), // 10*10^12
      // deposits: ethers.utils.arrayify([])
      // deposits array somehow?
      // RuntimeError: abort(Error: array types not yet supported. Follow this issue for more info https://github.com/defi-wonderland/smock/issues/31)
    }

    mockZStakePoolBase.setVariable("users", {
      [staker.address]: data
    });
    const yieldRewardsPerWeight = ethers.BigNumber.from("10000000000000"); // 10*10^12
    mockZStakePoolBase.setVariable("yieldRewardsPerWeight", yieldRewardsPerWeight);
    mockZStakePoolFactory.getPoolAddress.returns(mockZStakeCorePool.address);
    mockZStakePoolFactory.poolExists.returns(true);

    const balance = ethers.utils.parseUnits("500000000.0", 18)
    mockERC20.balanceOf.returns(balance);
    //   const val = await mockZStakePoolBase.connect(staker).testFunc();
    // console.log("poolFactory.getPoolAddress", val);
    await mockZStakePoolBase.connect(staker).stake(amount, lockUntil, false);
  })
  // end to end, provide WILD/ETH LP, then stake that LP, rewards in WILD 
  // Stake, skip blocks, process rewards, unstake
});
