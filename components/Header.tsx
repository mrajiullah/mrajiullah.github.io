import Link from 'next/link';
import { getGlobalSettings, getNavigation } from '@/lib/strapi';

export default async function Header() {
  let globalSettings: any = null;
  let navigation: any = null;

  try {
    globalSettings = await getGlobalSettings();
    navigation = await getNavigation();
  } catch (error) {
    console.error('Error fetching header data:', error);
  }

  const siteName = globalSettings?.data?.attributes?.siteName || 'Mohammad Rajiullah';
  const menuItems = navigation?.data?.attributes?.menuItems || [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Publications', url: '/publications' },
    { label: 'Research', url: '/research' },
    { label: 'Teaching', url: '/teaching' },
    { label: 'CV', url: '/cv' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            {siteName}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {menuItems.map((item: any, index: number) => (
              <li key={index}>
                <Link
                  href={item.url || '/'}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
