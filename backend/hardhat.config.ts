import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY  || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY  || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1,
      blockConfirmations: 6
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 5,
      blockConfirmations: 6
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
        default: 0,
        1: 0,
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.19"
      },
    ]
  }
};

export default config;
