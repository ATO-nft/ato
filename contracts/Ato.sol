// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
/*
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
*/
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ERC721RedeemableURIStorage.sol";

import './ERC2981ContractWideRoyalties.sol';

/// @custom:security-contact julien@ato.network
contract Ato is ERC721, ERC721RedeemableURIStorage, ERC721Burnable, Ownable/*, EIP712, ERC721Votes*/, ERC2981ContractWideRoyalties {

	constructor(
		string memory _name,
		string memory _symbol,
		string memory _uri,
		string memory _uriRedeemed,
		uint256 _royalties
	)
	ERC721(_name, _symbol) /*EIP712("Ato", "1")*/
	{
		_safeMint(owner(), 1);
		_setTokenURI(1, _uri, _uriRedeemed);
		_setRoyalties(owner(), _royalties);
	}

	//function _baseURI() internal pure override returns (string memory) {
	//	return "https://ipfs.io/ipfs/";
	//}

	function _beforeTokenTransfer(address from, address to, uint256 tokenId)
		internal
		override(ERC721)
	{
		super._beforeTokenTransfer(from, to, tokenId);
	}

	function _afterTokenTransfer(address from, address to, uint256 tokenId)
		internal
		override(ERC721/*, ERC721Votes*/)
	{
		super._afterTokenTransfer(from, to, tokenId);
	}

	function _burn(uint256 tokenId)
		internal
		override(ERC721, ERC721RedeemableURIStorage)
	{
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		override(ERC721, ERC721RedeemableURIStorage)
		returns (string memory)
	{
		return super.tokenURI(tokenId);
	}

	function isRedeemable(uint256 tokenId)
		public
		view
		virtual
		override
		returns (bool)
	{
		require(_exists(tokenId), "Redeem query for nonexistent token");
		return super.isRedeemable(tokenId);
	}

	function redeem(uint256 tokenId)
		public
		virtual
		override
	{
		require(_exists(tokenId), "Redeem query for nonexistent token");
		require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");
		super.redeem(tokenId);
	}

	function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721, ERC721RedeemableURIStorage, ERC2981ContractWideRoyalties)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
}
