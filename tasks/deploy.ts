import { task } from "hardhat/config";
import { Contract, ContractFactory, ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as fs from "fs";

import {
  DeploymentOutput,
  getLogger,
  getDeploymentData,
  DeploymentData,
  writeDeploymentData,
} from "../utilities";

export const deploymentsFolder = "./deployments";

import { hashBytecodeWithoutMetadata, Manifest } from "@openzeppelin/upgrades-core";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export interface DeployedContract {
  isUpgradable: boolean;
  instance: Contract;
  version: string;
  date: string;
}

export interface UpgradeableDeployedContract extends DeployedContract {
  implementationAddress: string;
  admin: string;
}

const logger = getLogger("tasks::deploy");

const deployUpgradableContract = async (
  hre: HardhatRuntimeEnvironment,
  factory: ContractFactory,
  args: unknown[] | undefined
) => {
  const bytecodeHash = hashBytecodeWithoutMetadata(factory.bytecode);

  logger.debug(`Implementation version is ${bytecodeHash}`);

  const instance = await hre.upgrades.deployProxy(factory, args, {
    initializer: "initialize",
  });
  await instance.deployed();
  setTimeout(() => { }, 5000);

  logger.log(`Deployed contract to ${instance.address}`);

  const ozUpgradesManifestClient = await Manifest.forNetwork(hre.network.provider);
  const manifest = await ozUpgradesManifestClient.read();
  const implementationContract = manifest.impls[bytecodeHash];

  if (!manifest.admin) {
    throw Error(`No admin address?`);
  }

  if (!implementationContract) {
    throw Error(`No implementation contract?`);
  }

  const deploymentData: UpgradeableDeployedContract = {
    isUpgradable: true,
    instance,
    implementationAddress: implementationContract.address,
    version: bytecodeHash,
    date: new Date().toISOString(),
    admin: manifest.admin.address,
  };

  return deploymentData;
};

export const doDeployCorePool = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
  rewardTokenAddress: string,
  factoryAddress: string,
  poolTokenAddress: string,
  initBlock: ethers.BigNumber,
  weight: ethers.BigNumber,
  tag?: string
): Promise<UpgradeableDeployedContract> => {
  const factory = await hre.ethers.getContractFactory("zStakeCorePool", deployer);
  logger.debug(`Deploying pool contract...`);
  const deploymentData: UpgradeableDeployedContract = await deployUpgradableContract(hre, factory, [
    rewardTokenAddress,
    factoryAddress,
    poolTokenAddress,
    initBlock,
    weight
  ]);
  logger.debug(`Saving deployment data...`);
  await saveDeploymentData(
    hre,
    "pools",
    deploymentData,
    {
      rewardTokenAddress,
      factoryAddress,
      poolTokenAddress,
      initBlock,
      weight,
    },
    undefined,
    tag
  );

  return deploymentData;
};

export const doDeployFactory = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
  rewardTokenAddress: string,
  rewardVaultAddress: string,
  rewardTokensPerBlock: ethers.BigNumber,
  tag?: string
): Promise<UpgradeableDeployedContract> => {
  const factory = await hre.ethers.getContractFactory("zStakePoolFactory", deployer);
  logger.debug(`Deploying factory contract...`);
  const deploymentData: UpgradeableDeployedContract = await deployUpgradableContract(hre, factory, [
    rewardTokenAddress,
    rewardVaultAddress,
    rewardTokensPerBlock,
  ]);
  logger.debug(`Saving deployment data...`);
  await saveDeploymentData(
    hre,
    "factory",
    deploymentData,
    {
      rewardTokenAddress,
      rewardVaultAddress,
      rewardTokensPerBlock
    },
    undefined,
    tag
  );
  return deploymentData;
};

const saveDeploymentData = async (
  hre: HardhatRuntimeEnvironment,
  type: string,
  deployment: DeployedContract | UpgradeableDeployedContract,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { [key: string]: any },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: { [key: string]: any },
  tag?: string
) => {
  let deploymentData: DeploymentOutput = {};

  try {
    const existingData = getDeploymentData(hre.network.name);
    deploymentData = existingData;
  } catch (e) {
    // create folder
    logger.debug(`no existing deployments found, creating folder`);
    fs.mkdirSync(deploymentsFolder, { recursive: true });
  }

  if (!deploymentData[type]) {
    deploymentData[type] = [];
  }

  const deployments = deploymentData[type];

  let implementation: string | undefined;
  let admin: string | undefined;

  // extract extra data if this is an upgradable contract
  if (deployment.isUpgradable) {
    const upgradableDeployment = deployment as UpgradeableDeployedContract;
    implementation = upgradableDeployment.implementationAddress;
    admin = upgradableDeployment.admin;
  }

  const finalTag = tag || "untagged";

  checkUniqueTag(finalTag, deployments);

  logger.log(`Registering new deployment of ${type} with tag '${finalTag}'`);
  const deploymentInstance: DeploymentData = {
    tag,
    address: deployment.instance.address,
    version: deployment.version,
    date: deployment.date,
    args,
    isUpgradable: deployment.isUpgradable,
    admin,
    implementation,
    metadata,
  };

  deployments.push(deploymentInstance);

  writeDeploymentData(hre.network.name, deploymentData);
  logger.log(`Updated ${hre.network.name} deployment file.`);
};

const checkUniqueTag = (tag: string, deployments: DeploymentData[]) => {
  const numMatches = deployments.filter((d) => {
    if (!d.tag) {
      return false;
    }
    return d.tag.toLowerCase() === tag.toLowerCase();
  }).length;

  logger.warn(`There are ${numMatches} deployments with the same tag of ${tag}`);
};
