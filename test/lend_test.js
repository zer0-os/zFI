const pool = artifacts.require("../contracts/Zer0Pool721.sol");
const lend = artifacts.require("../contracts/Zer0Lend721.sol");
const token = artifacts.require("../contracts/Zer0LPToken.sol");
const test721 = artifacts.require("../contracts/ERC721TestToken.sol")
var BN = web3.utils.BN;

//const owned = artifacts.require("Owned");
const fs = require("fs");
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//new tests
contract("zer0 lending environment", accounts => {
  it("Deploys", async () => {
    let pooli = await pool.deployed();
    let lendi = await lend.deployed();
    let tokeni = await token.deployed();
    let tokentest = await test721.deployed();
  });
});
