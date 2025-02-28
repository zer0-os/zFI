// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { task, HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";

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
      // url: "",
      // accounts: [
      //   // {
      //   //   privateKey: `0x${process.env.PRIVATE_KEY_A}`,
      //   //   balance: "1000000000000000000000",
      //   // },
      // ],
      forking: {
        url: "https://mainnet.infura.io/v3/fa959ead3761429bafa6995a4b25397e",
      },
    },
    // mainnet: {
    //   accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
    //   url: `https://mainnet.infura.io/v3/0e6434f252a949719227b5d68caa2657`,
    // },
    // kovan: {
    //   accounts: { mnemonic: process.env.TESTNET_MNEMONIC || "" },
    //   url: `https://kovan.infura.io/v3/0e6434f252a949719227b5d68caa2657`,
    // },
    // ropsten: {
    //   accounts: { mnemonic: process.env.TESTNET_MNEMONIC || "" },
    //   url: "https://ropsten.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    // },
    // rinkeby: {
    //   accounts: process.env.TEST_KEY ? [process.env.TEST_KEY] : [],
    //   url: "https://rinkeby.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    // },
    // goerli: {
    //   accounts: process.env.ASTRO_TEST_KEY ? [process.env.ASTRO_TEST_KEY] : [],
    //   url: "https://goerli.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    // },
    // localhost: {
    //   gas: "auto",
    //   gasPrice: "auto",
    //   gasMultiplier: 1,
    //   url: "http://127.0.0.1:8545",
    //   chainId: 1776,
    //   accounts: {
    //     mnemonic: "test test test test test test test test test test test test",
    //   },
    // },
  },
  // etherscan: {
  //   apiKey: "PR3QC4MMMC2I1S7AVSMY6GX1ZBTFPP91MW",
  //   // apiKey: "FZ1ANB251FC8ISFDXFGFCUDCANSJNWPF9Q",
  // },
  mocha: {
    timeout: 5000000,
  },
};
export default config;
