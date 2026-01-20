import { getCourses } from '@/lib/strapi';

interface Course {
  id: number;
  attributes: {
    courseCode: string;
    courseName: string;
    description?: string;
    semester: string;
    year: string;
    yearRange?: string;
    credits?: number;
    level: string;
    courseUrl?: string;
    institution: string;
    role: string;
    topics?: string[];
    isCurrent: boolean;
  };
}

interface CoursesResponse {
  data: Course[];
}

export default async function TeachingPage() {
  let courses: Course[] = [];

  try {
    const response = await getCourses() as CoursesResponse;
    courses = response.data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

  // Group courses by current/past
  const currentCourses = courses.filter(c => c.attributes.isCurrent);
  const pastCourses = courses.filter(c => !c.attributes.isCurrent);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Teaching
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Courses I teach focusing on Computer Networking and Internet of Things
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-4xl">

          {/* Current Courses */}
          {currentCourses.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Current Courses
              </h2>
              <div className="space-y-6">
                {currentCourses.map((course) => (
                  <CourseCard key={course.id} course={course.attributes} />
                ))}
              </div>
            </div>
          )}

          {/* Past Courses */}
          {pastCourses.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentCourses.length > 0 ? 'Past Courses' : 'Courses Taught'}
              </h2>
              <div className="space-y-6">
                {pastCourses.map((course) => (
                  <CourseCard key={course.id} course={course.attributes} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No courses available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CourseCard({ course }: { course: Course['attributes'] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {course.courseCode}
            </h3>
            {course.isCurrent && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Current
              </span>
            )}
          </div>
          <p className="text-lg text-gray-700 font-medium mb-2">
            {course.courseName}
          </p>
        </div>

        <div className="text-sm text-gray-600 md:text-right">
          <div className="font-medium">
            {course.semester} {course.yearRange || course.year}
          </div>
          {course.institution && (
            <div className="text-gray-500">{course.institution}</div>
          )}
        </div>
      </div>

      {course.description && (
        <p className="text-gray-600 mb-4 leading-relaxed">
          {course.description}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {course.role && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{course.role}</span>
          </div>
        )}

        {course.level && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{course.level}</span>
          </div>
        )}

        {course.credits && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>{course.credits} credits</span>
          </div>
        )}
      </div>

      {course.topics && Array.isArray(course.topics) && course.topics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {course.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {course.courseUrl && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a
            href={course.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
          >
            View Course Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
