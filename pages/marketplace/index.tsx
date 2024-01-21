/* eslint-disable react/no-unescaped-entities */

import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@/components/ui/content/courses/fetcher"
import { WalletBar, EthRates } from "@/components/ui/web3"
import { useAccount } from "@/components/hooks/web3"
import { useNetwork } from "@/components/hooks/web3"
import { Button } from "@/components/ui/common"
import { OrderModal } from "@/components/ui/order"
import { useState } from "react"
import { useEthPrice } from "@/components/hooks/web3/useEthPrice"


export default function Marketplace({courses}:any) {

  const [selectedCourse , setSelectedCourse] = useState(null)

    const {account} = useAccount()

    const {network} = useNetwork()

    const {eth} = useEthPrice()
  
  return (
    <>
      <div className="py-4">
        
        <WalletBar
            address= {account.data}
            network={{
              data: network.data,
              target: network.target,
              isSupported: network.isSupported,
              hasInitialResponse: network.hasInitialResponse
            }}
        />
        <EthRates
          eth={eth.data}
          ethPerItem={eth.perItem}
        />
        
      </div>
      <CourseList
        courses={courses}
      >
      {(course: any) =>
        <CourseCard
          key={course.id}
          course={course}
          Footer={() =>
            <div className="mt-4">
              <Button variant="lightPurple " 
                      onClick= {() => setSelectedCourse(course)}
                      >
                Purchase
              </Button>
            </div>
          }
        />
      }
      </CourseList>
      { selectedCourse &&
        <OrderModal course={selectedCourse} onClose= {()=> setSelectedCourse(null)} />
      }
    </>
  )
}
export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}
Marketplace.Layout = BaseLayout