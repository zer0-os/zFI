import { ethers } from "ethers";
import hre from "hardhat";


const _ADMIN_SLOT_CRIBS = "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
const _ADMIN_SLOT_ZFI = "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";

const main = async () => {
  const contracts = [
    // "0x411973Fa81158A4c7767a0D6F7dF62723fDd541F", // zAuction
    // "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34", // WILD token
    // "0x2a3bFF78B79A009976EeA096a51A948a3dC00e34", // LP token
    // "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a", // stake factory
    // "0x7701913b65C9bCDa4d353F77EC12123d57D77f1e", // zDAO
    // "0xa05Ae774Da859943B7B859cd2A6aD9F5f1651d6a", // basic controller
    // "0xc2e9678A71e50E5AEd036e00e9c5caeb1aC5987D" // default registrar
    // "0xE4954E4FB3C448f4eFBC1f8EC40eD54a2A1cc1f5" // Crafts NFT - returns 0x0 address!
    // "0xc2e9678A71e50E5AEd036e00e9c5caeb1aC5987D" // ZNS token
    "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF"
  ];

  await contracts.reduce(
    async (acc, contract) => {
      await acc;

      const provider = ethers.providers.getDefaultProvider();
      const slot = await provider.getStorageAt(
        contract,
        _ADMIN_SLOT_CRIBS
      );
      // method to remove zeros and return ethereum address
      const proxyAdminAddr = `0x${slot.slice(26)}`;

      console.log(`PROXY ADMIN for ${contract} IS: ${proxyAdminAddr}`);

      if (proxyAdminAddr !== ethers.constants.AddressZero) {
        const prAdFact = await hre.ethers.getContractFactory("ProxyAdmin");
        const proxyAdmim = prAdFact.attach(proxyAdminAddr);
        // const owner = await proxyAdmim.owner();
        const owner = await provider.getStorageAt(proxyAdminAddr, 0);
        console.log(`OWNER OF PROXY ADMIN for contract ${contract} IS: ${`0x${owner.slice(26)}`}`);
      }
    }, Promise.resolve()
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
