import { ethers } from "hardhat";
const hre = require("hardhat");
const color = require("cli-color")
import { Web3Storage, Blob, File , getFilesFromPath } from "web3.storage";

// npx hardhat run scripts/deployThistle.ts --network goerli

async function main() {

  ///// Edit this part to config your NFT. /////
  const mediaFileName = "thistle-black-pixel.jpg" // replace with your own media file name
  const author = "Julien"
  const name = "Black thistle"
  const symbol = "THISTLE"
  const description = "Black thistle was created using go-pixel-art (https://github.com/fairhive-labs/go-pixelart)."

  // nft metadata storage
  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() } as any)
  }

  // store the media file

  async function getFiles (path:any) {
    const File = await getFilesFromPath(path)
    //console.log(`read ${File.length} file(s) from ${path}`)
    return File
  }

  async function storeFiles(license:any) {
    const client = makeStorageClient()
    const ip = await client.put(license)
    return ip;
  }

  const mediaFilePath = "./metadata/" + mediaFileName
  const mediaFile:any = "https://ipfs.io/ipfs/" + (await storeFiles(await getFiles(mediaFilePath)) + "/" + mediaFileName)
  console.log("Media file stored. ✅",mediaFile, " ")


  // store the IP license 

  const license:any = "CC0 1.0 Universal"; // bad
  console.log("License stored. ✅", license)

  // edit the metadata

  const metadata = {
    "name": name,
    "author": author,
    "description": description,
    "image": mediaFile,
    "license": license,     
    "attributes":[
      {
        "trait_type":"Color",
        "value":"Black"
      }
    ]
  };
  
  // store the metadata

  function makeFileObjects() {
    const blob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files
  }

  async function storeMetadata(files: any) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    return "https://ipfs.io/ipfs/" + cid;
  }

  const uri = (await storeMetadata(makeFileObjects())) + "/metadata.json";
  console.log("Metadata storage done. ✅", uri)

  // deploy NFT contract
  console.log("Deployment in progress...")
  const Thistle = await ethers.getContractFactory("Thistle")
  const thistle = await Thistle.deploy(name, symbol, uri)
  await thistle.deployed();
  var msg = color.xterm(39).bgXterm(128);
  console.log("NFT contract deployed. ✅", msg(thistle.address))

  // Etherscan verification
  // await thistle.deployTransaction.wait(6)
  // await hre.run("verify:verify", { network: "goerli", address: thistle.address, constructorArguments: [name, symbol, uri], });
  console.log("Etherscan verification done. ✅")
  console.log("Source code: https://goerli.etherscan.io/address/" + thistle.address + "#code")
  console.log("https://ato.network/Goerli/" + thistle.address + "/1")
  console.log("Thanks for using Āto!")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});