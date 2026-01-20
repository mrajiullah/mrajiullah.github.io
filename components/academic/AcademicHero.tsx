'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface AcademicHeroProps {
  name: string;
  title: string;
  institution?: string;
  tagline: string;
  profileImage?: string;
  socialLinks?: {
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
    linkedin?: string;
    twitter?: string;
  };
  email?: string;
}

export default function AcademicHero({
  name,
  title,
  institution,
  tagline,
  profileImage,
  socialLinks,
  email,
}: AcademicHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Profile Image */}
          {profileImage && (
            <motion.div
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse" />
                <Image
                  src={profileImage}
                  alt={name}
                  width={200}
                  height={200}
                  className="relative rounded-full border-4 border-white/30 shadow-2xl"
                />
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-3"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              {name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-200 mb-2"
            >
              {title}
            </motion.div>

            {institution && (
              <motion.div
                variants={itemVariants}
                className="text-lg text-blue-300 mb-4"
              >
                {institution}
              </motion.div>
            )}

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl"
            >
              {tagline}
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-6"
            >
              {socialLinks?.googleScholar && (
                <a
                  href={socialLinks.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium"
                >
                  📚 Google Scholar
                </a>
              )}
              {socialLinks?.researchGate && (
                <a
                  href={socialLinks.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium"
                >
                  🔬 ResearchGate
                </a>
              )}
              {socialLinks?.orcid && (
                <a
                  href={socialLinks.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium"
                >
                  🆔 ORCID
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium"
                >
                  💼 LinkedIn
                </a>
              )}
            </motion.div>

            {/* Email */}
            {email && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 justify-center md:justify-start text-blue-200"
              >
                <span>✉️</span>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors"
                >
                  {email}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </motion.section>
  );
}
