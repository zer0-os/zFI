import { ethers } from "ethers";
import * as hre from "hardhat";

import { doDeployFactory, UpgradeableDeployedContract } from "../tasks/deploy";
import { ZStakePoolFactory } from "../typechain";
import { getLogger } from "../utilities";
import { wait } from "./helpers";
import { getAddresses } from "./helpers";

const logger = getLogger("scripts::deployFactory");

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

  // Can't be zero, and can be adjusted after deployment
  const rewardTokensPerBlock = ethers.utils.parseEther("4");
  const tag = "zFI Factory";

  const deploymentData: UpgradeableDeployedContract = await doDeployFactory(
    hre,
    deploymentAccount,
    addresses.wildToken,
    addresses.rewardVault,
    rewardTokensPerBlock,
    tag
  );

  const factoryProxy = deploymentData.instance;

  logger.log(`Deployed contract to ${factoryProxy.address}`);

  // Initialize implementation contract
  logger.log(
    `Initializing implementation contract at '${deploymentData.implementationAddress}' for security.`
  );

  const impl = (await factoryProxy.attach(
    deploymentData.implementationAddress
  )) as ZStakePoolFactory;
  try {
    const tx = await impl.initializeImplementation();
    await wait(hre.network.name, tx);
  } catch (e) {
    console.log((e as any).message);
  }

  // Verify
  console.log(`verifying implementation on etherscan`);
  const implementationAddress =
    await hre.upgrades.erc1967.getImplementationAddress(factoryProxy.address);
  await hre.run("verify:verify", { address: implementationAddress });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
