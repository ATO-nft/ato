import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

/*
  Ato redeemable contract : ERC721 with resale rights and redeemable
*/
describe("=== AtoRedeemable ===", function () {

  async function deployContractsFixture() {

    // Create signers
    const [issuer, acquirer] = await ethers.getSigners();

    // init data
    const name = "Black Thistle";
    const symbol = "THISTLE";
    const uri = "https://ipfs.io/ipfs/redeemable/metadata.json";
    const uriRedeemed = "https://ipfs.io/ipfs/redeemed/metadata.json";
    const mintNumber = 1;
    const royalties = 1.5 * 100; // 1.5% resale rights

    // Create instance of AtoRedeemable.sol
    const Ato = await ethers.getContractFactory("AtoRedeemable");
    const ato = await Ato.deploy(name, symbol, mintNumber, uri, uriRedeemed, royalties);
    await ato.deployed();

    return { issuer, acquirer, ato, name, symbol, uri, uriRedeemed, mintNumber, royalties };
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
  });

  describe("Redeemable", function () {
    it("Check Redeemable", async function () {
      const { ato } = await loadFixture(deployContractsFixture);
      expect(await ato.supportsInterface("0x2f8ca953")).to.be.true;
      expect(await ato.isRedeemable(1)).to.be.true;
    });
    it("Check uri(s)", async function () {
      const { ato, uri, uriRedeemed } = await loadFixture(deployContractsFixture);
      expect(await ato.isRedeemable(1)).to.be.true;
      expect(await ato.tokenURI(1)).to.equal(uri);
      // redeem
      await ato.redeem(1);
      expect(await ato.isRedeemable(1)).to.be.false;
      expect(await ato.tokenURI(1)).to.equal(uriRedeemed);
    });
  });
});
