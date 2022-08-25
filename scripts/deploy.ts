import { ethers } from "hardhat";
const hre = require("hardhat");
import { handleStorage } from "../metadata/handleStorage"

async function main() {

  // You can edit this part
  const author = "Julien";
  const name = "Black thistle";
  const symbol = "THISTLE";
  const description = "Black thistle was created using go-pixel-art (https://github.com/fairhive-labs/go-pixelart)";
  const mediaFile = "https://bafybeibghsiwvatdc67ow5vkqxbnm775dcralexliakwi6st5rln7xi7c4.ipfs.dweb.link/thistle-black-pixel.png";
  const license = "CC0 1.0 Universal";
  const mint = 1;
  const royalties = 8 * 100;

  //const uri = handleStorage(name, royalties, author, description);
  const uri = await handleStorage(name, author, description, mediaFile, license);

  // remove this one
  console.log("done ✅", uri);

  // // deploy NFT contract
  // const Ato = await ethers.getContractFactory("Ato");
  // const ato = await Ato.deploy(name, symbol, mint, uri, uri, royalties);
  // await ato.deployTransaction.wait(6);
  // console.log("NFT contract deployed at", ato.address, " ✅");

  // // Etherscan verification
  // await hre.run("verify:verify", { network: "goerli", address: ato.address, constructorArguments: [name, symbol, mint, uri, uri, royalties], });
  // console.log("Etherscan verification done. ✅");
  // console.log("Thanks for using Āto!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});