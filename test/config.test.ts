import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  ZStakeCorePool,
  ZStakeCorePool__factory,
  ZStakePoolFactory,
  ZStakePoolFactory__factory,
  MockToken,
  MockToken__factory
} from "../typechain"
import * as hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import { wildTokenContractAbi } from "./constants";

describe("Change config", () => {
  let owner : SignerWithAddress;
  let wildTokenOwner : SignerWithAddress;
  let staker : SignerWithAddress;

  let mockWild : Contract;
  // let mockMeow : MockToken;

  let wildPool : ZStakeCorePool;
  let lpPool : ZStakeCorePool;

  let factory : ZStakePoolFactory;

  // Multsig, must impersonate to operate
  const ownerAddress = "0x1A1d3644fc9906B1EE3d35842789A83D33e99943"
  const wildTokenOwnerAddress = "0x32eB727B120Acf288306fBD67a60D1b6d8984476"

  // test wallet
  const stakerAddress = "0xaE3153c9F5883FD2E78031ca2716520748c521dB"

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

    await hre.network.provider.send("hardhat_setBalance", [
      ownerAddress,
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ]);

    await hre.network.provider.send("hardhat_setBalance", [
      wildTokenAddress,
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ]);

    owner = await hre.ethers.getSigner(ownerAddress);
    wildTokenOwner = await hre.ethers.getSigner(wildTokenAddress);
    [staker] = await hre.ethers.getSigners();

    mockWild = hre.ethers.ContractFactory.getContract(wildTokenAddress, wildTokenContractAbi, wildTokenOwner);

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

  it("Confirms original stake yield", async () => {

    console.log((await mockWild.balanceOf(staker.address)).toString());
    // const newWeight = "500000000"

    // await factory.connect(owner).changePoolWeight(lpPool.address, newWeight);
    // await factory.connect(owner).changePoolWeight(wildPool.address, newWeight);
  });
});