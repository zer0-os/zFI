import { ethers } from "ethers";
import * as hre from "hardhat";

import { doDeployFactory, UpgradeableDeployedContract } from "../tasks/deploy";
import { ZStakePoolFactory } from "../typechain";
import { getLogger } from "../utilities";
import { wait } from "./helpers";

const logger = getLogger("scripts::deployFactory");

// Rewards in WILD, Kovan address
const rewardTokenAddress = "0x50A0A3E9873D7e7d306299a75Dc05bd3Ab2d251F";

// WILD Staking Rewards Pool (from Zach)
const rewardVaultAddress = "0x4Afc79F793fD4445f4fd28E3aa708c1475a43Fc4";

// Can't be zero, and can be adjusted after deployment
const rewardTokensPerBlock = ethers.BigNumber.from("1");
const tag = "zFI Factory";

async function main() {
  await hre.run("compile");

  logger.log(`Deploying to ${hre.network.name}`);

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);

  const deploymentData: UpgradeableDeployedContract = await doDeployFactory(
    hre,
    deploymentAccount,
    rewardTokenAddress,
    rewardVaultAddress,
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
