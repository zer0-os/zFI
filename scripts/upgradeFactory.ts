import { ethers } from "ethers";
import * as hre from "hardhat";
import { ZStakePoolFactory__factory } from "../typechain";
import { getLogger } from "../utilities";
import { getAddresses } from "./helpers";

const logger = getLogger("scripts::upgradeFactory");

// Goerli
const factoryAddress = "0x8CCC39985BB460A62678e5f1Ed04B08c2D02E2C0";

async function main() {
  let addresses = getAddresses(hre.network.name);
  if (!addresses) {
    throw Error(`Did not find configuration addresses for network! ${hre.network.name}`);
  }
  await hre.run("compile");

  logger.log(`Upgrading zFI Factory on ${hre.network.name}`);

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);

  const factory = new ZStakePoolFactory__factory(deploymentAccount);
  await hre.upgrades.upgradeProxy(factoryAddress, factory);

  // Verify
  console.log(`verifying implementation on etherscan`);
  const implementationAddress =
    await hre.upgrades.erc1967.getImplementationAddress(factoryAddress);
  await hre.run("verify:verify", { address: implementationAddress });
}

main().catch(console.error);
