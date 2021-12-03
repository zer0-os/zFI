import { HardhatRuntimeEnvironment } from "hardhat/types";

export const wait = async (network: string, tx: any) => {
  if (network !== "hardhat") await tx.wait(2);
};
