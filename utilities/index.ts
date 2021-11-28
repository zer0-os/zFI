import * as hre from "hardhat";
import logdown from "logdown";
import * as fs from "fs";

export const deploymentsFolder = "./deployments";

export interface DeploymentData {
  tag?: string;
  address: string;
  version: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { [key: string]: any };
  isUpgradable: boolean;
  admin?: string;
  implementation?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: { [key: string]: any };
}

export interface DeploymentOutput {
  // array must always be sorted from oldest->most recent
  [type: string]: DeploymentData[];
}

export const asSingleBlock = async (func: () => Promise<void> | void) => {
  await hre.ethers.provider.send("evm_setAutomine", [false]);
  await func();
  await hre.ethers.provider.send("evm_mine", []);
  await hre.ethers.provider.send("evm_setAutomine", [true]);
};

export const mineBlocks = async (numBlocks: number) => {
  for (let i = 0; i < numBlocks; ++i) {
    await hre.ethers.provider.send("evm_mine", []);
  }
};

export const getCurrentBlockTimestamp = async () => {
  const block = await hre.ethers.provider.getBlock(await hre.ethers.provider.getBlockNumber());
  return block.timestamp;
};

export const advanceBlockTimestampBy = async (seconds: number) => {
  await hre.network.provider.send("evm_increaseTime", [seconds]);
  await hre.network.provider.send("evm_mine");
};

export const secondsPerYear = 60 * 60 * 24 * 365;

export const getLogger = (title: string): logdown.Logger => {
  const logger = logdown(title);
  logger.state.isEnabled = true;
  return logger;
}

export const getDeploymentData = (network: string): DeploymentOutput => {
  const filepath = `${deploymentsFolder}/${network}.json`;
  const fileExists = fs.existsSync(filepath);

  if (!fileExists) {
    throw new Error(`No deployment data for ${network}`);
  }

  const fileContents = fs.readFileSync(filepath);
  const data = JSON.parse(fileContents.toString()) as DeploymentOutput;

  return data;
};

export const writeDeploymentData = (
  network: string,
  data: DeploymentOutput
): void => {
  const filepath = `${deploymentsFolder}/${network}.json`;
  const jsonToWrite = JSON.stringify(data, undefined, 2);

  fs.writeFileSync(filepath, jsonToWrite);
};
