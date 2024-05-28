import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  ZStakeCorePool,
  ZStakeCorePool__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory,
  MockToken,
  MockToken__factory,
  WildToken
} from "../typechain"
import * as hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import { wildTokenContractAbi } from "./constants";

describe("Change config, fork", () => {
  let owner : SignerWithAddress;
  let wildTokenOwner : SignerWithAddress;
  let staker : SignerWithAddress;

  let mockWild : WildToken;
  // let mockMeow : MockToken;

  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;

  let factory : ZStakePoolFactory;

  const msPerDay = 86400;

  // Multsig, must impersonate to operate
  const ownerAddress = "0x1A1d3644fc9906B1EE3d35842789A83D33e99943"
  const wildTokenOwnerAddress = "0x32eB727B120Acf288306fBD67a60D1b6d8984476"

  // Address pulled from subgraph, user with multiple deposit in both pools
  const stakerAddress = "0xc7E875bF1101B10a855d0b7b4caC16e7973D81C8"

  const wildTokenAddress = "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34"
  const meowTokenAddress = "0x0eC78ED49C2D27b315D462d43B5BAB94d2C79bf8"

  const factoryAddress = "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a"
  const wildPoolAddress = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4"
  const lpPoolAddress = "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF"

  before(async () => {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ownerAddress],
    });

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [wildTokenOwnerAddress],
    });

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [stakerAddress],
    });

    await hre.network.provider.send("hardhat_setBalance", [
      ownerAddress,
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ]);

    await hre.network.provider.send("hardhat_setBalance", [
      wildTokenOwnerAddress,
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ]);

    await hre.network.provider.send("hardhat_setBalance", [
      stakerAddress,
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ]);

    owner = await hre.ethers.getSigner(ownerAddress);
    wildTokenOwner = await hre.ethers.getSigner(wildTokenOwnerAddress);
    staker = await hre.ethers.getSigner(stakerAddress);

    mockWild = hre.ethers.ContractFactory.getContract(
      wildTokenAddress,
      wildTokenContractAbi,
      wildTokenOwner
    ) as WildToken;

    // Give funds to stake
    await mockWild.connect(wildTokenOwner).mint(staker.address, "1000000000000000000000000000")

    factory = ZStakePoolFactory__factory.connect(factoryAddress, owner);

    wildPool = ZStakeCorePool__factory.connect(wildPoolAddress, owner);

    lpPool = ZStakeCorePool__factory.connect(lpPoolAddress, owner);
  });

  it("connects and writes out simple data", async () => {
    console.log((await lpPool.weight()).toString());
    console.log((await wildPool.weight()).toString());
    console.log((await factory.getRewardTokensPerBlock()).toString());
  })

  it("Grabs info about staker", async () => {
    const user = await wildPool.users(staker.address);
    const depositsLength = await wildPool.getDepositsLength(staker.address);

    const wildPendingYieldRewards = await wildPool.pendingYieldRewards(staker.address);
    console.log(wildPendingYieldRewards.toString());

    // Change wild pool weight
    // 850 000 000 lp pool before change
    // 150 000 000 wild pool before change
    await factory.connect(owner).changePoolWeight(wildPool.address, 300000000);
    await factory.connect(owner).changePoolWeight(lpPool.address, 600000000);

    console.log(await wildPool.blockNumber());

    // change rewards per block
    // 4 000000000 000000000 before change
    // double =>
    await factory.connect(owner).changeRewardTokensPerBlock(hre.ethers.utils.parseEther("8"));

    const wildPendingYieldRewardsAfter = await wildPool.pendingYieldRewards(staker.address);
    console.log(wildPendingYieldRewardsAfter.toString());
    // const mainBalanceBefore = await mockWild.balanceOf(staker.address);

    // unstake all
    // for (let i = 0; i < depositsLength.toNumber(); i++) {
    //   const deposit = await wildPool.getDeposit(staker.address, i);

    //   if(deposit.tokenAmount.gt(0) && deposit.isYield === true) {
    //     const balanceBefore = await mockWild.balanceOf(staker.address);

    //     await wildPool.connect(staker).unstake(i, deposit.tokenAmount);

    //     const balanceAfter = await mockWild.balanceOf(staker.address);
    //     const beforePlus = balanceBefore.add(deposit.tokenAmount);

    //     if (balanceAfter.sub(beforePlus).gt(0)) {
    //       console.log("yield")
    //     }
    //     console.log()
    //     // balance after > beforePlus means they were also given yield
    //   }
    // }

    // difference in total balance change should equal the pending yield rewards
    // const mainBalanceAfter = await mockWild.balanceOf(staker.address);



    // see how much the user gets when unstake from wild pool

    // change pool weights

    // see what efect is
  });
});