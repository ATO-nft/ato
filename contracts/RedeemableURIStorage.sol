// SPDX-License-Identifier: GPL-3.0
// From : OpenZeppelin Contracts (last updated v4.7.0) (token/ERC721/extensions/ERC721URIStorage.sol)

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Redeemable.sol";

/**
 * @dev ERC721 token with storage based token URI management for redeemable contracts.
 */
abstract contract RedeemableURIStorage is ERC721, Redeemable {
	bool constant REDEEMABLE = true;
	bool constant NOT_REDEEMABLE = false;

	using Strings for uint256;

	// Mapping for token URIs
	mapping(uint256 => mapping (bool => string)) private _tokenURIs;

	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		_requireMinted(tokenId);

		string memory _tokenURIRedeemable = _tokenURIs[tokenId][REDEEMABLE];
		string memory base = _baseURI();
		string memory _tokenURINotRedeemable = _tokenURIs[tokenId][NOT_REDEEMABLE];

		// If there is no base URI, return the token URI.
		if (bytes(base).length == 0) {
			return isRedeemable(tokenId) ? _tokenURIRedeemable : _tokenURINotRedeemable;
		}
		// If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
		if (isRedeemable(tokenId) && bytes(_tokenURIRedeemable).length > 0) {
			return string(abi.encodePacked(base, _tokenURIRedeemable));
		}
		if (!isRedeemable(tokenId) && bytes(_tokenURINotRedeemable).length > 0) {
			return string(abi.encodePacked(base, _tokenURINotRedeemable));
		}

		return super.tokenURI(tokenId);
	}

	/**
	 * @dev Sets `_tokenURIRedeemable` and `_tokenURINotRedeemable` as the tokenURIs of `tokenId`.
	 *
	 * Requirements:
	 *
	 * - `tokenId` must exist.
	 */
	function _setTokenURI(uint256 tokenId, string memory _tokenURIRedeemable, string memory _tokenURINotRedeemable) internal virtual {
		require(_exists(tokenId), "RedeemableURIStorage: URI set of nonexistent token");
		_tokenURIs[tokenId][REDEEMABLE] = _tokenURIRedeemable;
		_tokenURIs[tokenId][NOT_REDEEMABLE] = _tokenURINotRedeemable;
	}

	/**
	 * @dev See {ERC721-_burn}. This override additionally checks to see if a
	 * token-specific URIs was set for the token, and if so, it deletes the token URIs from
	 * the storage mapping.
	 */
	function _burn(uint256 tokenId) internal virtual override {
		super._burn(tokenId);

		if (bytes(_tokenURIs[tokenId][REDEEMABLE]).length != 0) {
			delete _tokenURIs[tokenId][REDEEMABLE];
		}
		if (bytes(_tokenURIs[tokenId][NOT_REDEEMABLE]).length != 0) {
			delete _tokenURIs[tokenId][NOT_REDEEMABLE];
		}
	}

	/// @inheritdoc	ERC165
	function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, Redeemable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
}
