import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Flex } from '@chakra-ui/react'

function Layout({ children }) {
  return (
    <Flex
        h="100vh"
        w="100%"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        bgColor="#000"
        color="#fff"
    >
        <Header />
        <Flex 
          grow="1"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
        >
          {children}
        </Flex>
        <Footer />
    </Flex>
  )
}

export default Layout