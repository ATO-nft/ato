import { ethers } from "hardhat";
const fs = require('fs');

async function main() {

  const nftContractAddress = "0xa07be884052Eb1f7853eBF6Dc63b33Ba1fc6AA49" // replace with your own nft contract address
  console.log("Interacting with " + nftContractAddress + " NFT contract")

  //https://docs.ethers.io/v5/api/signer/#Wallet
  const friend = ethers.Wallet.createRandom()

  // Leave empty to get a fresh new wallet address OR just add a recipient wallet address
  var staticRecipientAddress = "" // 0x0e2275474f37dB457624EC22Fd3d1387799B4Bb0

  let friendAddr
  if(staticRecipientAddress != "") {
    friendAddr = staticRecipientAddress
  } else {
    friendAddr = friend.address
  }

  console.log("Friend address: " + friendAddr)
  console.log("Your friend's private key is: " + friend.privateKey)
  
  const [issuer] = await ethers.getSigners()
  const abiDir = __dirname + '/../artifacts/contracts';
  const atoAbiContract = abiDir + "/" + "Ato.sol" + "/" + "Ato" + ".json"  
  let atoAbi;
  try {
    atoAbi = JSON.parse(fs.readFileSync(atoAbiContract,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }
  const ato = new ethers.Contract(nftContractAddress, atoAbi.abi, issuer)
  console.log("Issuer address: " + issuer.address)
  console.log("NFT transfer pending...")
  const transfer = await ato.transferFrom(issuer.address, friendAddr, 1)
  await transfer.wait(1)
  console.log("NFT transfer successful. ✅ " + "https://goerli.etherscan.io/tx/" + transfer.hash)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});