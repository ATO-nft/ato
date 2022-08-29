# Āto

Helps you create an NFT or a series of NFTs.

It stores your media file (image, video, ...) on IPFS ([Web3 Storage](https://web3.storage/)) and deploys your NFT smart contract.

## Install

```shell
npm i
```

## Test

```shell
npx hardhat test
```

## Deploy

[Goerli](https://goerli.net/) (testnet) is currently the only supported network.

Copy the [`.env.example`](https://github.com/ATO-nft/ato/blob/main/.env.example) file and rename it `.env`. In this `.env` file, you want to:

- Add one of your wallets' private key ([MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) private key export). It's recommended to create a fresh address, then go grab a handful of Goerli ETH using [this faucet](https://goerlifaucet.com/)
- Add your own [POKT Network](https://www.pokt.network/) endpoint
- Add your [Web3.Storage](https://web3.storage/tokens/) API token

You don't need to add your own Etherscan API key because the contract is already verified, meaning the code will be available on Etherscan.

You can go ahead and run:

```shell
npx hardhat run scripts/deploy.ts --network goerli
```

It will store your files on IPFS (Filecoin), deploy your NFT contract, and mint your NFT.

You can view this NFT on [Āto NFT viewer](https://ato.network/Goerli/0xa07be884052Eb1f7853eBF6Dc63b33Ba1fc6AA49/1). Your contract should be already [verified on Etherscan](https://goerli.etherscan.io/address/0xa07be884052Eb1f7853eBF6Dc63b33Ba1fc6AA49#code).

#### NFT setup (optional)

Get an IP license:

- Go to [https://ato.network/license](https://ato.network/license) and create an IP license for your artwork (use it in demo mode)

In the `metadata` folder:

- Replace `thistle-black-pixel.jpg` with your own media file
- Replace `thistle-test-IP-license.pdf` with your own license file

Then in `deploy.ts`, change the values of these variables:

```js
///// Edit this part to config your NFT. /////
const mediaFileName = "thistle-black-pixel.jpg"; // replace with your own media file name
const licenseFileName = "thistle-test-IP-license.pdf"; // replace with your own license file name
const author = "Julien";
const name = "Black thistle";
const symbol = "THISTLE";
const description =
  "Black thistle was created using go-pixel-art (https://github.com/fairhive-labs/go-pixelart)";
const mint = 1; // number of editions
const royalties = 8 * 100; // 8%
```

In `metadata/handleStorage.ts`, please make sure the machine-readable object (`license_details`) within the `metadata` object is in coherence with your IP license:

```json
"license_details":[
    {
        "trait_type":"exclusivity",
        "value":"true"
    },
    {
        "trait_type":"privateUse",
        "value":"true"
    },
    {
        "trait_type":"displayOnMarketplaces",
        "value":"true"
    },
    {
        "trait_type":"displayOnEveryMedia",
        "value":"true"
    },
    {
        "trait_type":"rightToAdapt",
        "value":"false"
    },
    {
        "trait_type":"rightToAddALogo",
        "value":"false"
    },
    {
        "trait_type":"merchandisingRights",
        "value":"true"
    }]
```

Then you can deploy on Goerli:

```shell
npx hardhat run scripts/deploy.ts --network goerli
```

Or deploy on Polygon:

```shell
npx hardhat run scripts/deploy.ts --network polygon
```

#### Transfer your NFT

Once you're done with the deployment, you can send your NFT to a friend!

- In `transfer.ts`, replace the contract address (line 5)
- Paste the recipient address (line 13)

Then:

```shell
npx hardhat run scripts/transfer.ts --network goerli
```

#### Etherscan verification

If want to make modifications on **[Ato.sol](https://github.com/ATO-nft/ato/blob/main/contracts/Ato.sol)**, the NFT Solidity contract, you need to:

- Delete the `artifacts`, and `cache` folders
- Add your [Etherscan](https://etherscan.io/) API key to your `.env` file
- Uncomment lines 26 and 27 in `deploy.ts`:

```js
await hre.run("verify:verify", {
  network: "goerli",
  address: ato.address,
  constructorArguments: [name, symbol, mint, uri, royalties],
});
```

#### Redeemable

To make your NFT redeemable, deploy `AtoRedeemable.sol` instead of `Ato.sol`. It's using the Redeemable NFT extension ([EIP-Redeemable](https://github.com/ATO-nft/redeemable/blob/main/eip-draft_redeemable.md)) also developed by [Āto](https://github.com/ATO-nft). It can be used if you want to enable people to redeem their NFT for physical objects, tickets, on-chain assets (DeFi), etc.

Please note the Redeemable NFT Extension has not been audited yet. **Use at you own risks.**

## Support

You can contact us via [Element](https://matrix.to/#/@julienbrg:matrix.org) (preferred), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.gg/xw9dCeQ94Y), [LinkedIn](https://www.linkedin.com/in/julienberanger/) or [email](mailto:julien@ato.network).
