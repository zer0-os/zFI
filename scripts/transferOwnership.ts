import { ethers } from "ethers";
import * as hre from "hardhat";
import * as fs from "fs";
import { ZStakePoolFactory, ZStakePoolFactory__factory } from "../typechain";
import { DeploymentOutput, deploymentsFolder, getDeploymentData, getLogger } from "../utilities";
import { getAddresses } from "./helpers";

const logger = getLogger("scripts::transferOwnership");

async function main() {
  await hre.run("compile");

  let addresses = getAddresses(hre.network.name);
  if (!addresses) throw Error("Only addresses for 'mainnet' and 'kovan' are available right now")

  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];

  let deploymentData: DeploymentOutput = getDeploymentData(hre.network.name);

  if (!deploymentData.factory && !deploymentData.pools) {
    logger.error("zFI Factory, LP Staking Pool, and WILD Staking Pool are not deployed");
    process.exit(1);
  }

  const factoryData = deploymentData.factory[0];
  const factoryFactory = new ZStakePoolFactory__factory(deployer);
  const factoryProxy: ZStakePoolFactory = factoryFactory.attach(factoryData.address);

  logger.log(`transferring factory ownership to ${addresses.ownerAddress}`);
  await factoryProxy.transferOwnership(addresses.ownerAddress);

  // 'transparent proxy' ownership not affected by admin proxy?
  logger.log(`transferring proxy admin ownership to ${addresses.ownerAddress}`);
  await hre.upgrades.admin.transferProxyAdminOwnership(addresses.ownerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
