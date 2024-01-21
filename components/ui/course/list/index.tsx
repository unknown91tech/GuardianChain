/* eslint-disable @next/next/no-img-element */

import { Key} from "react";
import Image from 'next/legacy/image'
import Link from "next/link";


export default function List({courses}:any) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      { courses.map((course: {
        slug: any; id: Key | null ;
                               coverImage: string ; 
                              title: string; 
                              type: string | number ; 
                              description: string | number |null ; }) =>
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="flex h-full">
            <div className="flex h-full ">
              <Image
                className="object-cover"
                src={course.coverImage}
                layout="fixed"
                width="200"
                height="230"
                alt={course.title}
              />
            </div>
            <div className="p-4">
              <div
                className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {course.type}
              </div>
              <Link href={`/courses/${course.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline" >
                
                  {course.title}
                
              </Link>
              <p
                className="mt-2 text-gray-500">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}