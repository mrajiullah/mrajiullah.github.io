'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AcademicHero from '@/components/academic/AcademicHero';
import MetricCounter from '@/components/academic/MetricCounter';
import CitationCard from '@/components/academic/CitationCard';
import { getStrapiMedia } from '@/lib/strapi';

interface AcademicHomeProps {
  academicProfile: any;
  globalSettings: any;
  publications: any[];
  researchProjects: any[];
  totalCitations: number;
  totalFunding: number;
}

export default function AcademicHome({
  academicProfile,
  globalSettings,
  publications,
  researchProjects,
  totalCitations,
  totalFunding,
}: AcademicHomeProps) {
  const activeProjects = researchProjects.filter(
    (p: any) => p.attributes.projectStatus === 'active'
  );

  const featuredPublications = publications
    .filter((p: any) => p.attributes.isFeatured)
    .slice(0, 3);

  // Extract profile data from CMS
  const profile = academicProfile?.attributes || {};
  const profileImageUrl = profile.profileImage?.data?.attributes?.url
    ? getStrapiMedia(profile.profileImage.data.attributes.url)
    : null;

  // Build social links object
  const socialLinks: any = {};
  if (profile.googleScholarUrl) socialLinks.googleScholar = profile.googleScholarUrl;
  if (profile.researchGateUrl) socialLinks.researchGate = profile.researchGateUrl;
  if (profile.orcidUrl) socialLinks.orcid = profile.orcidUrl;
  if (profile.linkedinUrl) socialLinks.linkedin = profile.linkedinUrl;
  if (profile.twitterUrl) socialLinks.twitter = profile.twitterUrl;

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section - Now pulls from CMS */}
      <AcademicHero
        name={profile.name || 'Professor Name'}
        title={profile.title || 'Professor of Computer Science'}
        institution={profile.institution || 'University Name'}
        tagline={profile.tagline || 'Advancing the frontiers of Artificial Intelligence and Machine Learning for real-world impact'}
        profileImage={profileImageUrl || undefined}
        socialLinks={Object.keys(socialLinks).length > 0 ? socialLinks : undefined}
        email={profile.email || undefined}
      />

      {/* Metrics Dashboard */}
      <section className="py-16 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCounter
              value={publications.length}
              label="Publications"
              icon="📚"
              subtext="12 new this year"
            />
            <MetricCounter
              value={totalCitations}
              label="Citations"
              icon="📊"
              subtext="234 new citations"
            />
            <MetricCounter
              value={activeProjects.length}
              label="Active Projects"
              icon="🔬"
              subtext="Currently ongoing"
            />
            <MetricCounter
              value={totalFunding / 1000000}
              label="Funding"
              prefix="$"
              suffix="M"
              decimals={1}
              icon="💰"
              subtext="Total secured"
            />
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Research Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Exploring cutting-edge topics at the intersection of AI, healthcare, and computer vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                title: 'Artificial Intelligence',
                count: publications.filter((p: any) =>
                  p.attributes.researchArea === 'computer-science'
                ).length,
                description: 'Deep learning, neural networks, and intelligent systems',
              },
              {
                icon: '🏥',
                title: 'Medical Imaging',
                count: publications.filter((p: any) =>
                  p.attributes.researchArea === 'medicine'
                ).length,
                description: 'AI-driven diagnostics and treatment planning',
              },
              {
                icon: '👁️',
                title: 'Computer Vision',
                count: publications.filter((p: any) =>
                  p.attributes.researchArea === 'engineering'
                ).length,
                description: 'Image analysis, object detection, and visual recognition',
              },
              {
                icon: '🧠',
                title: 'Machine Learning',
                count: Math.floor(publications.length * 0.4),
                description: 'Algorithms, optimization, and statistical learning',
              },
              {
                icon: '💊',
                title: 'Healthcare AI',
                count: Math.floor(publications.length * 0.3),
                description: 'Clinical decision support and predictive analytics',
              },
              {
                icon: '🔬',
                title: 'Biomedical Engineering',
                count: Math.floor(publications.length * 0.2),
                description: 'Medical devices and computational biology',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {area.description}
                </p>
                <div className="text-sm font-semibold text-blue-600">
                  {area.count} publications
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Featured Publications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recent high-impact research publications and scholarly works
            </p>
          </motion.div>

          <div className="space-y-6 mb-8">
            {featuredPublications.map((pub: any) => (
              <CitationCard
                key={pub.id}
                id={pub.id}
                title={pub.attributes.title}
                authors={pub.attributes.authors}
                journal={pub.attributes.journalName}
                year={new Date(pub.attributes.publicationDate).getFullYear()}
                volume={pub.attributes.volume}
                issue={pub.attributes.issue}
                pages={pub.attributes.pages}
                doi={pub.attributes.doi}
                slug={pub.attributes.slug}
                citations={pub.attributes.citations}
                impactFactor={pub.attributes.impactFactor}
                publicationType={pub.attributes.publicationType}
                isOpenAccess={pub.attributes.isOpenAccess}
                isFeatured={pub.attributes.isFeatured}
                abstract={pub.attributes.abstract}
                pdfUrl={pub.attributes.pdfFile?.data?.attributes?.url}
                url={pub.attributes.url}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/publications"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              View All Publications →
            </Link>
          </div>
        </div>
      </section>

      {/* Active Research Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Active Research Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Currently funded research initiatives and collaborations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeProjects.slice(0, 3).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      ACTIVE
                    </span>
                    {project.attributes.fundingAmount && (
                      <span className="text-sm font-bold text-blue-600">
                        ${(project.attributes.fundingAmount / 1000).toFixed(0)}K
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href={`/research/${project.attributes.slug}`}>
                      {project.attributes.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.attributes.description}
                  </p>

                  {project.attributes.fundingSource && (
                    <div className="text-sm text-gray-500 mb-4">
                      <span className="font-semibold">Funded by:</span> {project.attributes.fundingSource}
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      />
                    </div>
                  </div>

                  <Link
                    href={`/research/${project.attributes.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Project Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {activeProjects.length > 3 && (
            <div className="text-center mt-8">
              <Link
                href="/research"
                className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                View All Projects →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Interested in Collaboration?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new research opportunities, student supervision, and academic partnerships
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/publications"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg border-2 border-white/30"
              >
                Browse Publications
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
