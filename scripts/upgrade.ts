const { ethers, upgrades } = require("hardhat");

async function main() {
  const v2 = await ethers.getContractFactory("zStakeCorePool");
  console.log("1");
  await upgrades.upgradeProxy("0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF", v2);

  console.log("2");
  await upgrades.upgradeProxy("0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4", v2);

  console.log("done");
}

main().catch(console.log);
