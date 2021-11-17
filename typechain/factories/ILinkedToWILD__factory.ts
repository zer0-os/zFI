/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILinkedToWILD, ILinkedToWILDInterface } from "../ILinkedToWILD";

const _abi = [
  {
    inputs: [],
    name: "wild",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ILinkedToWILD__factory {
  static readonly abi = _abi;
  static createInterface(): ILinkedToWILDInterface {
    return new utils.Interface(_abi) as ILinkedToWILDInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ILinkedToWILD {
    return new Contract(address, _abi, signerOrProvider) as ILinkedToWILD;
  }
}