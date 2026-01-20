import Link from 'next/link';
import { getGlobalSettings } from '@/lib/strapi';

export default async function Footer() {
  let globalSettings: any = null;

  try {
    globalSettings = await getGlobalSettings();
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }

  const siteName = globalSettings?.data?.attributes?.siteName || 'Mohammad Rajiullah';
  const email = globalSettings?.data?.attributes?.contactEmail || 'mohammad.rajiullah@kau.se';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3
              className="text-lg font-semibold mb-4 text-gray-900"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              {siteName}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Senior Lecturer in Computer Science at Karlstad University.
              Research in low-latency networking and mobile technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-4 text-gray-900"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/publications"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Research Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-lg font-semibold mb-4 text-gray-900"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Karlstad University
              </li>
              <li className="text-sm text-gray-600">
                Office: 21E 412
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} {siteName}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Google Scholar"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="ResearchGate"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="ORCID"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
