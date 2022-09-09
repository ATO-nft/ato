import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("=== Thistle minimalist NFT ===", function () {

  async function deployContractsFixture() {

    // Create signers
    const [issuer, acquirer] = await ethers.getSigners();

    const name = "Black Thistle";
    const symbol = "THISTLE";
    const uri = "bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json";
    const mintNumber = 1;

    // Create instance of Thistle.sol
    const Thistle = await ethers.getContractFactory("Thistle");
    const thistle = await Thistle.deploy(name, symbol, uri);
    await thistle.deployed();

    return { issuer, acquirer, thistle, name, symbol, uri, mintNumber };
  }

  describe("Deployment", function () {
    it("Check uri", async function () {
      const { thistle, uri } = await loadFixture(deployContractsFixture);
      expect(await thistle.tokenURI(1)).to.equal(uri);
    });
  });

  describe("Transfers", function () {
    it("Should transfer the NFT to Bob", async function () {
      const { thistle, issuer, acquirer } = await loadFixture(deployContractsFixture);
      await thistle.transferFrom(issuer.address, acquirer.address, 1)
      expect(await thistle.ownerOf(1)).to.equal(acquirer.address);
    });
  });
});
