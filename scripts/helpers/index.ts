import { HardhatRuntimeEnvironment } from "hardhat/types";

export const wait = async (network: string, tx: any) => {
  if (network === "hardhat") {
    return await tx.wait(0);
  } else {
    return await tx.wait(2);
  }
};

export const getAddresses = (network: string) => {
  if(network === "mainnet") {
    return {
      ownerAddress: "0x37358Aa5D051B434C23Bad744E56E6A484107272",
      rewardVault: "0xA5F58f034969055594518611691E132736913997", // Gnosis safe
      wildToken: "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34",
      lpToken: "0xcaa004418eb42cdf00cb057b7c9e28f0ffd840a5" // Uniswap v2 pool
    }
  } else {
    // All Kovan addresses for testing or homestead
    // Rinkeby isn't setup yet
    return {
      ownerAddress: "0x5eA627ba4cA4e043D38DE4Ad34b73BB4354daf8d",
      rewardVault: "0x4Afc79F793fD4445f4fd28E3aa708c1475a43Fc4",
      wildToken: "0x50A0A3E9873D7e7d306299a75Dc05bd3Ab2d251F",
      lpToken: "0xD364C50c33902110230255FE1D730D84FA23e48e" // LOOT
    }
  }
}
