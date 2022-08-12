const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const basicNft = await ethers.getContract("BasicNft", deployer)
    const mintTX = await basicNft.mintNft()
    await mintTX.wait(1)
    console.log(`Basic NFT index 0 tokenURI: ${await basicNft.tokenURI(0)}`)
}

module.exports.tags = ["all", "mint"]
