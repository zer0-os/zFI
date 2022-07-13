// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { task, HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import { ethers } from "ethers";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
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
      accounts: [
        {
          privateKey: `0x${process.env.MAINNET_PRIVATE_KEY}`,
          balance: ethers.utils.parseEther("1000").toString(),
        },
      ],
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/MnO3SuHlzuCydPWE1XhsYZM_pHZP8_ix",
      },
    },
    mainnet: {
      accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
      url: `https://mainnet.infura.io/v3/0e6434f252a949719227b5d68caa2657`,
    },
    kovan: {
      accounts: { mnemonic: process.env.TESTNET_MNEMONIC || "" },
      url: `https://kovan.infura.io/v3/0e6434f252a949719227b5d68caa2657`,
    },
    ropsten: {
      accounts: { mnemonic: process.env.TESTNET_MNEMONIC || "" },
      url: "https://ropsten.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    },
    rinkeby: {
      accounts: process.env.TEST_KEY ? [process.env.TEST_KEY] : [],
      url: "https://rinkeby.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    },
    goerli: {
      accounts: process.env.TEST_KEY ? [process.env.TEST_KEY] : [],
      url: "https://goerli.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    },
    localhost: {
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      url: "http://127.0.0.1:8545",
      chainId: 1776,
      accounts: {
        mnemonic: "test test test test test test test test test test test test",
      },
    },
  },
  etherscan: {
    apiKey: "FZ1ANB251FC8ISFDXFGFCUDCANSJNWPF9Q",
  },
};
export default config;
