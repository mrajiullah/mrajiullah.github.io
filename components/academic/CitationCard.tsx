'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface CitationCardProps {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  slug: string;
  citations?: number;
  impactFactor?: number;
  publicationType: string;
  isOpenAccess?: boolean;
  isFeatured?: boolean;
  abstract?: string;
  pdfUrl?: string;
  url?: string;
}

export default function CitationCard({
  title,
  authors,
  journal,
  year,
  volume,
  issue,
  pages,
  doi,
  slug,
  citations,
  impactFactor,
  publicationType,
  isOpenAccess,
  isFeatured,
  abstract,
  pdfUrl,
  url,
}: CitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    journal: 'bg-blue-100 text-blue-800',
    conference: 'bg-purple-100 text-purple-800',
    'book-chapter': 'bg-green-100 text-green-800',
    book: 'bg-yellow-100 text-yellow-800',
    preprint: 'bg-orange-100 text-orange-800',
    thesis: 'bg-pink-100 text-pink-800',
    patent: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[publicationType]}`}>
          {publicationType.toUpperCase()}
        </span>
        {isOpenAccess && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            🔓 Open Access
          </span>
        )}
        {isFeatured && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
        <Link href={`/publications/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>

      {/* Authors */}
      <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
        {authors}
      </p>

      {/* Citation */}
      <div className="text-gray-700 mb-3 italic" style={{ fontFamily: 'Georgia, serif' }}>
        <span className="font-semibold">{journal}</span>
        {volume && <span>, Vol. {volume}</span>}
        {issue && <span>({issue})</span>}
        {pages && <span>, pp. {pages}</span>}
        <span className="text-gray-500"> ({year})</span>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {doi && (
          <div className="flex items-center gap-1 text-gray-600">
            <span className="font-semibold">DOI:</span>
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {doi}
            </a>
          </div>
        )}
        {citations !== undefined && (
          <div className="flex items-center gap-1 text-gray-600">
            <span>📊</span>
            <span className="font-semibold">{citations}</span>
            <span>citations</span>
          </div>
        )}
        {impactFactor !== undefined && (
          <div className="flex items-center gap-1 text-gray-600">
            <span>📈</span>
            <span className="font-semibold">IF: {impactFactor}</span>
          </div>
        )}
      </div>

      {/* Abstract (Expandable) */}
      {abstract && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'Show'} Abstract
          </button>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="mt-2 text-sm text-gray-700 leading-relaxed p-4 bg-gray-50 rounded-lg"
              dangerouslySetInnerHTML={{ __html: abstract }}
            />
          </motion.div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
        <Link
          href={`/publications/${slug}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Details
        </Link>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            📄 PDF
          </a>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            🔗 View Online
          </a>
        )}
      </div>
    </motion.article>
  );
}
