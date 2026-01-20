import { getResearchProjects, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Research Projects',
  description: 'Current and completed research projects',
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

  const statusColors: Record<string, string> = {
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    planning: 'bg-yellow-100 text-yellow-800',
    published: 'bg-purple-100 text-purple-800',
    suspended: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">Research Projects</h1>
      <p className="text-gray-600 mb-12">
        Explore our ongoing and completed research initiatives
      </p>

      {projects.length === 0 ? (
        <p className="text-gray-500">No research projects available yet.</p>
      ) : (
        statusOrder.map((status) => {
          const statusProjects = groupedProjects[status];
          if (!statusProjects || statusProjects.length === 0) return null;

          return (
            <section key={status} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{statusLabels[status] || status}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statusProjects.map((project: any) => (
                  <article
                    key={project.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {project.attributes.featuredImage?.data && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={
                            getStrapiMedia(
                              project.attributes.featuredImage.data.attributes.url
                            ) || ''
                          }
                          alt={project.attributes.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            statusColors[status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {status}
                        </span>
                        {project.attributes.isFeatured && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        <Link
                          href={`/research/${project.attributes.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {project.attributes.title}
                        </Link>
                      </h3>

                      {project.attributes.principalInvestigator && (
                        <p className="text-sm text-gray-600 mb-2">
                          PI: {project.attributes.principalInvestigator}
                        </p>
                      )}

                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(project.attributes.startDate).getFullYear()}
                        {project.attributes.endDate &&
                          ` - ${new Date(project.attributes.endDate).getFullYear()}`}
                      </div>

                      {project.attributes.fundingSource && (
                        <p className="text-sm text-gray-600 mb-3">
                          Funded by: {project.attributes.fundingSource}
                          {project.attributes.fundingAmount && (
                            <span className="ml-1">
                              ({project.attributes.currency}{' '}
                              {project.attributes.fundingAmount.toLocaleString()})
                            </span>
                          )}
                        </p>
                      )}

                      <Link
                        href={`/research/${project.attributes.slug}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View Project →
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
  );
}
