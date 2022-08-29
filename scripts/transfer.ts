import { ethers } from "hardhat";
const fs = require('fs');

async function main() {

  const nftContractAddress = "0x4Da5b018ea6C11280a1739719aE753eB39001d11" // replace with your own nft contract address
  console.log("Interacting with " + nftContractAddress + " NFT contract")

  //https://docs.ethers.io/v5/api/signer/#Wallet
  const friend = ethers.Wallet.createRandom()

  // Leave empty to get a fresh new wallet address OR just add a recipient wallet address
  var staticRecipientAddress = "" // 0x70456d078950db075283931D9bE2E01B49f3e71e

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