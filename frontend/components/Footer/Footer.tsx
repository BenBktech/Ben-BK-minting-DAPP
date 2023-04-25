import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function Footer() {
  return (
    <Flex
        p="2rem"
    >
        <Text>&copy; All rights reserved, your brand {new Date().getFullYear()}</Text>
    </Flex>
  )
}

export default Footer