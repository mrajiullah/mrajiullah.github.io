'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

interface AcademicHomeProps {
  academicProfile: any;
  globalSettings: any;
  publications: any[];
  researchProjects: any[];
  totalCitations: number;
  totalFunding: number;
}

export default function AcademicHomeModern({
  academicProfile,
  globalSettings,
  publications,
  researchProjects,
  totalCitations,
  totalFunding,
}: AcademicHomeProps) {
  // Get featured projects first, then ongoing, limit to 4
  const featuredProjects = researchProjects
    .filter((p: any) => p.attributes.isFeatured)
    .slice(0, 4);

  const ongoingProjects = researchProjects
    .filter((p: any) => p.attributes.projectStatus === 'ongoing' && !p.attributes.isFeatured)
    .slice(0, 4 - featuredProjects.length);

  const displayProjects = [...featuredProjects, ...ongoingProjects].slice(0, 4);

  const featuredPublications = publications
    .filter((p: any) => p.attributes.isFeatured)
    .slice(0, 4);

  // Extract profile data
  const profile = academicProfile?.attributes || {};
  const profileImageUrl = profile.profileImage?.data?.attributes?.url
    ? getStrapiMedia(profile.profileImage.data.attributes.url)
    : null;

  return (
    <div className="bg-white">
      {/* Modern Minimalist Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Profile Image */}
            {profileImageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden ring-1 ring-gray-200">
                  <Image
                    src={profileImageUrl}
                    alt={profile.name || 'Profile'}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Hero Content */}
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {profile.name || 'Mohammad Rajiullah'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {profile.title || 'Senior Lecturer in Computer Science'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-500 mb-8"
              >
                {profile.institution || 'Karlstad University'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-8"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {profile.tagline || 'Advancing the frontiers of low-latency networking, web performance, and next-generation mobile technologies.'}
              </motion.p>

              {/* Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {profile.email}
                  </a>
                )}
                {profile.googleScholarUrl && (
                  <a
                    href={profile.googleScholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Google Scholar
                  </a>
                )}
                {profile.researchGateUrl && (
                  <a
                    href={profile.researchGateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ResearchGate
                  </a>
                )}
                {profile.orcidUrl && (
                  <a
                    href={profile.orcidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ORCID
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Minimal */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {publications.length}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Publications
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {totalCitations}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Citations
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {researchProjects.length}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Research Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {Math.floor(totalFunding / 1000)}K
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Funding
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications - Clean Cards */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2
            className="text-4xl font-bold text-gray-900 mb-12"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Featured Publications
          </h2>

          <div className="space-y-8">
            {featuredPublications.map((pub: any, index: number) => (
              <motion.article
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b border-gray-100 pb-8 last:border-0"
              >
                <Link href={`/publications/${pub.attributes.slug}`}>
                  <h3
                    className="text-2xl font-semibold text-gray-900 mb-3 hover:text-gray-600 transition-colors"
                    style={{ fontFamily: 'Crimson Pro, serif' }}
                  >
                    {pub.attributes.title}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {pub.attributes.authors}
                </p>

                <p className="text-gray-500 italic mb-4">
                  {pub.attributes.journalName}
                  {pub.attributes.volume && `, Vol. ${pub.attributes.volume}`}
                  {pub.attributes.issue && ` (${pub.attributes.issue})`}
                  {pub.attributes.publicationDate && (
                    <span> • {new Date(pub.attributes.publicationDate).getFullYear()}</span>
                  )}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {pub.attributes.doi && (
                    <a
                      href={`https://doi.org/${pub.attributes.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      DOI: {pub.attributes.doi}
                    </a>
                  )}
                  {pub.attributes.citations && (
                    <span className="text-gray-500">
                      {pub.attributes.citations} citations
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/publications"
              className="inline-flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors"
            >
              View all publications
              <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Projects Summary - Clean Cards */}
      {displayProjects.length > 0 && (
        <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Research Projects
            </h2>
            <p
              className="text-lg text-gray-600 mb-12 max-w-3xl"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Exploring low-latency networking, web performance, and next-generation mobile technologies.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {displayProjects.map((project: any, index: number) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-white border border-gray-200 hover:border-gray-300 transition-all"
                >
                  {/* Project Image */}
                  {project.attributes.featuredImage?.data && (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                      <Image
                        src={getStrapiMedia(project.attributes.featuredImage.data.attributes.url) || ''}
                        alt={project.attributes.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-xs px-3 py-1 uppercase tracking-wide font-medium bg-gray-100 text-gray-800 border border-gray-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {project.attributes.projectStatus}
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

                    {/* Title */}
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors"
                      style={{ fontFamily: 'Crimson Pro, serif' }}
                    >
                      <Link href={`/research/${project.attributes.slug}`}>
                        {project.attributes.title}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    {project.attributes.shortDescription && (
                      <p
                        className="text-base text-gray-700 mb-4 line-clamp-3 leading-relaxed"
                        style={{ fontFamily: 'Crimson Pro, serif' }}
                      >
                        {project.attributes.shortDescription}
                      </p>
                    )}

                    {/* Funding */}
                    {project.attributes.fundingSource && (
                      <p
                        className="text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span className="text-gray-500">Funded by:</span>{' '}
                        {project.attributes.fundingSource}
                      </p>
                    )}

                    {/* Link */}
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
                </motion.article>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-12 text-center">
              <Link
                href="/research"
                className="inline-flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                View All Research Projects
                <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
