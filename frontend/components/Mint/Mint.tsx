import React, { useState } from 'react'
import { Flex, Text, Image, Button, useToast, Spinner } from '@chakra-ui/react';
import * as abiInfos from '../../constants'
import { ethers } from 'ethers'
import { useSigner } from 'wagmi'

function Mint({ getDatas, totalSupply }) {

    const { data: signer } = useSigner()
    const toast = useToast()

    const [isMinting, setIsMinting] = useState<boolean>()

    const Mint = async(numberOfNFTs: number) => {
        setIsMinting(true)
        try {
            let overrides = {
                value: ethers.utils.parseEther(process.env.NEXT_PUBLIC_PRICE).mul(numberOfNFTs)
            }
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, abiInfos.abi, signer);
            let transaction = await contract.mint(numberOfNFTs, overrides)
            await transaction.wait()
            getDatas()
            toast({
                title: 'Congratulations',
                description: "Your NFT(s) have been minted!",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        catch(e) {
            console.log(e)
            toast({
                title: 'Error',
                description: "An error occured, please try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setIsMinting(false)
    }

    return (
        <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            p="2rem"
        >
            {isMinting ? (
                <Flex
                    alignItems="center"
                >
                    <Spinner color='pink.500' size='xl'  />
                    <Text ml="1rem" fontSize="32px">We are minting your NFT(s) :D !</Text>
                </Flex>
            ) : (
                <Flex
                    w="100%"
                    h="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex
                        width="50%"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontSize="24px">NFTs Sold : {totalSupply} / {process.env.NEXT_PUBLIC_MAXSUPPLY}</Text>
                        <Text mt="1rem" fontSize="16px">Each NFT costs {process.env.NEXT_PUBLIC_PRICE} ETH (excluding gas fees)</Text>
                        <Flex
                            mt="1rem"
                        >
                            <Button colorScheme='pink' onClick={() => Mint(1)}>Mint 1 NFT</Button>
                            <Button ml="1rem" colorScheme='pink' onClick={() => Mint(2)}>Mint 2 NFTs</Button>
                            <Button ml="1rem" colorScheme='pink' onClick={() => Mint(3)}>Mint 3 NFTs</Button>
                        </Flex>
                    </Flex>
                    <Flex
                        width="50%"
                    >
                        <Image src='imgMint.png' alt='Dan Abramov' width="70%" />
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}

export default Mint