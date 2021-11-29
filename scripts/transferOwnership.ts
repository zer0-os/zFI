import { ethers } from "ethers";
import * as hre from "hardhat";
import * as fs from "fs";

import { ZStakePoolFactory, ZStakePoolFactory__factory } from "../typechain";
import { DeploymentOutput, deploymentsFolder, getLogger } from "../utilities";

const logger = getLogger("scripts::transferOwnership");

// This is what will own the smart contract, having admin access
// and the ability to upgrade the smart contract
const ownerAddress = "0x5eA627ba4cA4e043D38DE4Ad34b73BB4354daf8d";

async function main() {
  await hre.run("compile");

  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];

  const fileName = `${hre.network.name}.json`;
  const filepath = `${deploymentsFolder}/${fileName}`;

  let deploymentData: DeploymentOutput;

  try {
    deploymentData = JSON.parse(fs.readFileSync(filepath).toString()) as DeploymentOutput;
  } catch (e) {
    logger.debug(
      `Cannot transfer ownership of a contract without pre-existing deployments. Try running the deployment scripts first.`
    );
    process.exit(1);
  }

  if (!deploymentData.factory && !deploymentData.pools) {
    logger.error("zFI Factory, LP Staking Pool, and WILD Staking Pool are not deployed");
    process.exit(1);
  }

  const factoryData = deploymentData.factory[0];
  const factoryFactory = new ZStakePoolFactory__factory(deployer);
  const factoryProxy: ZStakePoolFactory = factoryFactory.attach(factoryData.address);

  logger.log(`transferring factory ownership to ${ownerAddress}`);
  await factoryProxy.transferOwnership(ownerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
