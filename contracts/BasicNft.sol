// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721 {
    string public constant TOKEN_URI = "ipfs://QmPhxoJi14YaVmMaHHtUyBGX5zFEYiKUMcAXJiGAS9PT8K";
    uint256 private s_tokenCounter;

    constructor() ERC721("Travelier", "IAN") {
        s_tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
        return s_tokenCounter;
    }

    function tokenURI(uint256) public pure override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
