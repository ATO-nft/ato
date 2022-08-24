import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ato", function () {

  async function deployContractsFixture() {
    
    const [issuer, bob, alice] = await ethers.getSigners();

    const name = "Black Thistle";
    const symbol = "THISTLE";
    const uri = "bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json";

    const Ato = await ethers.getContractFactory("Ato");
    const ato = await Ato.deploy(name, symbol, uri, uri, 800);
    await ato.deployed();

    return { issuer, bob, alice, ato, name, symbol, uri };
  }

  describe("Deployment", function () {
    it("Should deploy Ato.sol", async function () {
      const { ato, issuer } = await loadFixture(deployContractsFixture);
      expect(await ato.owner()).to.equal(issuer.address);
    });
  });

  describe("Transfers", function () {
    it("Should transfer the NFT to Bob", async function () {
      const { ato, issuer, bob } = await loadFixture(deployContractsFixture);
      await ato.transferFrom(issuer.address, bob.address, 1)
      expect(await ato.ownerOf(1)).to.equal(bob.address);
    });
  });
});
