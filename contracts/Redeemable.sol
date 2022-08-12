// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

/// @title contract Redeemable
/// @author Olivier Fernandez / Frédéric Le Coidic for Āto
/// @dev This is a contract used to add redeemable support to ERC721

/**
 * @dev Add redeemable for ERC721 token.
 *
 * Useful for scenarios such as redeemable physical object
 */
contract Redeemable is ERC165 {

	// mapping of tokenId redeemable
	/// @dev  status is inverted (false = redeemable, true = already redeem) in storage for gas optimisation
	mapping(uint256 => bool) private _redeemable;

	//The supportsInterface method MUST return true when called with 0x2f8ca953.
	bytes4 private constant _INTERFACE_ID_REDEEM = 0x2f8ca953;

	event Redeem(address indexed from, uint256 indexed tokenId);

	constructor() {
	}

	/// @notice get the redeemable status of a token
	/// @param tokenId id of token
	/// @return bool return true if redeemable, false otherwise
	function isRedeemable(uint256 tokenId) public view virtual returns (bool) {
		return !_redeemable[tokenId];
	}

	/// @notice redeeem a token
	/// @param tokenId id of token to redeeem
	/// @dev dont forget to add a require to lock to tokenId owner
	function redeem(uint256 tokenId) public virtual {
		require(isRedeemable(tokenId), "Token already redeem");
		_setRedeem(tokenId, false);
		emit Redeem(msg.sender, tokenId);
	}

	/// @notice set redeeemable status, true for redeemable
	/// @param tokenId id of token to redeeem
	/// @param status new redeeem status
	function _setRedeem(uint256 tokenId, bool status) internal virtual {
		_redeemable[tokenId] = !status;
	}

	/// @inheritdoc	ERC165
	function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
		return interfaceId == _INTERFACE_ID_REDEEM || super.supportsInterface(interfaceId);
	}
}
