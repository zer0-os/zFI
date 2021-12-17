import { ethers } from "ethers";
import * as hre from "hardhat";
import { doDeployCorePool } from "../tasks/deploy";
import { ZStakeCorePool } from "../typechain";
import { getLogger, getDeploymentData } from "../utilities";
import { wait } from "./helpers";

import { getAddresses } from "./helpers";

const logger = getLogger("scripts::deployStakingPools");

// This is what will own the smart contract, having admin access
// and the ability to upgrade the smart contract

async function main() {
  await hre.run("compile");

  let addresses = getAddresses(hre.network.name);
  if (!addresses) throw Error("Only addresses for 'mainnet' and 'kovan' are available right now");

  const initBlock = ethers.BigNumber.from("13820300");

  // Pool token is WILD contract address
  const wildPool = {
    poolToken: addresses.wildToken,
    weight: ethers.utils.parseUnits("150", 6),
    tag: "WILD Staking Pool",
  };

  // ETH/WILD v2 on uniswap
  // https://v2.info.uniswap.org/pair/0xcaa004418eb42cdf00cb057b7c9e28f0ffd840a5
  const liquidityPool = {
    poolToken: addresses.lpToken,
    weight: ethers.utils.parseUnits("850", 6),
    tag: "WILD/ETH LP Staking Pool",
  };

  logger.log(`Deploying to ${hre.network.name}`);

  // Get the deployment account from our hardhat config
  const accounts = await hre.ethers.getSigners();
  const deploymentAccount = accounts[0];

  logger.log(`'${deploymentAccount.address}' will be used as the deployment account`);
  logger.log(`Deploying ${liquidityPool.tag}`);

  const deploymentData = getDeploymentData(hre.network.name);

  if (!deploymentData.factory || !Array.isArray(deploymentData.factory))
    throw Error("Cannot proceed with pool deployment, the factory must be deployed first");

  const factoryAddress = deploymentData.factory[0].address;

  logger.log(`Deploying using factory address: ${factoryAddress}`);

  // Deploy LP Staking Pool
  const lpDeploymentData = await doDeployCorePool(
    hre,
    deploymentAccount,
    addresses.wildToken,
    factoryAddress,
    addresses.lpToken,
    initBlock,
    liquidityPool.weight,
    liquidityPool.tag
  );

  logger.log(`Deploying ${wildPool.tag}`);
  // Deploy Wild Staking Pool
  const wildDeploymentData = await doDeployCorePool(
    hre,
    deploymentAccount,
    addresses.wildToken,
    factoryAddress,
    addresses.wildToken,
    initBlock,
    wildPool.weight,
    wildPool.tag
  );

  const liquidityPoolProxy = lpDeploymentData.instance;
  const wildPoolProxy = wildDeploymentData.instance;

  logger.log(`Deployed LP Staking Pool to ${liquidityPoolProxy.address}`);
  logger.log(`Deployed Wild Staking Pool to ${wildPoolProxy.address}`);

  // Will be the same address for both pools so only do once
  logger.log(
    `Initializing implementation contract at '${lpDeploymentData.implementationAddress}' for security.`
  );

  const impl = (await liquidityPoolProxy.attach(
    lpDeploymentData.implementationAddress
  )) as ZStakeCorePool;

  try {
    const tx = await impl.initializeImplementation();
    await wait(hre.network.name, tx);
  } catch (e) {
    console.log((e as any).message);
  }

  logger.log(`transferring pool ownership to ${addresses.ownerAddress}`);

  // Deployment addresses will be different, must be called twice
  // let tx = await liquidityPoolProxy.transferOwnership(addresses.ownerAddress);
  // await wait(hre.network.name, tx);

  // tx = await wildPoolProxy.transferOwnership(addresses.ownerAddress);
  // await wait(hre.network.name, tx);

  // logger.log(`transferring proxy admin ownership to ${addresses.ownerAddress}`);
  // await hre.upgrades.admin.transferProxyAdminOwnership(addresses.ownerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
