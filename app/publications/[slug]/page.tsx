import { getPublication, getPublications, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PublicationPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {

  try {
    const publications: any = await getPublications();
    return (publications.data || []).map((pub: any) => ({
      slug: pub.attributes.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for publications:', error);
    return [];
  }

}

export default async function PublicationPage({ params }: PublicationPageProps) {
  let publication: any = null;

  try {
    const response: any = await getPublication(params.slug);
    publication = response?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching publication:', error);
  }

  if (!publication) {
    notFound();
  }

  const attrs = publication.attributes;

  return (
    <div className="container py-12">
      {/* Back Link */}
      <Link
        href="/publications"
        className="text-primary hover:underline mb-6 inline-block"
      >
        ← Back to Publications
      </Link>

      {/* Publication Header */}
      <article className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{attrs.title}</h1>

        {/* Authors */}
        <p className="text-lg text-gray-600 mb-4">{attrs.authors}</p>

        {/* Publication Info */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {attrs.journalName && (
              <div>
                <span className="font-semibold text-gray-700">Published in:</span>
                <p className="text-gray-900">{attrs.journalName}</p>
              </div>
            )}

            {attrs.publicationDate && (
              <div>
                <span className="font-semibold text-gray-700">Date:</span>
                <p className="text-gray-900">
                  {new Date(attrs.publicationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            {(attrs.volume || attrs.issue) && (
              <div>
                <span className="font-semibold text-gray-700">Volume/Issue:</span>
                <p className="text-gray-900">
                  {attrs.volume && `Vol. ${attrs.volume}`}
                  {attrs.volume && attrs.issue && ', '}
                  {attrs.issue && `Issue ${attrs.issue}`}
                </p>
              </div>
            )}

            {attrs.pages && (
              <div>
                <span className="font-semibold text-gray-700">Pages:</span>
                <p className="text-gray-900">{attrs.pages}</p>
              </div>
            )}

            {attrs.doi && (
              <div>
                <span className="font-semibold text-gray-700">DOI:</span>
                <p className="text-gray-900">
                  <a
                    href={`https://doi.org/${attrs.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {attrs.doi}
                  </a>
                </p>
              </div>
            )}

            {attrs.citations && (
              <div>
                <span className="font-semibold text-gray-700">Citations:</span>
                <p className="text-gray-900">{attrs.citations}</p>
              </div>
            )}

            {attrs.impactFactor && (
              <div>
                <span className="font-semibold text-gray-700">Impact Factor:</span>
                <p className="text-gray-900">{attrs.impactFactor}</p>
              </div>
            )}

            {attrs.publisher && (
              <div>
                <span className="font-semibold text-gray-700">Publisher:</span>
                <p className="text-gray-900">{attrs.publisher}</p>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {attrs.publicationType}
            </span>
            {attrs.isOpenAccess && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Open Access
              </span>
            )}
            {attrs.isFeatured && (
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Keywords */}
        {attrs.keywords && Array.isArray(attrs.keywords) && attrs.keywords.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {attrs.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Abstract */}
        {attrs.abstract && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Abstract</h2>
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: attrs.abstract }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-8">
          {attrs.url && (
            <a
              href={attrs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
            >
              View Online
            </a>
          )}
          {attrs.pdfFile?.data && (
            <a
              href={getStrapiMedia(attrs.pdfFile.data.attributes.url) || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Download PDF
            </a>
          )}
          {attrs.doi && (
            <a
              href={`https://doi.org/${attrs.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              View on Publisher Site
            </a>
          )}
        </div>

        {/* Related Project */}
        {attrs.relatedProject?.data && (
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Related Research Project</h2>
            <Link
              href={`/research/${attrs.relatedProject.data.attributes.slug}`}
              className="text-primary hover:underline text-lg font-semibold"
            >
              {attrs.relatedProject.data.attributes.title}
            </Link>
            {attrs.relatedProject.data.attributes.description && (
              <p className="text-gray-700 mt-2">
                {attrs.relatedProject.data.attributes.description}
              </p>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: PublicationPageProps) {
  try {
    const response: any = await getPublication(params.slug);
    const publication = response?.data?.[0];

    if (!publication) {
      return {
        title: 'Publication Not Found',
      };
    }

    return {
      title: publication.attributes.title,
      description: publication.attributes.abstract?.substring(0, 160) ||
        `Publication by ${publication.attributes.authors}`,
    };
  } catch (error) {
    return {
      title: 'Publication',
    };
  }
}
