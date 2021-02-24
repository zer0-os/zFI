//const fs = require("fs");
//const data = require("./contractData");
const A = artifacts.require("../contracts/Zer0Pool721.sol");
const B = artifacts.require("../contracts/Zer0Lend721.sol");
const C = artifacts.require("../contracts/Zer0LPToken.sol");

module.exports = async function(deployer) {
    let aInst, bInst, cInst;

    await Promise.all([deployer.deploy(A), deployer.deploy(B)]);

    instances = await Promise.all([A.deployed(), B.deployed()]);

    aInst = instances[0];
    bInst = instances[1];
  
    cInst = C.deployed(0, aInst.address);
    //set contractData
    // Data which will write in a file.
    //console.log("abi: ", JSON.stringify(aInst.abi));
    /*let data =
    'var address = "' +
    aInst.address +
    '"; var abi = ' +
    JSON.stringify(aInst.abi) +
    ";";

    // Write data in 'Output.txt' .
    fs.writeFile("./contractData.js", data, err => {
    // In case of a error throw err.
    if (err) throw err;
    });*/
};
