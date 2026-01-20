import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEOMetadata({
  title,
  description,
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const siteName = 'Your Business Name';
  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourbusiness.com'}${url}`;
  const imageUrl = image.startsWith('http')
    ? image
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourbusiness.com'}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: siteName,
    publisher: siteName,
    openGraph: {
      type: type as any,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@yourbusiness',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

export function generateStructuredData(type: 'Organization' | 'LocalBusiness', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: data.name || 'Your Business Name',
    url: data.url || process.env.NEXT_PUBLIC_SITE_URL,
    logo: data.logo || `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    description: data.description,
    ...(data.email && { email: data.email }),
    ...(data.phone && { telephone: data.phone }),
  };

  if (type === 'LocalBusiness') {
    return {
      ...baseData,
      '@type': 'LocalBusiness',
      address: data.address ? {
        '@type': 'PostalAddress',
        streetAddress: data.address.street,
        addressLocality: data.address.city,
        addressRegion: data.address.state,
        postalCode: data.address.zip,
        addressCountry: data.address.country,
      } : undefined,
      geo: data.geo ? {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      } : undefined,
      openingHoursSpecification: data.businessHours || [],
    };
  }

  return {
    ...baseData,
    sameAs: data.socialLinks || [],
  };
}

export function StructuredDataScript({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
