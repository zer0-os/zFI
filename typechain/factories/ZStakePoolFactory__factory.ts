/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ZStakePoolFactory,
  ZStakePoolFactoryInterface,
} from "../ZStakePoolFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_by",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "poolToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "weight",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFlashPool",
        type: "bool",
      },
    ],
    name: "PoolRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_by",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "weight",
        type: "uint32",
      },
    ],
    name: "WeightUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_by",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newIlvPerBlock",
        type: "uint256",
      },
    ],
    name: "WildRatioUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "blockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "poolAddr",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "weight",
        type: "uint32",
      },
    ],
    name: "changePoolWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "perBlock",
        type: "uint256",
      },
    ],
    name: "changeRewardTokensPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "poolToken",
        type: "address",
      },
    ],
    name: "getPoolAddress",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_poolToken",
        type: "address",
      },
    ],
    name: "getPoolData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "poolToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "poolAddress",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "weight",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "isFlashPool",
            type: "bool",
          },
        ],
        internalType: "struct zStakePoolFactory.PoolData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardTokensPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardsVault",
        type: "address",
      },
      {
        internalType: "uint192",
        name: "_rewardTokensPerBlock",
        type: "uint192",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "poolExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pools",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "poolAddr",
        type: "address",
      },
    ],
    name: "registerPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
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
  {
    inputs: [],
    name: "rewardVault",
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
  {
    inputs: [],
    name: "totalWeight",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferRewardYield",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061109c806100206000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806381724075116100a2578063a4063dbc11610071578063a4063dbc1461028c578063abd90846146102b5578063e37b776a146102c8578063f2fde38b146102db578063f7c618c1146102ee57600080fd5b806381724075146102305780638da5cb5b1461024357806396c82e5714610254578063a0d565511461027957600080fd5b806339ad2df7116100de57806339ad2df7146101fa5780633a2c67771461020f57806357e871e714610222578063715018a61461022857600080fd5b806307a717a6146101105780631228cbee1461012757806313d21cdf1461016b5780631e1c6a07146101c7575b600080fd5b6067545b6040519081526020015b60405180910390f35b610153610135366004610e19565b6001600160a01b039081166000908152606960205260409020541690565b6040516001600160a01b03909116815260200161011e565b61017e610179366004610e19565b610301565b60405161011e919081516001600160a01b0390811682526020808401519091169082015260408083015163ffffffff169082015260609182015115159181019190915260800190565b6101ea6101d5366004610e19565b606a6020526000908152604090205460ff1681565b604051901515815260200161011e565b61020d610208366004610e3d565b61051b565b005b606654610153906001600160a01b031681565b43610114565b61020d61061d565b61020d61023e366004610ea6565b610653565b6033546001600160a01b0316610153565b6068546102649063ffffffff1681565b60405163ffffffff909116815260200161011e565b61020d610287366004610edf565b6107ce565b61015361029a366004610e19565b6069602052600090815260409020546001600160a01b031681565b61020d6102c3366004610e19565b610811565b61020d6102d6366004610ef8565b610aee565b61020d6102e9366004610e19565b610bd2565b606554610153906001600160a01b031681565b6040805160808101825260008082526020820181905291810182905260608101919091526001600160a01b0380831660009081526069602052604090205416806103835760405162461bcd60e51b815260206004820152600e60248201526d1c1bdbdb081b9bdd08199bdd5b9960921b60448201526064015b60405180910390fd5b6000816001600160a01b031663cbdf382c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156103be57600080fd5b505afa1580156103d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f69190610f24565b90506000826001600160a01b0316631da10d916040518163ffffffff1660e01b815260040160206040518083038186803b15801561043357600080fd5b505afa158015610447573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046b9190610f41565b90506000836001600160a01b031663a1aab33f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104a857600080fd5b505afa1580156104bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e09190610f63565b604080516080810182526001600160a01b03958616815295909416602086015263ffffffff1692840192909252151560608301525092915050565b600054610100900460ff1680610534575060005460ff16155b6105505760405162461bcd60e51b815260040161037a90610f80565b600054610100900460ff16158015610572576000805461ffff19166101011790555b61057a610c6d565b6000826001600160c01b0316116105c85760405162461bcd60e51b815260206004820152601260248201527115d253110bd89b1bd8dac81b9bdd081cd95d60721b604482015260640161037a565b606580546001600160a01b038087166001600160a01b03199283161790925560668054928616929091169190911790556001600160c01b0382166067558015610617576000805461ff00191690555b50505050565b6033546001600160a01b031633146106475760405162461bcd60e51b815260040161037a90610fce565b6106516000610ce8565b565b6033546001600160a01b031633148061067b5750336000908152606a602052604090205460ff165b61068457600080fd5b816001600160a01b031663a1aab33f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106bd57600080fd5b505afa1580156106d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f59190610f63565b60685461070990839063ffffffff16611019565b6107139190611041565b6068805463ffffffff191663ffffffff928316179055604051634087aeb760e01b815290821660048201526001600160a01b03831690634087aeb790602401600060405180830381600087803b15801561076c57600080fd5b505af1158015610780573d6000803e3d6000fd5b505060405163ffffffff841681526001600160a01b03851692503391507fa2aeff1f58da6bc6dec93ece72a8664ae7f764789ec6fe9eeab5bd12ad39b43c9060200160405180910390a35050565b80606754141561080c5760405162461bcd60e51b81526020600482015260096024820152684e6f206368616e676560b81b604482015260640161037a565b606755565b6033546001600160a01b0316331461083b5760405162461bcd60e51b815260040161037a90610fce565b6000816001600160a01b031663cbdf382c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561087657600080fd5b505afa15801561088a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ae9190610f24565b90506000826001600160a01b0316631da10d916040518163ffffffff1660e01b815260040160206040518083038186803b1580156108eb57600080fd5b505afa1580156108ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109239190610f41565b90506000836001600160a01b031663a1aab33f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561096057600080fd5b505afa158015610974573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109989190610f63565b6001600160a01b038481166000908152606960205260409020549192501615610a035760405162461bcd60e51b815260206004820152601f60248201527f7468697320706f6f6c20697320616c7265616479207265676973746572656400604482015260640161037a565b6001600160a01b03838116600090815260696020908152604080832080546001600160a01b0319169489169485179055928252606a9052908120805460ff1916600117905560688054839290610a6090849063ffffffff16611019565b92506101000a81548163ffffffff021916908363ffffffff160217905550836001600160a01b0316836001600160a01b0316336001600160a01b03167fbbb93209bf0b9a9b7f80ef0f945a619379b96b6975a880c63bd5cb4334051b808486604051610ae092919063ffffffff9290921682521515602082015260400190565b60405180910390a450505050565b336000908152606a602052604090205460ff16610b3d5760405162461bcd60e51b815260206004820152600d60248201526c1858d8d95cdcc819195b9a5959609a1b604482015260640161037a565b6065546066546040516323b872dd60e01b81526001600160a01b0391821660048201528482166024820152604481018490529116906323b872dd90606401602060405180830381600087803b158015610b9557600080fd5b505af1158015610ba9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bcd9190610f41565b505050565b6033546001600160a01b03163314610bfc5760405162461bcd60e51b815260040161037a90610fce565b6001600160a01b038116610c615760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161037a565b610c6a81610ce8565b50565b600054610100900460ff1680610c86575060005460ff16155b610ca25760405162461bcd60e51b815260040161037a90610f80565b600054610100900460ff16158015610cc4576000805461ffff19166101011790555b610ccc610d3a565b610cd4610da4565b8015610c6a576000805461ff001916905550565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1680610d53575060005460ff16155b610d6f5760405162461bcd60e51b815260040161037a90610f80565b600054610100900460ff16158015610cd4576000805461ffff19166101011790558015610c6a576000805461ff001916905550565b600054610100900460ff1680610dbd575060005460ff16155b610dd95760405162461bcd60e51b815260040161037a90610f80565b600054610100900460ff16158015610dfb576000805461ffff19166101011790555b610cd433610ce8565b6001600160a01b0381168114610c6a57600080fd5b600060208284031215610e2b57600080fd5b8135610e3681610e04565b9392505050565b600080600060608486031215610e5257600080fd5b8335610e5d81610e04565b92506020840135610e6d81610e04565b915060408401356001600160c01b0381168114610e8957600080fd5b809150509250925092565b63ffffffff81168114610c6a57600080fd5b60008060408385031215610eb957600080fd5b8235610ec481610e04565b91506020830135610ed481610e94565b809150509250929050565b600060208284031215610ef157600080fd5b5035919050565b60008060408385031215610f0b57600080fd5b8235610f1681610e04565b946020939093013593505050565b600060208284031215610f3657600080fd5b8151610e3681610e04565b600060208284031215610f5357600080fd5b81518015158114610e3657600080fd5b600060208284031215610f7557600080fd5b8151610e3681610e94565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600063ffffffff80831681851680830382111561103857611038611003565b01949350505050565b600063ffffffff8381169083168181101561105e5761105e611003565b03939250505056fea264697066735822122020f83e4cf9cf9bf01747e14a3d1c30371aa09d0edc7891acea5d77314f982dd264736f6c63430008090033";

export class ZStakePoolFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ZStakePoolFactory> {
    return super.deploy(overrides || {}) as Promise<ZStakePoolFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ZStakePoolFactory {
    return super.attach(address) as ZStakePoolFactory;
  }
  connect(signer: Signer): ZStakePoolFactory__factory {
    return super.connect(signer) as ZStakePoolFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZStakePoolFactoryInterface {
    return new utils.Interface(_abi) as ZStakePoolFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZStakePoolFactory {
    return new Contract(address, _abi, signerOrProvider) as ZStakePoolFactory;
  }
}
