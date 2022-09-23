import { ethers } from "hardhat";

async function main() {

  // Wild Pool on Rinkeby
  const poolAddress = "0xE0Bb298Afc5dC12918d02732c824DA44e7D61E2a";

  const accounts = await ethers.getSigners();

  const mockCallerContractFactory = await ethers.getContractFactory("MockCaller");
  
  console.log(mockCallerContractFactory.interface);

  const mockCallerContract = await mockCallerContractFactory.connect(accounts[0]).deploy(poolAddress);

  await mockCallerContract.deployed();

  console.log(`MockCaller deployed to ${mockCallerContract.address} with pool ${poolAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
