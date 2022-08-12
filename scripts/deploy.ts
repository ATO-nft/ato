import { ethers } from "hardhat";
const hre = require("hardhat");
import { Web3Storage, Blob, File } from "web3.storage";
import * as metadata from "../metadata/metadata.json";

async function main() {

  const name = "Black thistle";
  const symbol = "THISTLE";

  // handle metadata storage  
  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() } as any);
  }

  function makeFileObjects() {
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files;
  }

  async function storeFiles(files: any) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  }

  makeStorageClient();
  const uri = (await storeFiles(makeFileObjects())) + "/metadata.json";
  console.log("Storage done. Full URI:", "https://ipfs.io/ipfs/" + uri, " ✅");  

  // deploy NFT contract
  const Ato = await ethers.getContractFactory("Ato");
  const ato = await Ato.deploy(name, symbol, uri);
  await ato.deployTransaction.wait(6);
  console.log("NFT contract deployed at", ato.address, " ✅");

  // Etherscan verification
  await hre.run("verify:verify", { network: "goerli", address: ato.address, constructorArguments: [ name, symbol, uri], });
  console.log("Etherscan verification done. ✅");
  console.log("Thanks for using Āto!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});