import * as hre from "hardhat";

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
