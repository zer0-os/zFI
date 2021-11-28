import { ethers } from "ethers";
import * as hre from "hardhat";
import { doDeployCorePool, UpgradeableDeployedContract } from "../tasks/deploy";
import { ZStakeCorePool } from "../typechain";
import { getLogger } from "../utilities";

const logger = getLogger("scripts::deployLiquidityPool");

// This is what will own the smart contract, having admin access
// and the ability to upgrade the smart contract
const ownerAddress = "0x5eA627ba4cA4e043D38DE4Ad34b73BB4354daf8d";
const rewardTokenAddress = "0x50A0A3E9873D7e7d306299a75Dc05bd3Ab2d251F";
const zStakePoolFactory = "0xFD471836031dc5108809D173A067e8486B9047A3";

// WILD staking pool, rewards in WILD
const poolToken = rewardTokenAddress;

const initBlock = ethers.BigNumber.from("13704400"); // from latest on etherscan

// weight is 800 for LP pool
const weight = ethers.utils.parseUnits("200", 6);

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run("compile");

  logger.log(`Deploying to ${hre.network.name}`);

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);

  const deploymentData = await doDeployCorePool(
    hre,
    deploymentAccount,
    rewardTokenAddress,
    zStakePoolFactory,
    poolToken,
    initBlock,
    weight,
    "WILD Staking Pool"
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
    // await tx.wait(2); // why should we do this?
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
