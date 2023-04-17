const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { NFT } from '../../typechain-types/contracts/NFTIsERC721A.sol';
import { Sign } from "crypto";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT contract by Ben BK tests", function () {
        let nft: NFT, accounts: SignerWithAddress[], deployer: SignerWithAddress, account2: SignerWithAddress, account3: SignerWithAddress, account4: SignerWithAddress, account5: SignerWithAddress

        beforeEach(async () => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            account2 = accounts[1]
            account3 = accounts[2]
            account4 = accounts[3]
            account5 = accounts[4]
            await deployments.fixture(["nftiserc721a"])
            nft = await ethers.getContract("NFT")
        })
        
        describe("Deployment", async function() {
            it("should get the info of the NFT collection", async function() {
                let name = await nft.name()
                let symbol = await nft.symbol()
                let totalSupply = await nft.totalSupply()
                assert(name === "Name")
                assert(symbol === "Symbol")
                assert(totalSupply.toString() === "0")
            })
        })

        describe("Setters", function() {
            it('Should change the baseURI', async function() {
                let transaction = await nft.setBaseUri('ipfs://CID2/')
                await transaction.wait()
                let baseURI = await nft.baseURI()
                assert(baseURI === 'ipfs://CID2/')
            })

            it('Should change the saleStartTime', async function() {
                let transaction = await nft.setSaleStartTime(777)
                await transaction.wait()
                let saleStartTime = await nft.saleStartTime()
                assert(saleStartTime.toString() === "777")
            })
        })

        describe('Mint function', function() {
            it('Should not mint if sale has not started', async function() {
                let timestamp = Math.floor(Date.now() / 1000) + 3600
                let transaction = await nft.setSaleStartTime(timestamp)
                await transaction.wait()
                await expect(nft.mint(1)).to.be.revertedWith('Sale has not started yet')
            })

            it('should not mint 1 NFT because not enough ethers are provided', async function() {
                let timestamp = Math.floor(Date.now() / 1000) - 3600
                let transaction = await nft.setSaleStartTime(timestamp)
                await transaction.wait()
                let overrides = {
                    value: ethers.utils.parseEther('0.01')
                }
                await expect(nft.mint(1, overrides)).to.be.revertedWith('Not enought funds')
            })

            it('should not mint if max supply exceeded', async function() {
                let overrides = {
                    value: ethers.utils.parseEther('0.1').mul(3)
                }
                let transaction = await nft.mint(3, overrides)
                await transaction.wait()
                let balanceOfDeployer = await nft.balanceOf(deployer.address)
                assert(balanceOfDeployer.toString() === "3")
                let totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "3")

                transaction = await nft.connect(account2).mint(3, overrides)
                await transaction.wait()
                let balanceOfAccount2 = await nft.balanceOf(account2.address)
                assert(balanceOfAccount2.toString() === "3")
                totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "6")

                transaction = await nft.connect(account3).mint(3, overrides)
                await transaction.wait()
                let balanceOfAccount3 = await nft.balanceOf(account3.address)
                assert(balanceOfAccount3.toString() === "3")
                totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "9")

                await expect(nft.connect(account4).mint(3, overrides)).to.be.revertedWith('Max supply exceeded')
            })

            it('should not mint more than 3 NFTs', async function() {
                let overrides = {
                    value: ethers.utils.parseEther('0.1').mul(4)
                }
                await expect(nft.mint(4, overrides)).to.be.revertedWith('Only 3 NFTs per Wallet')
            })

            it('should not mint more than 3 NFTs', async function() {
                let overrides = {
                    value: ethers.utils.parseEther('0.1').mul(3)
                }
                let transaction = await nft.mint(3, overrides)
                await transaction.wait()
                let balanceOfDeployer = await nft.balanceOf(deployer.address)
                assert(balanceOfDeployer.toString() === "3")
                let totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "3")

                await expect(nft.mint(1, overrides)).to.be.revertedWith('Only 3 NFTs per Wallet')
            })
        })

        describe('Withdraw', function() {
            it('Should withdraw the gains of the collection', async function() {
                const provider = ethers.provider;
                const balanceBefore = await provider.getBalance(deployer.address);

                let overrides = {
                    value: ethers.utils.parseEther('0.1').mul(3)
                }
                let transaction = await nft.connect(account2).mint(3, overrides)
                await transaction.wait()
                let balanceOfDeployer = await nft.balanceOf(account2.address)
                assert(balanceOfDeployer.toString() === "3")
                let totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "3")

                await nft.withdraw()
                const balanceAfter = await provider.getBalance(deployer.address);
                assert(parseInt(balanceAfter.toString()) > parseInt(balanceBefore.toString()))                
            })
        })

        describe('TokenURI', function() {
            it('should not get the TokenURI if the NFT has not been minted', async function() {
                await expect(nft.tokenURI(1)).to.be.revertedWith('URI query for nonexistent token')
            })

            it('should get the TokenURI if the NFT has been minted', async function() {
                let overrides = {
                    value: ethers.utils.parseEther('0.1').mul(3)
                }
                let transaction = await nft.mint(3, overrides)
                await transaction.wait()
                let balanceOfDeployer = await nft.balanceOf(deployer.address)
                assert(balanceOfDeployer.toString() === "3")
                let totalSupply = await nft.totalSupply()
                assert(totalSupply.toString() === "3")

                transaction = await nft.setBaseUri('ipfs://CID/')
                await transaction.wait()
                let tokenURI = await nft.tokenURI(1)
                assert(tokenURI === "ipfs://CID/1.json")
            })
        })
    })