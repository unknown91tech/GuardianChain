const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "@utils/loadContract"
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
const Web3Context = createContext(null)

const setListeners = (provider:any) => {
  provider.on("chainChanged", (_: any) => window.location.reload())
}

const createWeb3State = ({web3, provider, contract, isLoading}:any) => {
  return {
    web3,
    provider,
    contract, 
    isLoading,
    hooks: setupHooks({provider , web3 , contract })
  }
}

export default function Web3Provider({children}:any) {
  const [web3Api, setWeb3Api] = useState(createWeb3State({web3:null , provider:null, contract:null , isLoading: true}))
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      if (provider) {
        const web3= new Web3(provider as any)
        const contract = await loadContract("CourseMarketplace", web3)
        setListeners(provider)

        setWeb3Api(createWeb3State({web3, provider , contract , isLoading: false}))
      } else {
        setWeb3Api((api:any) => ({...api, isLoading: false}))
        console.error("Please, install Metamask.")
      }
    }
    loadProvider()
  }, [])
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3 ,
      connect: provider ?
        async () => {
          try {
            await provider.request({method: "eth_requestAccounts"})
          } catch {
            location.reload()
          }
        } :
        () => console.error("Cannot connect to Metamask, try to reload your browser please.")
    }
  }, [web3Api])
  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}
export function useWeb3() {
  return useContext(Web3Context)
}
export function useHooks(cb:any) {
  const { hooks } = useWeb3()
  return cb(hooks)
}