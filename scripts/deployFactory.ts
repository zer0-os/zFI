import { ethers } from "ethers";
import * as hre from "hardhat";
import { doDeployFactory } from "../tasks/deploy";
import { ZStakeCorePool } from "../typechain";
import { getLogger } from "../utilities";

const logger = getLogger("scripts::deployFactory");

// This is what will own the smart contract, having admin access
// and the ability to upgrade the smart contract
const ownerAddress = "0x5eA627ba4cA4e043D38DE4Ad34b73BB4354daf8d";

// WILD Kovan address
const rewardTokenAddress = "0x50A0A3E9873D7e7d306299a75Dc05bd3Ab2d251F";
const rewardVaultAddress = "0x4Afc79F793fD4445f4fd28E3aa708c1475a43Fc4";
const rewardTokensPerBlock = ethers.BigNumber.from("1"); // can't be zero

async function main() {
  await hre.run("compile");

  logger.log(`Deploying to ${hre.network.name}`);

  const tag = "zFI Factory";

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);

  const deploymentData = await doDeployFactory(
    hre,
    deploymentAccount,
    rewardTokenAddress,
    rewardVaultAddress,
    rewardTokensPerBlock,
    tag
  );

  const poolProxy = deploymentData.instance;

  logger.log(`Deployed contract to ${poolProxy.address}`);

  // Initialize implementation contract
  logger.log(
    `Initializing implementation contract at '${deploymentData.implementationAddress}' for security.`
  );

  const impl = (await poolProxy.attach(deploymentData.implementationAddress)) as ZStakeCorePool;
  try {
    let tx = await impl.initializeImplementation();
    // await tx.wait(2);
  } catch (e) {
    console.log((e as any).message);
  }

  logger.log(`transferring pool ownership to ${ownerAddress}`);
  // owner address above is empty for now, so this won't work
  await poolProxy.transferOwnership(ownerAddress);

  logger.log(`transferring proxy admin ownership to ${ownerAddress}`);
  await hre.upgrades.admin.transferProxyAdminOwnership(ownerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main() // TODO how much per block? 5000
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
