//SPDX-Licence-Identifier: MIT
pragma solidity 0.8.19;

/// @author Ben BK https://twitter.com/BenBKTech

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721A, Ownable {

    using Strings for uint;

    //The total number of NFTs
    uint private constant MAX_SUPPLY = 10;

    //The price of one NFT
    uint private constant PRICE = 0.001 ether;

    //When the presale (dutch auction) starts
    uint public saleStartTime = 1681725607;

    //base URI of the NFTs
    string public baseURI;

    //Amount NFTs/Wallet
    uint private constant MAX_NFTS_PER_ADDRESS = 3;
    mapping(address => uint) public amountNFTsPerWallet;

    constructor() ERC721A("Name", "Symbol") {}

    /**
    * @notice Mint function
    *
    * @param _quantity Amount of NFTs the user wants to mint
    **/
    function mint(uint _quantity) external payable {
        require(currentTime() >= saleStartTime, "Sale has not started yet");
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Max supply exceeded");
        require(msg.value >= PRICE * _quantity, "Not enought funds");
        require(amountNFTsPerWallet[msg.sender] + _quantity <= MAX_NFTS_PER_ADDRESS, "Only 3 NFTs per Wallet");
        amountNFTsPerWallet[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }

    /**
    * @notice Get the current timestamp
    *
    * @return the current timestamp
    **/
    function currentTime() internal view returns(uint) {
        return block.timestamp;
    }

    /**
    * @notice Get the token URI of an NFT by his ID
    *
    * @param _tokenId The ID of the NFT you want to have the URI
    **/
    function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    /**
    * @notice Change the base URI of the NFTs
    *
    * @param _baseURI The new base URI of the NFTs
    **/
    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    /**
    * @notice Change the saleStartTime
    *
    * @param _saleStartTime The new saleStartTime
    **/
    function setSaleStartTime(uint _saleStartTime) external onlyOwner {
        saleStartTime = _saleStartTime;
    }

    /**
    * @notice Get paid :D !
    **/
    function withdraw() public payable onlyOwner {
    // This will pay Ben BK 3% of the initial sal to support his Youtube Channel
    // You can remove this if you want
    (bool hs, ) = payable(0x06fCEd3C170534fB5304724Df4aE0E3C5Ad2e111).call{value: address(this).balance * 3 / 100}("");
    require(hs);

    // This will payout the owner 97% of the contract balance.
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

}