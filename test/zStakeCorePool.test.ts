
import { expect } from "chai";
import { ethers } from "hardhat";
import { ZStakeCorePool__factory, ZStakeCorePool } from "../typechain";

import * as hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("zStakeCorePool", function () {
  let pool: ZStakeCorePool;
  let owner: SignerWithAddress;
  let staker: SignerWithAddress;

  beforeEach(async function () {
    // const Pool = await ethers.getContractFactory("zStakeCorePool");
    [owner, staker] = await ethers.getSigners();

    const factory = new ZStakeCorePool__factory(owner);

    pool = await hre.upgrades.deployProxy(factory, [owner.address]) as ZStakeCorePool;
    await pool.deployed();
  });

  describe("Batch Unstaking Scenario", function () {
    it("Stakes, processes rewards several times, then unstakes with batch", async function () {
    });
  });
});
