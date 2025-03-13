import * as hre from "hardhat";
import assert from "node:assert";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { OWNER_SAFE_ADDRESS, PROXY_ADMIN_ADDRESS } from "./constants";


export const transferProxyAdminOwnership = async (
  currentOwner : SignerWithAddress,
) => {
  console.log("Transferring ProxyAdmin ownership back to the original...");
  let proxyAdminContract = await hre.upgrades.admin.getInstance();

  if (proxyAdminContract.address !== PROXY_ADMIN_ADDRESS) {
    console.log("OZ Upgrades returned the INCORRECT ProxyAdmin, attaching known address");
    proxyAdminContract = proxyAdminContract.attach(PROXY_ADMIN_ADDRESS);
  }
  await proxyAdminContract.connect(currentOwner).transferOwnership(OWNER_SAFE_ADDRESS);

  // validate owner change
  const newAdminOwner = await proxyAdminContract.owner();
  assert.equal(
    newAdminOwner,
    OWNER_SAFE_ADDRESS,
    `ProxyAdmin owner changed incorrectly! Owner to set: ${OWNER_SAFE_ADDRESS}, actual owner: ${newAdminOwner}`
  );

  console.log(`ProxyAdmin ownership transferred successfully! New owner: ${newAdminOwner}`);
};
