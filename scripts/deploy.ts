import { ethers } from "hardhat";
const hre = require("hardhat");
import { handleStorage } from "../metadata/handleStorage"

async function main() {

  // You can edit this part
  const author = "Julien";
  const name = "Black Thistle";
  const symbol = "THISTLE";
  const description = "I just love thisltes!"
  const mint = 1;
  const royalties = 8 * 100;

  //const uri = handleStorage(name, royalties, author, description);
  const uri = await handleStorage();

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