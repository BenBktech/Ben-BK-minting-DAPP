# Ben-BK-minting-DAPP

Bienvenue sur ce repo GitHub qui vous permettra très simplement de lancer votre collection de NFTs (Smart Contract et Site de Mint).

## Partie Smart Contract (./backend)

Cette DApp utilise le plugin Hardhat-deploy.

Lancer la Blockchain locale et déployer les smarts contracts sur la Blockchain locale :

```yarn hardhat node```

Lancer les tests et le coverage :

```yarn hardhat coverage```

Déployer sur Goerli (La vérification du contrat est automatique) :

```yarn hardhat deploy --network goerli```

Déployer sur le le Mainnet (La vérification du contrat est automatique) (à vos risques et périls, comprenez bien ce que vous faites ici, nous ne prendrons aucune responsabilité en cas de perte de vos Ethers) :

```yarn hardhat deploy --network mainnet```
