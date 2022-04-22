import * as hre from "hardhat";
import { ZStakeCorePool__factory } from "../typechain";

async function main() {
  const wildStakingPool = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4";
  const userToImpersonate = "0xba8ac443d7cf0c1799a48763499aeffb3db78254";

  // Tell ganache to allow me to impersonate an account
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [userToImpersonate],
  });

  await hre.network.provider.send("hardhat_setBalance", [
    userToImpersonate,
    "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
  ]);

  // Actually get the account / signer
  const signer = await ethers.getSigner(userToImpersonate);

  let stakingPool = ZStakeCorePool__factory.connect(wildStakingPool, signer);

  const depositAmount = (await stakingPool.getDeposit(userToImpersonate, 0)).tokenAmount;

  await stakingPool.unstake(0, depositAmount);
}

main().catch(console.log);
