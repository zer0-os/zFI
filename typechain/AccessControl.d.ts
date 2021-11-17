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

interface AccessControlInterface extends ethers.utils.Interface {
  functions: {
    "ROLE_ACCESS_MANAGER()": FunctionFragment;
    "evaluateBy(address,uint256,uint256)": FunctionFragment;
    "features()": FunctionFragment;
    "isFeatureEnabled(uint256)": FunctionFragment;
    "isOperatorInRole(address,uint256)": FunctionFragment;
    "isSenderInRole(uint256)": FunctionFragment;
    "updateFeatures(uint256)": FunctionFragment;
    "updateRole(address,uint256)": FunctionFragment;
    "userRoles(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ROLE_ACCESS_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "evaluateBy",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "features", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isFeatureEnabled",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperatorInRole",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isSenderInRole",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeatures",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateRole",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "userRoles", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "ROLE_ACCESS_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "evaluateBy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "features", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isFeatureEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOperatorInRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSenderInRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updateRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userRoles", data: BytesLike): Result;

  events: {
    "RoleUpdated(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RoleUpdated"): EventFragment;
}

export class AccessControl extends BaseContract {
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

  interface: AccessControlInterface;

  functions: {
    ROLE_ACCESS_MANAGER(overrides?: CallOverrides): Promise<[BigNumber]>;

    evaluateBy(
      operator: string,
      target: BigNumberish,
      desired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    features(overrides?: CallOverrides): Promise<[BigNumber]>;

    isFeatureEnabled(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isOperatorInRole(
      operator: string,
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isSenderInRole(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateFeatures(
      _mask: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateRole(
      operator: string,
      role: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userRoles(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  ROLE_ACCESS_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

  evaluateBy(
    operator: string,
    target: BigNumberish,
    desired: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  features(overrides?: CallOverrides): Promise<BigNumber>;

  isFeatureEnabled(
    required: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isOperatorInRole(
    operator: string,
    required: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isSenderInRole(
    required: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateFeatures(
    _mask: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateRole(
    operator: string,
    role: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userRoles(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ROLE_ACCESS_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    evaluateBy(
      operator: string,
      target: BigNumberish,
      desired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    features(overrides?: CallOverrides): Promise<BigNumber>;

    isFeatureEnabled(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isOperatorInRole(
      operator: string,
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isSenderInRole(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateFeatures(
      _mask: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateRole(
      operator: string,
      role: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    userRoles(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    RoleUpdated(
      _by?: string | null,
      _to?: string | null,
      _requested?: null,
      _actual?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber],
      { _by: string; _to: string; _requested: BigNumber; _actual: BigNumber }
    >;
  };

  estimateGas: {
    ROLE_ACCESS_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    evaluateBy(
      operator: string,
      target: BigNumberish,
      desired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    features(overrides?: CallOverrides): Promise<BigNumber>;

    isFeatureEnabled(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isOperatorInRole(
      operator: string,
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isSenderInRole(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateFeatures(
      _mask: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateRole(
      operator: string,
      role: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userRoles(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ROLE_ACCESS_MANAGER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    evaluateBy(
      operator: string,
      target: BigNumberish,
      desired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    features(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isFeatureEnabled(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isOperatorInRole(
      operator: string,
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSenderInRole(
      required: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateFeatures(
      _mask: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateRole(
      operator: string,
      role: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userRoles(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}