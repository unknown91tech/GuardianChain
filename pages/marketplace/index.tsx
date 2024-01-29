/* eslint-disable react/no-unescaped-entities */

import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@/components/ui/content/courses/fetcher"
import {  useOwnedCourses, useWalletInfo } from "@/components/hooks/web3"
import {  Button, Loader, Message } from "@/components/ui/common"
import { OrderModal } from "@/components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@/components/ui/marketplace"
import { useWeb3 } from "@/components/providers"
import { toast } from 'react-toastify'


export default function Marketplace({courses}:any) {

  const {web3, contract, requireInstall} =useWeb3()
  const [selectedCourse , setSelectedCourse] = useState(null)
  const {hasConnectedWallet, isConnecting , account}:any = useWalletInfo()
  const {ownedCourses} = useOwnedCourses(courses , account.data)
  const [isNewPurchase, setIsNewPurchase] = useState(true)


  const purchaseCourse =async (order: any) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)

    const orderHash = web3.utils.soliditySha3(
      {type:"bytes16" , value: hexCourseId},
      {type:"address" , value: account.data}
    )

    

    const value = web3.utils.toWei(String(order.price))
    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email)
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      )

      _purchaseCourse(hexCourseId, proof, value)
    } else {
      _repurchaseCourse(orderHash, value)
    }
  }

  const _purchaseCourse = async (hexCourseId: any, proof: any, value: any) => {
    try{
     const result= await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value})

      console.log( result)
    }
    catch{
      console.log("Purchase Course: Opertaion falied!!")
    }



    //courseHash + emailHash
  }

  const _repurchaseCourse = async (courseHash: any, value: any) => {
    try {
      const result = await contract.methods.repurchaseCourse(
        courseHash
      ).send({from: account.data, value})
      console.log(result)
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  const notify = () => {
    //const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve("world"), 3000));
    const resolveWithSomeData = new Promise(
     (resolve, reject) => setTimeout(() => reject(new Error("Some Error")), 3000))
    toast.promise(
        resolveWithSomeData,
        {
          pending: {
            render(){
              return "I'm loading"
            },
            icon: <Loader size="sm"/>,
          },
          success: {
            render({data}){
              return `Hello ${data}`
            },
            // other options
            icon: "🟢",
          },
          error: {
            render({data}){
              // When the promise reject, data will contains the error
              return <div>{data.message ?? "Transaction has failed"}</div>
            }
          }
        }
    )
  }

 

  return (
    <>
     
       <MarketHeader/>
       <Button onClick={notify}>
        Notify!
      </Button>
      <CourseList
        courses={courses}
      >
      {(course: any) =>
      {
        const owned = ownedCourses.lookup[course.id]
        return(
          <CourseCard
            key={course.id}
            course={course}
            state={owned?.state}
            disabled={!hasConnectedWallet}
            Footer={() =>
              {
                if(requireInstall){
                  return (
                    // <div className="mt-4">
                      <Button variant="lightPurple" 
                              disabled={true}
                              size="sm"
                              >
                        Install
                      </Button>
                    // </div>
                  )
                }

                if(isConnecting){
                  return (
                    // <div className="mt-4">
                      <Button variant="lightPurple" 
                              disabled={true}
                              size="sm"
                              >
                        <Loader size="sm"/>
                      </Button>
                    // </div>
                  )
                }

                if(!ownedCourses.hasInitialResponse){
                  return (
                    <div style={{height: "42px"}}></div>
                  )
                }

                

                if(owned) {
                  return (
                    <>
                    <div className="flex">
                      <Button
                        
                        size="sm"
                        variant="green">
                        Owned <span > &#10003;</span> 
                      </Button>
                      {
                        owned.state ==="deactivated" &&
                        <Button
                        disabled={false}
                        size="sm"
                        onClick={() => {
                          setIsNewPurchase(false)
                          setSelectedCourse(course)
                        }}
                        variant="blue">
                        Reactivate
                      </Button>
                      }
                    </div>
                  </>
                )
              }


              return (
                // <div className="mt-4">
                  <Button variant="lightPurple" 
                          disabled={!hasConnectedWallet}
                          size="sm"
                          onClick= {() => setSelectedCourse(course)}
                          >
                    Purchase
                  </Button>
                // </div>
              )
            }
            
          }
        />
        )
      }
      }
      </CourseList>
      { selectedCourse &&
        <OrderModal course={selectedCourse} 
                    isNewPurchase={isNewPurchase}
                    onSubmit={purchaseCourse}
                    onClose={() => {
                      setSelectedCourse(null)
                      setIsNewPurchase(true)
                    }} />
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