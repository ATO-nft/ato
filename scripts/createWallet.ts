import { ethers } from "hardhat";
const fs = require('fs');

async function main() {

//   const nftContractAddress = "0xa07be884052Eb1f7853eBF6Dc63b33Ba1fc6AA49" // replace with your own nft contract address
//   console.log("Interacting with " + nftContractAddress + " NFT contract")

  //https://docs.ethers.io/v5/api/signer/#Wallet
  const friend = ethers.Wallet.createRandom()

  // Leave empty to get a fresh new wallet address OR just add a recipient wallet address
//   var staticRecipientAddress = "" // 0x0e2275474f37dB457624EC22Fd3d1387799B4Bb0

  let friendAddr
  friendAddr = friend.address

  console.log("Public address: " + friendAddr)
  console.log("Private key: " + friend.privateKey)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});