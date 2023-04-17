import { network } from "hardhat"
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from '../utils/verify';
import { NFT } from '../typechain-types/contracts/NFT.sol';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    let NFT: NFT
    let args = [];

    NFT = await deploy('NFT', {
		from: deployer,
		args: args,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

    console.log(`Contract NFT deployed at address ${NFT.address}`)

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(NFT.address, args)
    }

};
export default func;
func.tags = ['all', 'nftiserc721a'];