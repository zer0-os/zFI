const pool = artifacts.require("../contracts/Zer0Pool721.sol");
const lend = artifacts.require("../contracts/Zer0Lend721.sol");
//const token = artifacts.require("../contracts/Zer0LPToken.sol");
const test721 = artifacts.require("../contracts/ERC721TestToken.sol")
var BN = web3.utils.BN;

const { assert } = require("console");
//const owned = artifacts.require("Owned");
const fs = require("fs");
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//new tests
contract("zer0 lending environment", accounts => {
  var pooli, lendi, tokeni, tokentest;
  var testval = web3.utils.toWei(".000001", "ether");
  it("Deploys pool", async () => {
    pooli = await pool.deployed();
  });
  it("Deploys lend", async () => {
    lendi = await lend.deployed();
  });
  /*it("Deploys lp token", async () => {
    tokeni = await token.deployed();
  });*/
  it("Deploys 721 token test", async () => {
    tokentest = await test721.deployed();
  });
  it("Pauses 721", async () => {
    await tokentest.pause();
  });
  it("Unpauses 721", async () => {
    await tokentest.unpause();
  });
  it("Mints 721 token", async () => {
    await tokentest.mint(accounts[0]);
  });
  it("Confirms mint recipient is owner", async () => {
    let o = await tokentest.ownerOf(0);
    assert(o == accounts[0]);
  });
  it("Approves pool to spend token 0", async () => {
    await tokentest.approve(pooli.address, 0);
  });
  it("Stakes token 0 in day pool", async () => {
    await pooli.daypool(tokentest.address, 0);
  });
  it("Lends to test network pool", async () => {
    await pooli.lend(tokentest.address, {from: accounts[0], value: testval});
  });
  it("Borrows from pool", async () => {
    await pooli.borrow(tokentest.address, testval);
  });
  it("Repays pool with 0 interest", async () => {
    await pooli.repay(tokentest.address, {from: accounts[0], value: testval});
  });
  it("Exits token 0", async () => {
    await pooli.exit(tokentest.address, 0);
  });
});
