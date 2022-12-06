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
  const name = "Black thistle"
  const symbol = "THISTLE"
  const description = "Black thistle was created using go-pixel-art (https://github.com/fairhive-labs/go-pixelart)."
  const mint = 1 // number of editions
  const royalties = 8 // 8%

  // Create an IP license
  const licenseFileName = await makeLicense()

  // Store the metadata and associated files
  const uri = await handleStorage(name, author, description, mediaFileName, licenseFileName, royalties)

  // deploy NFT contract
  const Ato = await ethers.getContractFactory("Ato")
  const ato = await Ato.deploy(name, symbol, mint, uri, royalties * 100)
  await ato.deployed();
  var msg = color.xterm(39).bgXterm(128);
  console.log("NFT contract deployed. ✅", msg(ato.address))

  // Etherscan verification: uncomment the 3 following lines if you modify the Solidity contract
  // console.log("Etherscan verification in progress...")
  // await ato.deployTransaction.wait(6)
  // await hre.run("verify:verify", { network: "goerli", address: ato.address, constructorArguments: [name, symbol, mint, uri, royalties], });
  console.log("Etherscan verification done. ✅")
  console.log("Source code: https://goerli.etherscan.io/address/" + ato.address + "#code")
  console.log("https://ato.network/Goerli/" + ato.address + "/1")
  console.log("OpenSea URL: " + "https://testnets.opensea.io/assets/goerli/" + ato.address + "/1")

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