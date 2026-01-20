import { getResearchProject, getResearchProjects, getStrapiMedia } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response: any = await getResearchProject(params.slug);
    const project = response.data?.[0];

    if (!project) {
      return {
        title: "Project Not Found",
      };
    }

    return {
      title: project.attributes.title,
      description: project.attributes.shortDescription || "Research project details",
    };
  } catch (error) {
    return {
      title: "Project Not Found",
    };
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // Temporary: API is returning 403 Forbidden. Returning empty paths to allow build to pass.
  return [];
  /*
 try {
   const projects: any = await getResearchProjects();
   // If permission denied (403) or other error, projects might be undefined or error
   if (!projects || !projects.data) {
       console.warn('Warning: No research projects found or permission denied. Generating empty paths.');
       return [];
   }
   return projects.data.map((project: any) => ({
     slug: project.attributes.slug,
   }));
 } catch (error) {
   console.error('Error generating static params for research projects (likely 403 Forbidden):', error);
   // Return empty array to allow build to proceed even if permissions are broken
   return [];
 }
 */
}

export default async function ResearchProjectPage({ params }: Props) {
  let project: any = null;

  try {
    const response: any = await getResearchProject(params.slug);
    project = response.data?.[0];
  } catch (error) {
    console.error("Error fetching research project:", error);
  }

  if (!project) {
    notFound();
  }

  const attributes = project.attributes;

  // Parse team members if JSON
  let teamMembers: string[] = [];
  if (attributes.teamMembers) {
    try {
      teamMembers = typeof attributes.teamMembers === 'string'
        ? JSON.parse(attributes.teamMembers)
        : attributes.teamMembers;
    } catch (e) {
      teamMembers = [];
    }
  }

  // Parse keywords if JSON
  let keywords: string[] = [];
  if (attributes.keywords) {
    try {
      keywords = typeof attributes.keywords === 'string'
        ? JSON.parse(attributes.keywords)
        : attributes.keywords;
    } catch (e) {
      keywords = [];
    }
  }

  // Status color mapping
  const statusColors: Record<string, string> = {
    ongoing: 'bg-gray-100 text-gray-800 border border-gray-200',
    completed: 'bg-gray-50 text-gray-700 border border-gray-200',
    planning: 'bg-white text-gray-600 border border-gray-300',
    published: 'bg-gray-100 text-gray-700 border border-gray-200',
    suspended: 'bg-white text-gray-500 border border-gray-200',
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            href="/research"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Research
          </Link>

          {/* Status and Featured Badges */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className={`text-xs px-3 py-1 uppercase tracking-wide font-medium ${statusColors[attributes.projectStatus] ||
                'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {attributes.projectStatus}
            </span>
            {attributes.isFeatured && (
              <span
                className="text-xs px-3 py-1 uppercase tracking-wide font-medium bg-gray-900 text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            {attributes.title}
          </h1>

          {/* Short Description */}
          {attributes.shortDescription && (
            <p
              className="text-xl text-gray-600 leading-relaxed mb-8"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              {attributes.shortDescription}
            </p>
          )}

          {/* Meta Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
            {/* Principal Investigator */}
            {attributes.principalInvestigator && (
              <div>
                <dt
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Principal Investigator
                </dt>
                <dd
                  className="text-base text-gray-900 font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {attributes.principalInvestigator}
                </dd>
              </div>
            )}

            {/* Duration */}
            <div>
              <dt
                className="text-sm text-gray-500 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Duration
              </dt>
              <dd
                className="text-base text-gray-900 font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {new Date(attributes.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {attributes.endDate &&
                  ` – ${new Date(attributes.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}`}
              </dd>
            </div>

            {/* Funding Source */}
            {attributes.fundingSource && (
              <div>
                <dt
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Funding Source
                </dt>
                <dd
                  className="text-base text-gray-900 font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {attributes.fundingSource}
                </dd>
              </div>
            )}

            {/* Funding Amount */}
            {attributes.fundingAmount && (
              <div>
                <dt
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Funding Amount
                </dt>
                <dd
                  className="text-base text-gray-900 font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {attributes.currency} {attributes.fundingAmount.toLocaleString()}
                </dd>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {attributes.featuredImage?.data && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="relative w-full h-96 md:h-[32rem] bg-gray-50 border border-gray-200">
              <Image
                src={
                  getStrapiMedia(attributes.featuredImage.data.attributes.url) || ''
                }
                alt={attributes.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Description */}
          {attributes.description && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Overview
              </h2>
              <div
                className="prose prose-lg max-w-none"
                style={{ fontFamily: 'Crimson Pro, serif' }}
                dangerouslySetInnerHTML={{ __html: attributes.description }}
              />
            </div>
          )}

          {/* Objectives */}
          {attributes.objectives && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Research Objectives
              </h2>
              <div
                className="prose prose-lg max-w-none"
                style={{ fontFamily: 'Crimson Pro, serif' }}
                dangerouslySetInnerHTML={{ __html: attributes.objectives }}
              />
            </div>
          )}

          {/* Team Members */}
          {teamMembers.length > 0 && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Research Team
              </h2>
              <ul className="space-y-2">
                {teamMembers.map((member: string, index: number) => (
                  <li
                    key={index}
                    className="text-base text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    • {member}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords */}
          {keywords.length > 0 && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-50 text-gray-700 text-sm border border-gray-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Website Link */}
          {attributes.websiteUrl && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Project Website
              </h2>
              <a
                href={attributes.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-900 hover:border-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Visit Project Website
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          {/* Related Publications */}
          {attributes.publications?.data && attributes.publications.data.length > 0 && (
            <div className="pt-16 border-t border-gray-100">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Related Publications
              </h2>
              <div className="space-y-6">
                {attributes.publications.data.map((pub: any) => (
                  <article
                    key={pub.id}
                    className="border-l-2 border-gray-200 pl-6 hover:border-gray-400 transition-colors"
                  >
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-2"
                      style={{ fontFamily: 'Crimson Pro, serif' }}
                    >
                      <Link href={`/publications/${pub.attributes.slug}`}>
                        {pub.attributes.title}
                      </Link>
                    </h3>
                    <p
                      className="text-sm text-gray-600 mb-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {pub.attributes.authors}
                    </p>
                    {pub.attributes.journalName && (
                      <p
                        className="text-sm text-gray-500 italic"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {pub.attributes.journalName},{' '}
                        {new Date(pub.attributes.publicationDate).getFullYear()}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="pb-24"></div>
    </div>
  );
}
