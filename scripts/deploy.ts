import { ethers } from "hardhat";
const hre = require("hardhat");
import { handleStorage } from "../metadata/handleStorage"
import { makeLicense } from "../metadata/makeLicense"
const color = require("cli-color")
const fs = require("fs");

async function main() {

  // Edit this part to config your NFT
  const mediaFileName = "thistle-black-pixel.jpg" // replace with your own media file name
  const author = "Julien"
  const name = "Jungle fever #1"
  const symbol = "JUNGLE"
  const description = "I've got jungle fever, she's got jungle fever // We've got jungle fever, we're in love"
  const mint = 42 // number of editions
  const royalties = 8 * 100 // 8%

  // Creates an IP license
  const licenseFileName = await makeLicense()

  // Stores the metadata and associated files
  const uri = await handleStorage(name, author, description, mediaFileName, licenseFileName)

  // deploy NFT contract
  const Ato = await ethers.getContractFactory("Ato")
  const ato = await Ato.deploy(name, symbol, mint, uri, royalties)
  await ato.deployed();
  var msg = color.xterm(39).bgXterm(128);
  console.log("NFT contract deployed. ✅", msg(ato.address))

  // Etherscan verification: uncomment the 2 following lines if you modify the Solidity contract
  //await ato.deployTransaction.wait(6)
  //await hre.run("verify:verify", { network: "goerli", address: ato.address, constructorArguments: [name, symbol, mint, uri, royalties], });
  console.log("Etherscan verification done. ✅")
  console.log("Source code: https://goerli.etherscan.io/address/" + ato.address + "#code")
  console.log("https://ato.network/Goerli/" + ato.address + "/1")
  //console.log("OpenSea URL: " + "https://testnets.opensea.io/asset/goerli/" + ato.address + "/1")

  // Write the contract address to store.json
  fs.writeFileSync(
    "store.json",
    JSON.stringify({contractAddress: ato.address}, undefined, 2)
  );



  console.log("Thanks for using Āto!")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});