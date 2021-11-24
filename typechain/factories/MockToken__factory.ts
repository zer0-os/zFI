/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockToken, MockTokenInterface } from "../MockToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "ROLE_TOKEN_CREATOR",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintForUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604080518082018252600a81526926b7b1b5902a37b5b2b760b11b602080830191825283518085019094526002845261135560f21b90840152815191929161005b91600391610084565b50805161006f906004906020840190610084565b50506005805460ff1916601217905550610158565b8280546100909061011d565b90600052602060002090601f0160209004810192826100b257600085556100f8565b82601f106100cb57805160ff19168380011785556100f8565b828001600101855582156100f8579182015b828111156100f85782518255916020019190600101906100dd565b50610104929150610108565b5090565b5b808211156101045760008155600101610109565b600181811c9082168061013157607f821691505b6020821081141561015257634e487b7160e01b600052602260045260246000fd5b50919050565b61090f806101676000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c578063a457c2d711610066578063a457c2d7146101b2578063a9059cbb146101c5578063d0dbc833146101d8578063dd62ed3e146101ed57600080fd5b806370a08231146101625780638d4e57e61461018b57806395d89b41146101aa57600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a578063395093511461014f575b600080fd5b6100dc610226565b6040516100e9919061072d565b60405180910390f35b61010561010036600461079e565b6102b8565b60405190151581526020016100e9565b6002545b6040519081526020016100e9565b6101056101353660046107c8565b6102ce565b60055460405160ff90911681526020016100e9565b61010561015d36600461079e565b610320565b610119610170366004610804565b6001600160a01b031660009081526020819052604090205490565b6101956201000081565b60405163ffffffff90911681526020016100e9565b6100dc610357565b6101056101c036600461079e565b610366565b6101056101d336600461079e565b61039d565b6101eb6101e636600461079e565b6103aa565b005b6101196101fb366004610826565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461023590610859565b80601f016020809104026020016040519081016040528092919081815260200182805461026190610859565b80156102ae5780601f10610283576101008083540402835291602001916102ae565b820191906000526020600020905b81548152906001019060200180831161029157829003601f168201915b5050505050905090565b60006102c53384846103b8565b50600192915050565b60006102db8484846104e2565b6001600160a01b0384166000908152600160209081526040808320338085529252909120546103169186916103119086906108aa565b6103b8565b5060019392505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102c59185906103119086906108c1565b60606004805461023590610859565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102c59185906103119086906108aa565b60006102c53384846104e2565b6103b4828261064d565b5050565b6001600160a01b03831661041f5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084015b60405180910390fd5b6001600160a01b0382166104805760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610416565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166105465760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610416565b6001600160a01b0382166105a85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610416565b6001600160a01b0383166000908152602081905260409020546105cc9082906108aa565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546105fc9082906108c1565b6001600160a01b038381166000818152602081815260409182902094909455518481529092918616917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016104d5565b6001600160a01b0382166106a35760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610416565b806002546106b191906108c1565b6002556001600160a01b0382166000908152602081905260409020546106d89082906108c1565b6001600160a01b038316600081815260208181526040808320949094559251848152919290917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600060208083528351808285015260005b8181101561075a5785810183015185820160400152820161073e565b8181111561076c576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461079957600080fd5b919050565b600080604083850312156107b157600080fd5b6107ba83610782565b946020939093013593505050565b6000806000606084860312156107dd57600080fd5b6107e684610782565b92506107f460208501610782565b9150604084013590509250925092565b60006020828403121561081657600080fd5b61081f82610782565b9392505050565b6000806040838503121561083957600080fd5b61084283610782565b915061085060208401610782565b90509250929050565b600181811c9082168061086d57607f821691505b6020821081141561088e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156108bc576108bc610894565b500390565b600082198211156108d4576108d4610894565b50019056fea2646970667358221220413a5cdc3e602e788f34dd779fb2b1e07d203f8b1900ecdb4c7c76f5da76cfe964736f6c63430008090033";

export class MockToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockToken> {
    return super.deploy(overrides || {}) as Promise<MockToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockToken {
    return super.attach(address) as MockToken;
  }
  connect(signer: Signer): MockToken__factory {
    return super.connect(signer) as MockToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockTokenInterface {
    return new utils.Interface(_abi) as MockTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockToken {
    return new Contract(address, _abi, signerOrProvider) as MockToken;
  }
}
