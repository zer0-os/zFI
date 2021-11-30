import { HardhatRuntimeEnvironment } from "hardhat/types"

export const wait = async (hre: HardhatRuntimeEnvironment, tx: any) => {
  if (hre.network.name !== "hardhat")
    await tx.wait(2);
}