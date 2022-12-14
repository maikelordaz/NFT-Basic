const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT unit tests", function () {
          let deployer, basicNft

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNft")
          })

          it("Mints a new token", async function () {
              const tokenURIexpected = "ipfs://QmPhxoJi14YaVmMaHHtUyBGX5zFEYiKUMcAXJiGAS9PT8K"
              const tokenCounter = await basicNft.getTokenCounter()
              const mintTX = await basicNft.mintNft()
              await mintTX.wait(1)
              const tokenURI = await basicNft.tokenURI(0)
              const newTokenCounter = await basicNft.getTokenCounter()
              assert.equal(tokenCounter, "0")
              assert.equal(newTokenCounter, "1")
              assert.equal(tokenURI, tokenURIexpected)
          })
      })
