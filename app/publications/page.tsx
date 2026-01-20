import { getPublications, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";

export const metadata = {
  title: 'Publications',
  description: 'Research publications, journal articles, and conference papers',
};

export default async function PublicationsPage() {
  let publications = [];
  let error = null;

  try {
    const response: any = await getPublications();
    console.log('Publications API Response:', response);
    publications = response?.data || [];
    console.log('Publications count:', publications.length);
  } catch (err: any) {
    console.error('Error fetching publications:', err);
    error = err.message;
  }

  // Group publications by type
  const groupedPublications = publications.reduce((acc: any, pub: any) => {
    const type = pub?.attributes?.publicationType || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(pub);
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    journal: 'Journal Articles',
    conference: 'Conference Papers',
    'book-chapter': 'Book Chapters',
    book: 'Books',
    preprint: 'Preprints',
    thesis: 'Theses',
    patent: 'Patents',
    other: 'Other Publications',
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Publications
          </h1>
          <p
            className="text-xl text-gray-600 leading-relaxed max-w-3xl"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Research publications, journal articles, and scholarly works in networking, web performance, and mobile technologies.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-6">
        {error && (
          <div className="mt-8 bg-gray-50 border border-gray-200 text-gray-700 px-6 py-4">
            Error loading publications: {error}
          </div>
        )}

        {publications.length === 0 ? (
          <section className="py-24">
            <p className="text-gray-500 text-center" style={{ fontFamily: 'Crimson Pro, serif' }}>
              No publications available yet.
            </p>
          </section>
        ) : (
          <>
            <div className="py-8 text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              {publications.length} publication{publications.length !== 1 ? 's' : ''}
            </div>

            {Object.entries(groupedPublications).map(([type, pubs]: [string, any]) => (
              <section key={type} className="py-12 border-t border-gray-100 first:border-0">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8"
                  style={{ fontFamily: 'Crimson Pro, serif' }}
                >
                  {typeLabels[type] || type}
                </h2>

                <div className="space-y-8">
                  {pubs.map((pub: any) => (
                    <article
                      key={pub.id}
                      className="border-l-2 border-gray-200 pl-6 hover:border-gray-400 transition-colors"
                    >
                      <h3
                        className="text-2xl font-semibold text-gray-900 mb-3"
                        style={{ fontFamily: 'Crimson Pro, serif' }}
                      >
                        <Link
                          href={`/publications/${pub.attributes.slug}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          {pub.attributes.title}
                        </Link>
                      </h3>

                      <p
                        className="text-base text-gray-600 mb-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {pub.attributes.authors}
                      </p>

                      <p
                        className="text-base text-gray-500 italic mb-4"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {pub.attributes.journalName}
                        {pub.attributes.volume && `, Vol. ${pub.attributes.volume}`}
                        {pub.attributes.issue && ` (${pub.attributes.issue})`}
                        {pub.attributes.pages && `, pp. ${pub.attributes.pages}`}
                        {pub.attributes.publicationDate && (
                          <span> • {new Date(pub.attributes.publicationDate).getFullYear()}</span>
                        )}
                      </p>

                      {pub.attributes.doi && (
                        <p
                          className="text-sm text-gray-600 mb-4"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          DOI:{' '}
                          <a
                            href={`https://doi.org/${pub.attributes.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-300"
                          >
                            {pub.attributes.doi}
                          </a>
                        </p>
                      )}

                      <div className="flex flex-wrap gap-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {pub.attributes.url && (
                          <a
                            href={pub.attributes.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            View Online →
                          </a>
                        )}
                        {pub.attributes.pdfFile?.data && (
                          <a
                            href={getStrapiMedia(pub.attributes.pdfFile.data.attributes.url) || ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            Download PDF →
                          </a>
                        )}
                        {pub.attributes.citations && (
                          <span className="text-gray-500">
                            {pub.attributes.citations} citations
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="pb-24"></div>
    </div>
  );
}
