/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import useSWR from "swr"


const NETWORKS:any = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    137: "Polygon Main Network",
    1337: "Ganache",
    11155111: "Sepolia Test Network",
  }

  const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string]
export const handler = (web3:any ) => () => {
    const {data ,  ...rest}=useSWR(() => 
        web3? "web3/network": null,
        async() => {
            const chainId =await web3.eth.getChainId()
            if (!chainId) {
                throw new Error("Cannot retreive network. Please refresh the browser.")
              }
            return NETWORKS[chainId]
        }
    )


    return {  
            data,
            target: targetNetwork,
            isSupported:data===targetNetwork,
            ...rest
        
    }
}