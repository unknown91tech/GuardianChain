

import Image from "next/legacy/image"
import Link from "next/link"

export default function Card({course, Footer}:any) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex h-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            layout="fixed"
            width="200"
            height="281"
            alt={course.title}
          />
        </div>
        <div className="p-8">
          <div
            className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type} 
          </div>
          <Link href={`/courses/${course.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
          </Link>
          <p
            className="mt-2 text-gray-500">
            {course.description}
          </p>
          { Footer &&
            <Footer />
          }
        </div>
      </div>
    </div>
  )
}