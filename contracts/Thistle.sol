// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title NFT contract
contract Thistle is ERC721, ERC721URIStorage, ERC721Burnable {

	constructor(
		string memory _name,
		string memory _symbol,
		string memory _uri
	)
	ERC721(_name, _symbol)
	{
		_safeMint(msg.sender, 1);
		_setTokenURI(1, _uri);
	}

	function _burn(uint256 tokenId)
		internal
		override(ERC721, ERC721URIStorage)
	{
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		override(ERC721, ERC721URIStorage)
		returns (string memory)
	{
		return super.tokenURI(tokenId);
	}

	function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
}
