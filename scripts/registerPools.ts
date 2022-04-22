import * as hre from "hardhat";
import * as fs from "fs";
import { ZStakePoolFactory, ZStakePoolFactory__factory } from "../typechain";
import { DeploymentOutput, deploymentsFolder, getDeploymentData, getLogger } from "../utilities";
import { wait } from "./helpers";
import { getAddresses } from "./helpers";

const logger = getLogger("scripts::registerPools");

async function main() {
  let addresses = getAddresses(hre.network.name);
  if (!addresses) throw Error("Only addresses for 'mainnet' and 'kovan' are available right now");

  await hre.run("compile");

  logger.log(`Registering staking pools on ${hre.network.name}`);

  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];

  logger.log(`Address '${deployer.address}' will be used in the registration of the pools`);

  const deploymentData = getDeploymentData("mainnet");

  if (!deploymentData.factory || !deploymentData.pools) {
    logger.error("zFI Factory, LP Staking Pool, and WILD Staking Pool are not deployed");
    process.exit(1);
  }

  const factoryData = deploymentData.factory[0];
  const factoryFactory = new ZStakePoolFactory__factory(deployer);
  const factory: ZStakePoolFactory = factoryFactory.attach(factoryData.address);

  const pools = deploymentData.pools;

  // let tx = await factory.registerPool(pools[0].address);
  // await wait(hre.network.name, tx);
  // logger.log(`Pool ${pools[0].address} was registered with factory ${factory.address}`);

  let tx = await factory.registerPool(pools[1].address);
  await wait(hre.network.name, tx);
  logger.log(`Pool ${pools[1].address} was registered with factory ${factory.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
