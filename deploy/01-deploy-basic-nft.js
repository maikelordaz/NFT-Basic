const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("--------------- Deploying Basic NFT Contract... ---------------")

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : network.config.blockConfirmations

    const args = []

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    log("--------------- Basic NFT Contract Deployed! ---------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("--------------- Verifying!... --------------- ")
        await verify(basicNft.address, args)
        log("--------------- Veryfy process finished! ---------------")
    }
}

module.exports.tags = ["all", "basicnft", "main"]
