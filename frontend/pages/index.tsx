import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { Text, useToast } from '@chakra-ui/react'
import * as abiInfos from '../constants'
import { ethers } from 'ethers'

export default function Home() {

  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const { data: signer } = useSigner()
  const toast = useToast()

  const [saleStartTimeDateFormat, setSaleStartTimeDateFormat] = useState<string>("")
  const [totaSupply, setTotalSupply] = useState<number | null>(null)


  useEffect(() => {
    setSaleStartTimeDateFormat(calculateSaleStartDate())
    getDatas()
  }, [])

  const getDatas = async() => {
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, abiInfos.abi, provider);
    console.log(contract)
  }

  const calculateSaleStartDate = (): string => {
    let a = new Date(process.env.NEXT_PUBLIC_SALESTARTTIME * 1000);
    let months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = date + ' ' + month + ' ' + year + ' à ' + hour + 'h' + min
    return time;
  }

  return (
    <>
      <Head>
        <title>My Minting DApp</title>
        <meta name="description" content="GA minting DApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {isConnected ? (
          Math.floor(Date.now() / 1000) > parseInt(process.env.NEXT_PUBLIC_SALESTARTTIME) ? (
            <Text>Commencé</Text>
          ) : (
            <Text>La vente commence le {saleStartTimeDateFormat}.</Text>
          )
        ) : (
          <Text>Merci de connecter votre Wallet.</Text>
        )}
      </Layout>
    </>
  )
}
