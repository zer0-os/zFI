const { ethers, upgrades } = require("hardhat");

import * as hre from "hardhat";

async function main() {
  const lpStakingPool = "0x614E5FfD2D8e936eD29d979dF106081a471e1125";
  const wildStakingPool = "0x0Ab90E0aBca23FdB5e7f447628C6f2BFDB4dE0D0";

  const v2 = await ethers.getContractFactory("zStakeCorePool");
  console.log("1");
  await upgrades.upgradeProxy(wildStakingPool, v2);

  console.log("2");
  await upgrades.upgradeProxy(lpStakingPool, v2);

  // Verify
  console.log(`verifying implementations on etherscan`);

  const wildStakingPoolImplementation =
    await hre.upgrades.erc1967.getImplementationAddress(wildStakingPool);
  await hre.run("verify:verify", { address: wildStakingPoolImplementation });
  const lpStakingPoolImplementation =
    await hre.upgrades.erc1967.getImplementationAddress(lpStakingPool);
  await hre.run("verify:verify", { address: lpStakingPoolImplementation });

  console.log("done");
}

main().catch(console.log);
