import Link from 'next/link';
import { getGlobalSettings, getNavigation } from '@/lib/strapi';

export default async function Footer() {
  let globalSettings: any = null;
  let navigation: any = null;

  try {
    globalSettings = await getGlobalSettings();
    navigation = await getNavigation();
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }

  const settings = globalSettings?.data?.attributes || {};
  const siteName = settings.siteName || 'Business Website';
  const tagline = settings.tagline || 'Professional services for your business';
  const contactEmail = settings.contactEmail || '';
  const contactPhone = settings.contactPhone || '';
  const address = settings.address || '';
  const socialLinks = settings.socialLinks || {};

  const footerLinks = navigation?.data?.attributes?.footerLinks || [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            <p className="text-gray-400">{tagline}</p>

            {/* Social Links */}
            {socialLinks && (
              <div className="flex gap-4 mt-4">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white transition-colors">
                    Facebook
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {contactEmail && (
                <li>
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactPhone && (
                <li>
                  <a href={`tel:${contactPhone}`} className="hover:text-white transition-colors">
                    {contactPhone}
                  </a>
                </li>
              )}
              {address && <li>{address}</li>}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <p className="text-gray-400">
              {settings.businessHours || 'Monday - Friday: 9:00 AM - 5:00 PM'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
