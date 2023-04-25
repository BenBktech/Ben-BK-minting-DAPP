# Ben-BK-minting-DAPP

![screenshot of the minting DApp](https://raw.githubusercontent.com/BenBktech/Ben-BK-minting-DAPP/main/frontend/public/screenshot.png)

Welcome to this GitHub repo that will allow you to easily launch your collection of NFTs (Smart Contract and Minting WebSite).

## Partie Smart Contract (./backend)

This DApp uses the Hardhat-deploy plugin.

Rename ./backend/.env.example to ./backend/.env and place the correct information.

```
MAINNET_RPC_URL=//GET THIS ON ALCHEMY.com
GOERLI_RPC_URL=//GET THIS ON ALCHEMY.com
PRIVATE_KEY=//YOUR PRIVATE KEY
ETHERSCAN_API_KEY=//GO ON ETHERSCAN.IO, CREATE AN ACCOUNT AND GET A FREE API KEY
```

Rename ./frontend/.env.example to ./frontend/.env and place the correct information.

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3 //CHANGE THIS IF YOU DEPLOY ON GOERLI OR MAINNET
NEXT_PUBLIC_SALESTARTTIME=//WHEN THE SALE STARTS (TIMESTAMP)
NEXT_PUBLIC_MAXSUPPLY=//THE NUMBER OF NFTS IN THE COLLECTION
NEXT_PUBLIC_PRICE='0.001' //THE PRICE OF 1 NFT
```

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

