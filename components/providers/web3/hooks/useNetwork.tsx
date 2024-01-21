/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import useSWR from "swr"


export const handler = (web3:any , provider:any) => () => {
    const {mutate, ...rest}=useSWR(() => 
        web3? "web3/network": null,
        async() => {
            const netId =await web3.eth.net.getId()
            return netId
        }
    )

    useEffect(() => {
        provider && 
        provider.on("chainChanged" , (netId: any) => mutate(netId))
    },[web3])

    return {
        network:{
            mutate,
            ...rest
        }
    }
}