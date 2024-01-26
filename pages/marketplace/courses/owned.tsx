import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { Button, Message } from "@/components/ui/common";
import { getAllCourses } from "@/components/ui/content/courses/fetcher";
import { OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { useRouter } from "next/router";
import Link from "next/link";
 

 export default function OwnedCourses({courses}:any) {

  const router = useRouter()
  const { account } = useAccount()
  const { ownedCourses } = useOwnedCourses(courses, account.data)

    return (
        <>
        <MarketHeader/>

        <section className="grid grid-cols-1 max-h-max ">
        { ownedCourses.isEmpty &&
          // <div className="w-1/2">
            <Message type="warning">
              <div>You don't own any courses</div>
              <Link href="/marketplace" legacyBehavior>
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          // </div>
        }
          {ownedCourses.data?.map((course:any) => 
              <OwnedCourseCard 
                key= {course.id}
                course ={course}
              >
              
              <Button
              onClick={() => router.push(`/courses/${course.slug}`)}
              >
                Watch the course
              </Button>
            </OwnedCourseCard>
          )}
        
        </section>
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

 OwnedCourses.Layout = BaseLayout