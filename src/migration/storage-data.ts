import { Contract, ContractFactory } from "ethers";
import { readValidations } from "@openzeppelin/hardhat-upgrades/dist/utils/validations";
import * as hre from "hardhat";
import {
  getStorageLayout,
  getUnlinkedBytecode,
  getVersion,
  StorageLayout,
} from "@openzeppelin/upgrades-core";

export type ContractStorageElement = string | number | Array<{}>;

export type ContractStorageData = Array<{
  [label: string]: ContractStorageElement;
}>;

export type ContractStorageDiff = Array<{
  key: string;
  valueBefore: ContractStorageElement;
  valueAfter: ContractStorageElement;
}>;


export const getContractStorageLayout = async (
  contractFactory: ContractFactory
): Promise<StorageLayout> => {
  const validations = await readValidations(hre);
  const unlinkedBytecode = getUnlinkedBytecode(validations, contractFactory.bytecode);
  const encodedArgs = contractFactory.interface.encodeDeploy();
  const version = getVersion(unlinkedBytecode, contractFactory.bytecode, encodedArgs);

  return getStorageLayout(validations, version);
};

export const readContractStorage = async (
  contractFactory: ContractFactory,
  contractObj: Contract
): Promise<ContractStorageData> => {
  const layout = await getContractStorageLayout(contractFactory);

  return await layout.storage.reduce(
    async (
      acc: Promise<ContractStorageData>,
      { contract, label, type }
    ): Promise<ContractStorageData> => {
      const newAcc = await acc;

      if (
        (contract === "zStakePoolBase" ||
          contract === "zStakeCorePool" ||
          contract === "zStakeCorePoolMigration") &&
        !type.includes("mapping")
      ) {
        try {
          let value = await contractObj[label]();
          if (value._isBigNumber) {
            value = value.toString();
          }

          newAcc.push({ [label]: value });
        } catch (e) {
          console.log(`Error on LABEL ${label}: ${e.message}`);
        }
      }

      return newAcc;
    },
    Promise.resolve([])
  );
};


export const compareStorageData = (
  dataBefore: ContractStorageData,
  dataAfter: ContractStorageData,
) => {
  const storageDiff = dataAfter.reduce(
    (acc : ContractStorageDiff | undefined, stateVar, idx) => {
      const [key, value] = Object.entries(stateVar)[0];

      if (value !== dataBefore[idx][key]) {
        console.error(
          `Mismatch on state var ${key} at idx ${idx}! Prev value: ${dataBefore[idx][key]}, new value: ${value}`
        );

        return [
          ...acc as ContractStorageDiff,
          {
            key,
            valueBefore: dataBefore[idx][key],
            valueAfter: value,
          }
        ];
      }
    }, []
  );

  if (storageDiff && storageDiff.length > 0) {
    throw new Error(`Storage data mismatch: ${JSON.stringify(storageDiff)}`);
  }
};
