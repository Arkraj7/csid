import Link from 'next/link';
import Image from 'next/image';
// Update the import path to point to your new 'data' folder
import { courses } from '@/app/courses/components/data';

export default function CoursePreviewSection() {
  // Grab the latest 3 courses to feature on the homepage
  const featuredCourses = courses.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Programs</h2>
          <p className="mt-4 text-xl text-gray-600">
            Expand your expertise with our industry-leading sustainability courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Course Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={course.image || '/assets/images/no_image.png'}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{course.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>

                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <Link
                  href={`/courses/${course.id}`}
                  className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/courses" className="text-green-600 font-semibold hover:text-green-800">
            View all courses &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
