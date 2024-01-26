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

  const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]
export const handler = (web3:any , provider:any) => () => {
    const {data , mutate, ...rest}=useSWR(() => 
        web3? "web3/network": null,
        async() => {
            const chainId =await web3.eth.getChainId()
            if (!chainId) {
                throw new Error("Cannot retreive network. Please refresh the browser.")
              }
            return NETWORKS[chainId]
        }
    )

    useEffect(() => {
    const mutator = (chainId: string) => mutate(NETWORKS[parseInt(chainId, 16)])
    provider?.on("chainChanged", mutator)

    return () => {
      provider?.removeListener("chainChanged", mutator)
    }
  }, [provider])

    return {
        
            mutate,
            
            data,
            target: targetNetwork,
            isSupported:data===targetNetwork,
            ...rest
        
    }
}