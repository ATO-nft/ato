import { ethers } from "hardhat";
const fs = require('fs');

async function main() {

  // https://docs.ethers.io/v5/api/signer/#Wallet
  const friend = ethers.Wallet.createRandom()

  // Leave empty to get a fresh new wallet address OR just add a recipient wallet address
  // var staticRecipientAddress = ""

  let friendAddr
  friendAddr = friend.address

  console.log("Public address: " + friendAddr)
  console.log("Private key: " + friend.privateKey)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});