import * as hre from "hardhat";
import {
  ZStakeCorePool__factory,
  ZStakeCorePoolMigration,
  ZStakeCorePoolMigration__factory,
} from "../../typechain";
import { poolAddresses } from "./constants";
import { compareStorageData, readContractStorage } from "./storage-data";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


export const upgradeStakingPool = async ({
  pool,
  ownerExternal,
} : {
  pool : "lp" | "wild";
  ownerExternal ?: SignerWithAddress;
}) => {
  const poolAddress = poolAddresses[pool];
  console.log(`Starting full upgrade process for ${pool} pool at address ${poolAddress}`);

  let owner = ownerExternal;
  if (!owner) {
    [ owner ] = await hre.ethers.getSigners();
  }

  console.log(`Owner acquired as ${owner.address}`);

  const stakingPoolFactOg = new ZStakeCorePool__factory(owner);
  const stakingPoolContractOg = stakingPoolFactOg.attach(poolAddress);
  const storageDataPre = await readContractStorage(
    stakingPoolFactOg,
    stakingPoolContractOg,
  );
  console.log("Storage data of the original pool contract acquired");

  // upgrade pool
  console.log(`Initiating upgrade of ${pool} pool at address ${poolAddress}`);
  const stakingPoolFactUpg = new ZStakeCorePoolMigration__factory(owner);

  const poolContractUpgraded = await hre.upgrades.upgradeProxy(poolAddress, stakingPoolFactUpg);

  const implAddress = await hre.upgrades.erc1967.getImplementationAddress(poolContractUpgraded.address);
  console.log(`Upgraded ${pool} pool to implementation: ${implAddress}`);

  // validate storage after upgrade
  const storageDataPost = await readContractStorage(
    stakingPoolFactUpg,
    poolContractUpgraded,
  );

  console.log("Storage data of the upgraded pool contract acquired. Proceeding to compare...");
  compareStorageData(storageDataPre, storageDataPost);
  console.log("Storage compared successfully. Values are unchanged after upgrade");

  console.log(`Full upgrade process for ${pool} pool finished successfully.`);

  return poolContractUpgraded as ZStakeCorePoolMigration;
};
