import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ato", function () {

  async function deployContractsFixture() {
    
    const [issuer, bob, alice] = await ethers.getSigners();

    const name = "Black Thistle";
    const symbol = "THISTLE";
    const uri = "bafybeihjf5qkgkxepvs4mmmd77hsw2yw52py6j2blcl4tzjxgrn6aixs7a/metadata.json";
    const preMint = 1;
    const royalties = 1.5 * 100; // 1.5% resale rights

    const Ato = await ethers.getContractFactory("Ato");
    const ato = await Ato.deploy(name, symbol, preMint, uri, uri, royalties);
    await ato.deployed();

    return { issuer, bob, alice, ato, name, symbol, uri, preMint, royalties };
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
    it("Check preMint", async function () {
      const { ato, preMint } = await loadFixture(deployContractsFixture);
      expect(await ato.totalSupply()).to.equal(preMint);
    });
    it("Check Redeemable", async function () {
      const { ato } = await loadFixture(deployContractsFixture);
      expect(await ato.supportsInterface("0x2f8ca953")).to.be.true;
      expect(await ato.isRedeemable(1)).to.be.true;
    });
    it("Check uri(s)", async function () {
      const { ato, uri } = await loadFixture(deployContractsFixture);
      expect(await ato.tokenURI(1)).to.equal(uri);
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
