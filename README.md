# Āto

## Install

```shell
npm i
```

## Test

```shell
npx hardhat test
```

## Deploy

- Copy the `.env.example` file, rename it `.env`, then add one of your wallets' private key, your own [Alchemy](https://alchemy.com/) project ID (full url), a [Web3.Storage](https://web3.storage/tokens/) API token, and an [Etherscan](https://etherscan.io/) API key.
- Make sure you have a handful of Goerli ETH in this wallet.

```
npx hardhat run scripts/deploy.ts --network goerli
```

If the verification fails, it might be because `Ato.sol` has already been verified.

## Example

You can check this NFT on [Āto NFT viewer](https://ato.network/Goerli/0x3ea641B80be5d4954DFc09F391f6652F8fa5F2b6/1) or on [Etherscan](https://goerli.etherscan.io/address/0x3ea641B80be5d4954DFc09F391f6652F8fa5F2b6#code).

## Contact

- Email: [julien@ato.network](mailto:julien@ato.network)

- Twitter: [https://twitter.com/julienbrg](https://twitter.com/julienbrg)

- [Element](https://matrix.to/#/@julienbrg:matrix.org) (preferred)
- [Twitter](https://twitter.com/julienbrg)
- [Discord](https://discord.gg/xw9dCeQ94Y)
- [LinkedIn](https://www.linkedin.com/in/julienberanger/)
- [Email](mailto:julien@strat.cc)
