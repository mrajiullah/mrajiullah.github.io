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

  const siteName = globalSettings?.data?.attributes?.siteName || 'Business Website';
  const menuItems = navigation?.data?.attributes?.menuItems || [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            {siteName}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item: any, index: number) => (
              <Link
                key={index}
                href={item.url}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="btn btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
