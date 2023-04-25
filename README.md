# Ben-BK-minting-DAPP

Welcome to this GitHub repo that will allow you to easily launch your collection of NFTs (Smart Contract and Minting WebSite).

## Partie Smart Contract (./backend)

This DApp uses the Hardhat-deploy plugin.

Launching the local Blockchain and deploying smarts contracts on the local Blockchain:

```yarn hardhat node```

Launch the tests and the coverage:

```yarn hardhat coverage```

Deploy on Goerli (Contract verification is automatic) :

```yarn hardhat deploy --network goerli```

Deploy on the Mainnet (Contract verification is automatic) (at your own risk, understand what you are doing here, we will not take any responsibility in case of loss of your Ethers) :

```yarn hardhat deploy --network mainnet```

## Partie Site de Mint (./frontend)

First launch the local blockchain hardhat (folder ./backend) :

```yarn hardhat node```

Then in another terminal, run the command (folder ./frontend) :

```yarn dev```

Go on ```localhost:3000``` and enjoy.

