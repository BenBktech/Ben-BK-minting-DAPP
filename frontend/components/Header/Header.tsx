import React from 'react'
import { Flex, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        p="2rem"
    >
        <Text>
            Logo
        </Text>
        <ConnectButton />
    </Flex>
  )
}

export default Header