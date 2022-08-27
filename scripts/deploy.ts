import { ethers } from "hardhat";
const hre = require("hardhat");
import { handleStorage } from "../metadata/handleStorage"

async function main() {

  ///// Edit this part to shape your NFT. /////
  const author = "Julien"
  const name = "Black thistle"
  const symbol = "THISTLE"
  const description = "Black thistle was created using go-pixel-art (https://github.com/fairhive-labs/go-pixelart)"
  const mint = 10 // number of editions
  const royalties = 8 * 100 // 8%

  const uri = await handleStorage(name, author, description)

  // deploy NFT contract
  const Ato = await ethers.getContractFactory("Ato")
  const ato = await Ato.deploy(name, symbol, mint, uri, royalties)
  await ato.deployTransaction.wait(6)
  console.log("NFT contract deployed at", ato.address, " ✅")
  console.log("OpenSea URL:"+"https://testnets.opensea.io/asset/goerli/"+ato.address+"/1")

  // Etherscan verification
  // await hre.run("verify:verify", { network: "goerli", address: ato.address, constructorArguments: [name, symbol, mint, uri, royalties], });
  console.log("Source code: https://goerli.etherscan.io/address/"+ato.address+"#code")
  console.log("Etherscan verification done. ✅")
  console.log("https://ato.network/Goerli/"+ato.address+"/1")
  console.log("Thanks for using Āto!")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});