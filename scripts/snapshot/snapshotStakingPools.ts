import fetch from "node-fetch"
import * as dotenv from "dotenv";

import * as fs from "fs"

dotenv.config()

const lpTokenPoolAddress = "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF";
const wildPoolAddress = "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4";

const main = async () => {
  // Execute this script from within 'zFI/scripts/snapshot
  const stakersMap = new Map();
  const wildMap = new Map();
  const lpTokenMap = new Map();

  const baseUri = "https://api.etherscan.io/api?module=account"
  const action = "txlist"
  const startBlock = "0"
  const endBlock = "99999999"
  const page = "1";
  const offset = "1300" // 1241 total tx's according to etherscan
  const sort = "asc"
  const apiKey = process.env.ETHERSCAN_API_KEY || "";

  let formedUri = `${baseUri}&action=${action}&address=${wildPoolAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`
  let res = await fetch(formedUri, {method: "GET" })
  let txs = await res.json();

  for (let tx of txs.result) {
    // Get all unique stakers in WILD pool
    wildMap.set(tx.from, true);
    // Also add to total unique stakers list
    stakersMap.set(tx.from, true);
  }

  let keys = Array.from(wildMap.keys());
  let data = JSON.stringify(keys, null, 0);
  fs.writeFileSync("outputs/wildStakingPoolSnapshot.json", data);

  formedUri = `${baseUri}&action=${action}&address=${lpTokenPoolAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`
  res = await fetch(formedUri, {method: "GET" })
  txs = await res.json();

  for (let tx of txs.result) {
    // Get all unique stakers in LP Token pool
    lpTokenMap.set(tx.from, true);
    // Also add to total unique stakers list
    stakersMap.set(tx.from, true);
  }

  keys = Array.from(lpTokenMap.keys());
  data = JSON.stringify(keys, null, 0);
  fs.writeFileSync("outputs/lpStakingPoolSnapshot.json", data);
  
  keys = Array.from(stakersMap.keys());
  data = JSON.stringify(keys, null, 0);
  fs.writeFileSync("outputs/poolsSnapshot.json", data);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});