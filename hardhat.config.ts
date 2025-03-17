// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/MnO3SuHlzuCydPWE1XhsYZM_pHZP8_ix",
      },
    },
  },
  typechain: {
    outDir: "typechain",
  }
};
export default config;
