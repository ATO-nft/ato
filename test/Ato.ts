import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

/*
  Ato standard contract : ERC721 with resale rights
*/
describe("=== Ato ===", function () {

  async function deployContractsFixture() {

    // Create signers
    const [issuer, acquirer] = await ethers.getSigners();

    const name = "Black Thistle";
    const symbol = "THISTLE";
    const uri = "bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json";
    const mintNumber = 1;
    const royalties = 1.5 * 100; // 1.5% resale rights

    // Create instance of Ato.sol
    const Ato = await ethers.getContractFactory("Ato");
    const ato = await Ato.deploy(name, symbol, mintNumber, uri, royalties);
    await ato.deployed();

    return { issuer, acquirer, ato, name, symbol, uri, mintNumber, royalties };
  }

  describe("Deployment", function () {
    it("Should deploy Ato.sol", async function () {
      const { ato, issuer } = await loadFixture(deployContractsFixture);
      expect(await ato.owner()).to.equal(issuer.address);
    });
    it("Check royalties", async function () {
      const { ato, royalties } = await loadFixture(deployContractsFixture);
      expect((await ato.royaltyInfo(0, 10000))[1]).to.equal(royalties);
    });
    it("Check mintNumber", async function () {
      const { ato, mintNumber } = await loadFixture(deployContractsFixture);
      expect(await ato.totalSupply()).to.equal(mintNumber);
    });
    it("Check uri", async function () {
      const { ato, uri } = await loadFixture(deployContractsFixture);
      expect(await ato.tokenURI(1)).to.equal(uri);
    });
  });

  describe("Transfers", function () {
    it("Should transfer the NFT to Bob", async function () {
      const { ato, issuer, acquirer } = await loadFixture(deployContractsFixture);
      await ato.transferFrom(issuer.address, acquirer.address, 1)
      expect(await ato.ownerOf(1)).to.equal(acquirer.address);
    });
  });
});
