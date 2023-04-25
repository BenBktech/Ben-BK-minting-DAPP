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
        bgColor="#262626"
        color="#fff"
    >
        <Header />
        {children}
        <Footer />
    </Flex>
  )
}

export default Layout