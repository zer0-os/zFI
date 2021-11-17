/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ZStakeCorePool,
  ZStakeCorePoolInterface,
} from "../ZStakeCorePool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ilv",
        type: "address",
      },
      {
        internalType: "contract zStakePoolFactory",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_poolToken",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_initBlock",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "_weight",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "uint32",
        name: "_fromVal",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_toVal",
        type: "uint32",
      },
    ],
    name: "PoolWeightUpdated",
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
        name: "depositId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "lockedFrom",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "lockedUntil",
        type: "uint64",
      },
    ],
    name: "StakeLockUpdated",
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
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
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
        name: "yieldRewardsPerWeight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "lastYieldDistribution",
        type: "uint64",
      },
    ],
    name: "Synchronized",
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
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
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
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "YieldClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
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
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract zStakePoolFactory",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
    ],
    name: "getDeposit",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "lockedFrom",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "lockedUntil",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "isYield",
            type: "bool",
          },
        ],
        internalType: "struct IPool.Deposit",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getDepositsLength",
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
    name: "isFlashPool",
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
    inputs: [],
    name: "lastYieldDistribution",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "now256",
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
        name: "_staker",
        type: "address",
      },
    ],
    name: "pendingYieldRewards",
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
    name: "poolToken",
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
    name: "poolTokenReserve",
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
    name: "processRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerWeight",
        type: "uint256",
      },
    ],
    name: "rewardToWeight",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_weight",
        type: "uint32",
      },
    ],
    name: "setWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_lockUntil",
        type: "uint64",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stakeAsPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testFunc",
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
        internalType: "uint256",
        name: "_depositId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "depositId",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "lockedUntil",
        type: "uint64",
      },
    ],
    name: "updateStakeLock",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subYieldRewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usersLockingWeight",
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
    name: "weight",
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
        internalType: "uint256",
        name: "_weight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerWeight",
        type: "uint256",
      },
    ],
    name: "weightToReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
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
  {
    inputs: [],
    name: "yieldRewardsPerWeight",
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
];

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162002a0f38038062002a0f833981016040819052620000349162000209565b600160005584848484846001600160a01b0384166200009a5760405162461bcd60e51b815260206004820152601d60248201527f57494c4420506f6f6c206663742061646472657373206e6f742073657400000060448201526064015b60405180910390fd5b6001600160a01b038316620000f25760405162461bcd60e51b815260206004820152601a60248201527f706f6f6c20746f6b656e2061646472657373206e6f7420736574000000000000604482015260640162000091565b6000826001600160401b031611620001425760405162461bcd60e51b81526020600482015260126024820152711a5b9a5d08189b1bd8dac81b9bdd081cd95d60721b604482015260640162000091565b60008163ffffffff16116200019a5760405162461bcd60e51b815260206004820152601360248201527f706f6f6c20776569676874206e6f742073657400000000000000000000000000604482015260640162000091565b6001600160a01b0393841660a05291831660c05260028054949093166080526001600160401b0316640100000000026001600160601b031990931663ffffffff90911617919091179055506200029c9350505050565b6001600160a01b03811681146200020657600080fd5b50565b600080600080600060a086880312156200022257600080fd5b85516200022f81620001f0565b60208701519095506200024281620001f0565b60408701519094506200025581620001f0565b60608701519093506001600160401b03811681146200027357600080fd5b608087015190925063ffffffff811681146200028e57600080fd5b809150509295509295909350565b60805160a05160c0516126be620003516000396000818161040f01528181610f400152818161146e0152818161188b015281816119320152818161202601526120b40152600081816103e8015281816104c3015281816105b90152818161065001528181610902015281816109db01528181610d1d01528181610db2015281816116370152611e0b01526000818161020b0152818161049601528181610f1601528181611491015261160c01526126be6000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c8063952e68cf116100de578063c45a015511610097578063e8d3cad511610071578063e8d3cad51461043a578063f9fc0d0714610466578063fa213bd61461046e578063fff6cae91461047757600080fd5b8063c45a0155146103e3578063cbdf382c1461040a578063ce1115411461043157600080fd5b8063952e68cf146103335780639e2c8a5b14610346578063a156dc2814610359578063a1aab33f1461036c578063a87430ba14610391578063beb0ed6c146103da57600080fd5b806329eb5f2c1161014b5780634ce0f9a6116101255780634ce0f9a6146102eb57806357e871e7146102f157806370a08231146102f75780638e169d471461032057600080fd5b806329eb5f2c146102935780634087aeb7146102c557806344cc892d146102d857600080fd5b8063037a417c1461019357806315188a1b146101b85780631984db99146101cd5780631da10d91146101ee57806322adc2fd146102065780632726b5061461022d575b600080fd5b61019b61047f565b6040516001600160a01b0390911681526020015b60405180910390f35b6101cb6101c63660046123d3565b610543565b005b6101e06101db366004612424565b610566565b6040519081526020016101af565b6101f6600081565b60405190151581526020016101af565b61019b7f000000000000000000000000000000000000000000000000000000000000000081565b61024061023b366004612441565b610834565b6040516101af9190600060a082019050825182526020830151602083015260408301516001600160401b038082166040850152806060860151166060850152505060808301511515608083015292915050565b6002546102ad90600160201b90046001600160401b031681565b6040516001600160401b0390911681526020016101af565b6101cb6102d336600461247f565b6108f7565b6101cb6102e6366004612441565b6109c6565b426101e0565b436101e0565b6101e0610305366004612424565b6001600160a01b031660009081526001602052604090205490565b6101e061032e36600461249c565b610c46565b6101cb6103413660046123d3565b610c69565b6101cb61035436600461249c565b610c76565b6101e061036736600461249c565b610c81565b60025461037c9063ffffffff1681565b60405163ffffffff90911681526020016101af565b6103bf61039f366004612424565b600160208190526000918252604090912080549181015460029091015483565b604080519384526020840192909252908201526060016101af565b6101e060045481565b61019b7f000000000000000000000000000000000000000000000000000000000000000081565b61019b7f000000000000000000000000000000000000000000000000000000000000000081565b6101e060055481565b6101e0610448366004612424565b6001600160a01b031660009081526001602052604090206003015490565b6101cb610c93565b6101e060035481565b6101cb610ca1565b60405163091465f760e11b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260009182917f00000000000000000000000000000000000000000000000000000000000000001690631228cbee9060240160206040518083038186803b15801561050557600080fd5b505afa158015610519573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053d91906124be565b92915050565b61054b610cab565b610556336000610f06565b50610562338383610f8b565b5050565b6002546000908190600160201b90046001600160401b03164311801561058d575060045415155b1561072a57600254600090600160201b90046001600160401b0316436105b391906124f1565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166396c82e576040518163ffffffff1660e01b815260040160206040518083038186803b15801561061057600080fd5b505afa158015610624573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106489190612508565b63ffffffff167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316635a6497d56040518163ffffffff1660e01b815260040160206040518083038186803b1580156106a757600080fd5b505afa1580156106bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106df9190612525565b6002546106f29063ffffffff168561253e565b6106fc919061253e565b610706919061255d565b905060035461071782600454610c81565b610721919061257f565b9250505061072f565b506003545b6001600160a01b03831660009081526001602081815260408084208151608081018352815481529381015484840152600281015484830152600381018054835181860281018601909452808452919360608601939290879084015b828210156108025760008481526020908190206040805160a0810182526003860290920180548352600180820154848601526002909101546001600160401b0380821693850193909352600160401b81049092166060840152600160801b90910460ff1615156080830152908352909201910161078a565b5050505081525050905060008160400151610821836020015185610c46565b61082b91906124f1565b95945050505050565b6040805160a0810182526000808252602080830182905282840182905260608301829052608083018290526001600160a01b0386168252600190529190912060030180548390811061088857610888612597565b60009182526020918290206040805160a081018252600393909302909101805483526001810154938301939093526002909201546001600160401b0380821693830193909352600160401b81049092166060820152600160801b90910460ff1615156080820152905092915050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109645760405162461bcd60e51b815260206004820152600d60248201526c1858d8d95cdcc819195b9a5959609a1b60448201526064015b60405180910390fd5b6002546040805163ffffffff9283168152918316602083015233917f06555fe9dc8cbe328585a0c60ae1b7aafe71c28a706c2769d6cb4ee6e3e44e46910160405180910390a26002805463ffffffff191663ffffffff92909216919091179055565b604051631e1c6a0760e01b81523360048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690631e1c6a079060240160206040518083038186803b158015610a2557600080fd5b505afa158015610a39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5d91906125ad565b610a995760405162461bcd60e51b815260206004820152600d60248201526c1858d8d95cdcc819195b9a5959609a1b604482015260640161095b565b610aa1610cab565b6001600160a01b0382166000908152600160205260409020805415610acd57610acb836000610f06565b505b6000610add620f4240600261253e565b610ae7908461253e565b905060006040518060a00160405280858152602001838152602001610b094290565b6001600160401b03168152602001610b25426301e1338061257f565b6001600160401b0316815260200160011515815250905083836000016000828254610b50919061257f565b9250508190555081836001016000828254610b6b919061257f565b90915550506003808401805460018181018355600092835260208084208651939095029094019182559284015192810192909255604083015160029092018054606085015160808601511515600160801b0260ff60801b196001600160401b03928316600160401b026001600160801b0319909416929096169190911791909117939093169290921790915560048054849290610c0990849061257f565b92505081905550610c208360010154600354610c46565b83600201819055508360056000828254610c3a919061257f565b90915550505050505050565b600064e8d4a51000610c58838561253e565b610c62919061255d565b9392505050565b61056233838360006112dd565b610562338383611306565b600081610c5864e8d4a510008561253e565b610c9e336001610f06565b50565b610ca9610cab565b565b600254600160201b90046001600160401b03164311610cc657565b600454610cf557600280546bffffffffffffffff000000001916600160201b436001600160401b031602179055565b6002544390600090610d1790600160201b90046001600160401b0316836124f1565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316635a6497d56040518163ffffffff1660e01b815260040160206040518083038186803b158015610d7457600080fd5b505afa158015610d88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dac9190612525565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166396c82e576040518163ffffffff1660e01b815260040160206040518083038186803b158015610e0957600080fd5b505afa158015610e1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e419190612508565b60025463ffffffff9182169116610e58848661253e565b610e62919061253e565b610e6c919061255d565b9050610e7a81600454610c81565b60036000828254610e8b919061257f565b9091555050600280546bffffffffffffffff000000001916600160201b6001600160401b03878116820292909217928390556003546040805191825291909304909116602083015233917f5ffbf9ce09d035b92503aad17a31b3d37ca5cd887b63701ddc2200be77d9ccc7910160405180910390a250505050565b6000610f12838361142a565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316141561053d578060056000828254610f80919061257f565b909155505092915050565b42816001600160401b031611610fe35760405162461bcd60e51b815260206004820152601c60248201527f6c6f636b2073686f756c6420626520696e207468652066757475726500000000604482015260640161095b565b6001600160a01b03831660009081526001602052604081206003810180549192918590811061101457611014612597565b906000526020600020906003020190508060020160089054906101000a90046001600160401b03166001600160401b0316836001600160401b03161161108f5760405162461bcd60e51b815260206004820152601060248201526f696e76616c6964206e6577206c6f636b60801b604482015260640161095b565b60028101546001600160401b031661112a576301e133806110b9426001600160401b0386166124f1565b11156111075760405162461bcd60e51b815260206004820152601b60248201527f6d6178206c6f636b20706572696f642069732033363520646179730000000000604482015260640161095b565b60028101805467ffffffffffffffff1916426001600160401b031617905561119f565b60028101546301e1338090611148906001600160401b0316856125cf565b6001600160401b0316111561119f5760405162461bcd60e51b815260206004820152601b60248201527f6d6178206c6f636b20706572696f642069732033363520646179730000000000604482015260640161095b565b6002810180546001600160401b03808616600160401b9081026fffffffffffffffff000000000000000019841681179485905585546000959094620f4240946301e133809486946111fc94908316938316939093179204166125cf565b6001600160401b031661120f919061253e565b611219919061255d565b611223919061257f565b61122d919061253e565b60018084018054908390559085015491925090829061124d9083906124f1565b611257919061257f565b6001850155600454829061126c9083906124f1565b611276919061257f565b6004556002830154604080518881526001600160401b039283166020820152918716908201526001600160a01b038816907f85daa0d8a4afa74e5bd57c0f5d2cddf52920ec882a02b8d3f646c972b4cfb6b49060600160405180910390a250505050505050565b6112e98484848461177e565b82600560008282546112fb919061257f565b909155505050505050565b6001600160a01b03831660009081526001602052604081206003810180549192918590811061133757611337612597565b60009182526020918290206040805160a0810182526003909302909101805483526001810154938301939093526002909201546001600160401b03808216938301849052600160401b820416606083015260ff600160801b9091041615156080820152915015806113b4575060608101516001600160401b031642115b6114005760405162461bcd60e51b815260206004820152601860248201527f6465706f736974206e6f742079657420756e6c6f636b65640000000000000000604482015260640161095b565b826005600082825461141291906124f1565b909155506114239050858585611b97565b5050505050565b6000811561143a5761143a610cab565b61144383611ec8565b9050806114525750600061053d565b6001600160a01b038084166000908152600160205260409020907f000000000000000000000000000000000000000000000000000000000000000081167f000000000000000000000000000000000000000000000000000000000000000090911614156115f55760006114c9620f4240600261253e565b6114d3908461253e565b905060006040518060a001604052808581526020018381526020016114f54290565b6001600160401b03168152602001611511426301e1338061257f565b6001600160401b0390811682526001602092830181905260038088018054808401825560009182528582208751919093029092019182559385015191810191909155604084015160029091018054606086015160808701511515600160801b0260ff60801b19918616600160401b026001600160801b031990931694909516939093171791909116919091179055845491925085918591906115b490849061257f565b92505081905550818360010160008282546115cf919061257f565b9250508190555081600460008282546115e8919061257f565b9091555061171b92505050565b60405163091465f760e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526000917f000000000000000000000000000000000000000000000000000000000000000090911690631228cbee9060240160206040518083038186803b15801561167b57600080fd5b505afa15801561168f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b391906124be565b6040516344cc892d60e01b81526001600160a01b03878116600483015260248201869052919250908216906344cc892d90604401600060405180830381600087803b15801561170157600080fd5b505af1158015611715573d6000803e3d6000fd5b50505050505b8215611737576117318160010154600354610c46565b60028201555b6040518281526001600160a01b0385169033907ff3055bc8d92d9c8d2f12b45d112dd345cd2cfd17292b8d65c5642ac6f912dfd79060200160405180910390a35092915050565b600083116117bc5760405162461bcd60e51b815260206004820152600b60248201526a1e995c9bc8185b5bdd5b9d60aa1b604482015260640161095b565b6001600160401b03821615806117fb575042826001600160401b03161180156117fb57506301e133806117f8426001600160401b0385166124f1565b11155b61183f5760405162461bcd60e51b81526020600482015260156024820152741a5b9d985b1a59081b1bd8dac81a5b9d195c9d985b605a1b604482015260640161095b565b611847610cab565b6001600160a01b038416600090815260016020526040902080541561187357611871856000610f06565b505b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156118d557600080fd5b505afa1580156118e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061190d9190612525565b905061191a333087611fc9565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b15801561197c57600080fd5b505afa158015611990573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119b49190612525565b905060006119c283836124f1565b9050600080876001600160401b0316116119dd5760006119df565b425b905086600083620f42406301e13380816119f987876125cf565b6001600160401b0316611a0c919061253e565b611a16919061255d565b611a20919061257f565b611a2a919061253e565b905060008111611a3c57611a3c6125f7565b6040805160a08101825285815260208082018481526001600160401b03808816948401948552868116606085019081528d1515608086019081526003808f018054600181810183556000928352978220895191909302909201918255945195810195909555955160029094018054915196511515600160801b0260ff60801b19978416600160401b026001600160801b0319909316959093169490941717949094169390931790558854909186918a9190611af890849061257f565b9250508190555081886001016000828254611b13919061257f565b92505081905550611b2a8860010154600354610c46565b88600201819055508160046000828254611b44919061257f565b90915550506040518b81526001600160a01b038d169033907f5dac0c1b1112564a045ba943c9d50270893e8e826c49be8e7073adc713ab7bd79060200160405180910390a3505050505050505050505050565b60008111611bd55760405162461bcd60e51b815260206004820152600b60248201526a1e995c9bc8185b5bdd5b9d60aa1b604482015260640161095b565b6001600160a01b038316600090815260016020526040812060038101805491929185908110611c0657611c06612597565b6000918252602090912060039091020160028101548154919250600160801b900460ff1690841115611c715760405162461bcd60e51b8152602060048201526014602482015273616d6f756e742065786365656473207374616b6560601b604482015260640161095b565b611c79610cab565b611c84866000610f06565b5060018201548254600090611c9a9087906124f1565b6002850154620f4240906301e13380908290611cc9906001600160401b0380821691600160401b9004166125cf565b6001600160401b0316611cdc919061253e565b611ce6919061255d565b611cf0919061257f565b611cfa919061253e565b8454909150611d0a9087906124f1565b611d5d57846003018781548110611d2357611d23612597565b6000918252602082206003909102018181556001810191909155600201805470ffffffffffffffffffffffffffffffffff19169055611d7e565b85846000016000828254611d7191906124f1565b9091555050600184018190555b85856000016000828254611d9291906124f1565b909155505060018501548190611da99084906124f1565b611db3919061257f565b60018601819055600354611dc79190610c46565b60028601556004548190611ddc9084906124f1565b611de6919061257f565b6004558215611e74576040516371bdbbb560e11b8152336004820152602481018790527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063e37b776a90604401600060405180830381600087803b158015611e5757600080fd5b505af1158015611e6b573d6000803e3d6000fd5b50505050611e7e565b611e7e3387612057565b6040518681526001600160a01b0389169033907fd8654fcc8cf5b36d30b3f5e4688fc78118e6d68de60b9994e09902268b57c3e39060200160405180910390a35050505050505050565b6001600160a01b038116600090815260016020818152604080842081516080810183528154815293810154848401526002810154848301526003810180548351818602810186019094528084528695949293606086019390929190879084015b82821015611fa05760008481526020908190206040805160a0810182526003860290920180548352600180820154848601526002909101546001600160401b0380821693850193909352600160401b81049092166060840152600160801b90910460ff16151560808301529083529092019101611f28565b505050508152505090508060400151611fbf8260200151600354610c46565b610c6291906124f1565b6002600054141561201c5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161095b565b600260005561204d7f00000000000000000000000000000000000000000000000000000000000000008484846120e3565b5050600160005550565b600260005414156120aa5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161095b565b60026000556120da7f00000000000000000000000000000000000000000000000000000000000000008383612154565b50506001600055565b6040516001600160a01b038085166024830152831660448201526064810182905261214e9085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152612189565b50505050565b6040516001600160a01b03831660248201526044810182905261218490849063a9059cbb60e01b90606401612117565b505050565b60006121de826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661225b9092919063ffffffff16565b80519091501561218457808060200190518101906121fc91906125ad565b6121845760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161095b565b606061226a8484600085612272565b949350505050565b6060824710156122d35760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161095b565b843b6123215760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161095b565b600080866001600160a01b0316858760405161233d9190612639565b60006040518083038185875af1925050503d806000811461237a576040519150601f19603f3d011682016040523d82523d6000602084013e61237f565b606091505b509150915061238f82828661239a565b979650505050505050565b606083156123a9575081610c62565b8251156123b95782518084602001fd5b8160405162461bcd60e51b815260040161095b9190612655565b600080604083850312156123e657600080fd5b8235915060208301356001600160401b038116811461240457600080fd5b809150509250929050565b6001600160a01b0381168114610c9e57600080fd5b60006020828403121561243657600080fd5b8135610c628161240f565b6000806040838503121561245457600080fd5b823561245f8161240f565b946020939093013593505050565b63ffffffff81168114610c9e57600080fd5b60006020828403121561249157600080fd5b8135610c628161246d565b600080604083850312156124af57600080fd5b50508035926020909101359150565b6000602082840312156124d057600080fd5b8151610c628161240f565b634e487b7160e01b600052601160045260246000fd5b600082821015612503576125036124db565b500390565b60006020828403121561251a57600080fd5b8151610c628161246d565b60006020828403121561253757600080fd5b5051919050565b6000816000190483118215151615612558576125586124db565b500290565b60008261257a57634e487b7160e01b600052601260045260246000fd5b500490565b60008219821115612592576125926124db565b500190565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156125bf57600080fd5b81518015158114610c6257600080fd5b60006001600160401b03838116908316818110156125ef576125ef6124db565b039392505050565b634e487b7160e01b600052600160045260246000fd5b60005b83811015612628578181015183820152602001612610565b8381111561214e5750506000910152565b6000825161264b81846020870161260d565b9190910192915050565b602081526000825180602084015261267481604085016020870161260d565b601f01601f1916919091016040019291505056fea2646970667358221220f3fae76bdaca5a56105182eaf2b6ac378803cf340196858ff171d087d338d8ca64736f6c63430008090033";

export class ZStakeCorePool__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _ilv: string,
    _factory: string,
    _poolToken: string,
    _initBlock: BigNumberish,
    _weight: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ZStakeCorePool> {
    return super.deploy(
      _ilv,
      _factory,
      _poolToken,
      _initBlock,
      _weight,
      overrides || {}
    ) as Promise<ZStakeCorePool>;
  }
  getDeployTransaction(
    _ilv: string,
    _factory: string,
    _poolToken: string,
    _initBlock: BigNumberish,
    _weight: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _ilv,
      _factory,
      _poolToken,
      _initBlock,
      _weight,
      overrides || {}
    );
  }
  attach(address: string): ZStakeCorePool {
    return super.attach(address) as ZStakeCorePool;
  }
  connect(signer: Signer): ZStakeCorePool__factory {
    return super.connect(signer) as ZStakeCorePool__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZStakeCorePoolInterface {
    return new utils.Interface(_abi) as ZStakeCorePoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZStakeCorePool {
    return new Contract(address, _abi, signerOrProvider) as ZStakeCorePool;
  }
}
