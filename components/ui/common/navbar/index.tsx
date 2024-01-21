

import { useWeb3 } from "@/components/providers"
import Link from "next/link"
import { Button } from "@components/ui/common"
import { useAccount } from "@/components/web3/hooks/useAccount"


export default function Footer() {

  const {connect, isWeb3Loaded , isLoading}:any = useWeb3()

  const {account} =useAccount()

    return (
      <section>
        {account}
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative" aria-label="Global">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</Link>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</Link>
              </div>
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlish</Link>
                {
                  isLoading ?
                  <Button 
                  disabled={true}
                    onClick={connect}>
                    Loading...
                  </Button>:
                  isWeb3Loaded?
                    account?
                    <Button className="cursor-default " hoverable>
                      Hi there
                    </Button>:
                      <Button 
                        onClick={connect}>
                        Connect
                      </Button>
                  :
                  <Button 
                    onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                    Install MetaMask
                  </Button>

                }
                
                
              </div>
            </div>
          </nav>
        </div>
      </section>
    )
  }