/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ICorePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICorePool__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPool__factory>;
    getContractFactory(
      name: "ERC20Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Receiver__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "MockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockToken__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ZStakeCorePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZStakeCorePool__factory>;
    getContractFactory(
      name: "ZStakePoolBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZStakePoolBase__factory>;
    getContractFactory(
      name: "ZStakePoolFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZStakePoolFactory__factory>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
  }
}
