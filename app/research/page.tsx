import { getResearchProjects, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Research Projects',
  description: 'Current and completed research projects in low-latency networking, web performance, and next-generation mobile technologies',
};

export default async function ResearchPage() {
  let projects = [];

  try {
    const response: any = await getResearchProjects();
    projects = response.data || [];
  } catch (error) {
    console.error('Error fetching research projects:', error);
  }

  // Group projects by status
  const statusOrder = ['ongoing', 'completed', 'planning', 'published', 'suspended'];
  const groupedProjects = projects.reduce((acc: any, project: any) => {
    const status = project.attributes.projectStatus;
    if (!acc[status]) acc[status] = [];
    acc[status].push(project);
    return acc;
  }, {});

  const statusLabels: Record<string, string> = {
    ongoing: 'Ongoing Projects',
    completed: 'Completed Projects',
    planning: 'In Planning',
    published: 'Published',
    suspended: 'Suspended',
  };

  // Neutral status colors - subtle grays only
  const statusColors: Record<string, string> = {
    ongoing: 'bg-gray-100 text-gray-800 border border-gray-200',
    completed: 'bg-gray-50 text-gray-700 border border-gray-200',
    planning: 'bg-white text-gray-600 border border-gray-300',
    published: 'bg-gray-100 text-gray-700 border border-gray-200',
    suspended: 'bg-white text-gray-500 border border-gray-200',
  };

  return (
    <div className="bg-white">
      {/* Header Section - generous top padding */}
      <section className="pt-32 pb-16 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Research Projects
          </h1>
          <p
            className="text-xl text-gray-600 leading-relaxed max-w-3xl"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Exploring low-latency networking, web performance optimization, and next-generation mobile technologies through collaborative research initiatives.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="container mx-auto max-w-6xl px-6">
        {projects.length === 0 ? (
          <section className="py-24">
            <p className="text-gray-500 text-center" style={{ fontFamily: 'Crimson Pro, serif' }}>
              No research projects available yet.
            </p>
          </section>
        ) : (
          statusOrder.map((status) => {
            const statusProjects = groupedProjects[status];
            if (!statusProjects || statusProjects.length === 0) return null;

            return (
              <section key={status} className="py-16">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-12"
                  style={{ fontFamily: 'Crimson Pro, serif' }}
                >
                  {statusLabels[status] || status}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {statusProjects.map((project: any) => (
                    <article
                      key={project.id}
                      className="group bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200"
                    >
                      {/* Project Image */}
                      {project.attributes.featuredImage?.data && (
                        <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                          <Image
                            src={
                              getStrapiMedia(
                                project.attributes.featuredImage.data.attributes.url
                              ) || ''
                            }
                            alt={project.attributes.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Project Content */}
                      <div className="p-8">
                        {/* Status and Featured Badges */}
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className={`text-xs px-3 py-1 uppercase tracking-wide font-medium ${
                              statusColors[status] || 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {status}
                          </span>
                          {project.attributes.isFeatured && (
                            <span
                              className="text-xs px-3 py-1 uppercase tracking-wide font-medium bg-gray-900 text-white"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Project Title */}
                        <h3
                          className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors"
                          style={{ fontFamily: 'Crimson Pro, serif' }}
                        >
                          <Link href={`/research/${project.attributes.slug}`}>
                            {project.attributes.title}
                          </Link>
                        </h3>

                        {/* Principal Investigator */}
                        {project.attributes.principalInvestigator && (
                          <p
                            className="text-sm text-gray-600 mb-3"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <span className="text-gray-500">Principal Investigator:</span>{' '}
                            {project.attributes.principalInvestigator}
                          </p>
                        )}

                        {/* Project Duration */}
                        <div
                          className="text-sm text-gray-500 mb-4"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {new Date(project.attributes.startDate).getFullYear()}
                          {project.attributes.endDate &&
                            ` – ${new Date(project.attributes.endDate).getFullYear()}`}
                        </div>

                        {/* Short Description */}
                        {project.attributes.shortDescription && (
                          <p
                            className="text-base text-gray-700 leading-relaxed mb-4 line-clamp-3"
                            style={{ fontFamily: 'Crimson Pro, serif' }}
                          >
                            {project.attributes.shortDescription}
                          </p>
                        )}

                        {/* Funding Information */}
                        {project.attributes.fundingSource && (
                          <div
                            className="text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <span className="text-gray-500">Funded by:</span>{' '}
                            {project.attributes.fundingSource}
                            {project.attributes.fundingAmount && (
                              <span className="ml-1 text-gray-700 font-medium">
                                ({project.attributes.currency}{' '}
                                {project.attributes.fundingAmount.toLocaleString()})
                              </span>
                            )}
                          </div>
                        )}

                        {/* View Project Link */}
                        <Link
                          href={`/research/${project.attributes.slug}`}
                          className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          View Project Details
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="pb-24"></div>
    </div>
  );
}
