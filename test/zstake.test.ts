import { ethers } from "hardhat";
import { expect } from "chai"
import * as chai from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockContract, MockContractFactory, smock } from "@defi-wonderland/smock";

import { 
  ZStakeCorePool,
  ZStakeCorePool__factory,
  EscrowedERC20,
  EscrowedERC20__factory,
  ERC20,
  ERC20__factory } from "../typechain";

chai.use(smock.matchers);

describe("zStake Tests", function () {
  let creator: SignerWithAddress;
  let staker: SignerWithAddress;
  let owner: SignerWithAddress;
  // let ZStakeCorePool: ZStakeCorePool;
  // let ZStakeCorePool__factory: ZStakeCorePool__factory;

  let mockERC20: MockContract<ERC20>;
  let mockERC20Factory: MockContractFactory<ERC20__factory>;
  let mockEscrowedERC20: MockContract<EscrowedERC20>;
  let mockEscrowedERC20Factory: MockContractFactory<EscrowedERC20__factory>
  let mockZStakeCorePool: MockContract<ZStakeCorePool>;
  let mockZStakeCorePoolFactory: MockContractFactory<ZStakeCorePool__factory>;

  before(async () => {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    creator = signers[0];
    staker = signers[1];
    owner = signers[2];

    mockERC20Factory = await smock.mock("ERC20");
    mockERC20 = await mockERC20Factory.deploy("Wilder World", "WILD");
    const wildAddress = mockERC20.address;

    mockEscrowedERC20Factory = await smock.mock("EscrowedERC20");
    mockEscrowedERC20 = await mockEscrowedERC20Factory.deploy();
    const stakedWildAddress = mockEscrowedERC20.address;

    // might be problematic using random here?
    const poolFactory = ethers.Wallet.createRandom().address;
    const poolToken = ethers.Wallet.createRandom().address;
    const initBlock = "1";
    const weight = "1";

    // const ZStakeCorePoolFactory = new ZStakeCorePool__factory(creator);
    mockZStakeCorePoolFactory = await smock.mock("zStakeCorePool");
    mockZStakeCorePool = await mockZStakeCorePoolFactory.deploy(
      wildAddress,
      stakedWildAddress,
      poolFactory,
      poolToken,
      initBlock,
      weight
    );
  });
  it("Successfully get pending rewards", async function () {

    const account = staker.address;
    const stakerData = {
      tokenAmount: ethers.BigNumber.from("1000"),
      totalWeight: ethers.BigNumber.from("50"),
      subYieldRewards: ethers.BigNumber.from("10"),
      subVaultRewards: ethers.BigNumber.from("10"),
      // deposits: ethers.BigNumber.from(""),
    }
    await mockZStakeCorePool.setVariable("users", {
      account: stakerData
    });

    const res = await mockZStakeCorePool.pendingVaultRewards(staker.address);
    console.log(res);
    // await zStakePoolBase.connect(creator).stake(ethers.utils.parseEther(amount), lockUntil, true);
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
