/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IPoolInterface extends ethers.utils.Interface {
  functions: {
    "balanceOf(address)": FunctionFragment;
    "getDeposit(address,uint256)": FunctionFragment;
    "getDepositsLength(address)": FunctionFragment;
    "isFlashPool()": FunctionFragment;
    "lastYieldDistribution()": FunctionFragment;
    "pendingYieldRewards(address)": FunctionFragment;
    "poolToken()": FunctionFragment;
    "processRewards()": FunctionFragment;
    "setWeight(uint32)": FunctionFragment;
    "stake(uint256,uint64)": FunctionFragment;
    "sync()": FunctionFragment;
    "unstake(uint256,uint256)": FunctionFragment;
    "usersLockingWeight()": FunctionFragment;
    "weight()": FunctionFragment;
    "wild()": FunctionFragment;
    "yieldRewardsPerWeight()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getDeposit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositsLength",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isFlashPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastYieldDistribution",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingYieldRewards",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "poolToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processRewards",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setWeight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "sync", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "usersLockingWeight",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "weight", values?: undefined): string;
  encodeFunctionData(functionFragment: "wild", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "yieldRewardsPerWeight",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getDeposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDepositsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isFlashPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastYieldDistribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingYieldRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setWeight", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sync", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "usersLockingWeight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "weight", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wild", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "yieldRewardsPerWeight",
    data: BytesLike
  ): Result;

  events: {};
}

export class IPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IPoolInterface;

  functions: {
    balanceOf(_user: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getDeposit(
      _user: string,
      _depositId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
          tokenAmount: BigNumber;
          weight: BigNumber;
          lockedFrom: BigNumber;
          lockedUntil: BigNumber;
          isYield: boolean;
        }
      ]
    >;

    getDepositsLength(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isFlashPool(overrides?: CallOverrides): Promise<[boolean]>;

    lastYieldDistribution(overrides?: CallOverrides): Promise<[BigNumber]>;

    pendingYieldRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    poolToken(overrides?: CallOverrides): Promise<[string]>;

    processRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWeight(
      _weight: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _amount: BigNumberish,
      _lockedUntil: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstake(
      _depositId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    usersLockingWeight(overrides?: CallOverrides): Promise<[BigNumber]>;

    weight(overrides?: CallOverrides): Promise<[number]>;

    wild(overrides?: CallOverrides): Promise<[string]>;

    yieldRewardsPerWeight(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  balanceOf(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

  getDeposit(
    _user: string,
    _depositId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
      tokenAmount: BigNumber;
      weight: BigNumber;
      lockedFrom: BigNumber;
      lockedUntil: BigNumber;
      isYield: boolean;
    }
  >;

  getDepositsLength(
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isFlashPool(overrides?: CallOverrides): Promise<boolean>;

  lastYieldDistribution(overrides?: CallOverrides): Promise<BigNumber>;

  pendingYieldRewards(
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  poolToken(overrides?: CallOverrides): Promise<string>;

  processRewards(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWeight(
    _weight: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _amount: BigNumberish,
    _lockedUntil: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sync(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstake(
    _depositId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  usersLockingWeight(overrides?: CallOverrides): Promise<BigNumber>;

  weight(overrides?: CallOverrides): Promise<number>;

  wild(overrides?: CallOverrides): Promise<string>;

  yieldRewardsPerWeight(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    balanceOf(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getDeposit(
      _user: string,
      _depositId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, boolean] & {
        tokenAmount: BigNumber;
        weight: BigNumber;
        lockedFrom: BigNumber;
        lockedUntil: BigNumber;
        isYield: boolean;
      }
    >;

    getDepositsLength(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFlashPool(overrides?: CallOverrides): Promise<boolean>;

    lastYieldDistribution(overrides?: CallOverrides): Promise<BigNumber>;

    pendingYieldRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolToken(overrides?: CallOverrides): Promise<string>;

    processRewards(overrides?: CallOverrides): Promise<void>;

    setWeight(_weight: BigNumberish, overrides?: CallOverrides): Promise<void>;

    stake(
      _amount: BigNumberish,
      _lockedUntil: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    sync(overrides?: CallOverrides): Promise<void>;

    unstake(
      _depositId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    usersLockingWeight(overrides?: CallOverrides): Promise<BigNumber>;

    weight(overrides?: CallOverrides): Promise<number>;

    wild(overrides?: CallOverrides): Promise<string>;

    yieldRewardsPerWeight(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    balanceOf(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

    getDeposit(
      _user: string,
      _depositId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositsLength(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFlashPool(overrides?: CallOverrides): Promise<BigNumber>;

    lastYieldDistribution(overrides?: CallOverrides): Promise<BigNumber>;

    pendingYieldRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolToken(overrides?: CallOverrides): Promise<BigNumber>;

    processRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWeight(
      _weight: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _amount: BigNumberish,
      _lockedUntil: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstake(
      _depositId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    usersLockingWeight(overrides?: CallOverrides): Promise<BigNumber>;

    weight(overrides?: CallOverrides): Promise<BigNumber>;

    wild(overrides?: CallOverrides): Promise<BigNumber>;

    yieldRewardsPerWeight(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDeposit(
      _user: string,
      _depositId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDepositsLength(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFlashPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastYieldDistribution(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingYieldRewards(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    processRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWeight(
      _weight: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _amount: BigNumberish,
      _lockedUntil: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstake(
      _depositId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    usersLockingWeight(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    weight(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wild(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    yieldRewardsPerWeight(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
