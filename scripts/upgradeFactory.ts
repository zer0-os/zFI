import { ethers } from "ethers";
import * as hre from "hardhat";
import { ZStakePoolFactory__factory } from "../typechain";
import { getLogger } from "../utilities";
import { getAddresses } from "./helpers";

const logger = getLogger("scripts::upgradeFactory");

const factoryAddress = "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a";

async function main() {
  let addresses = getAddresses(hre.network.name);
  if (!addresses)
    throw Error(`Did not find configuration addresses for netork! ${hre.network.name}`);
  await hre.run("compile");

  logger.log(`Deploying to ${hre.network.name}`);

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);

  const factory = new ZStakePoolFactory__factory(deploymentAccount);
  await hre.upgrades.upgradeProxy(factoryAddress, factory);
}

main().catch(console.error);
