/**
 * Fetch Global Settings from Strapi CMS
 * Includes business type (industry theme) and other site-wide settings
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface GlobalSettings {
  siteName: string;
  tagline?: string;
  businessType: 'default' | 'restaurant' | 'tech' | 'healthcare' | 'ecommerce' | 'professional';
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  businessHours?: string;
  primaryColor?: string;
  secondaryColor?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  logo?: {
    url: string;
    alternativeText?: string;
  };
  favicon?: {
    url: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  googleMapsEmbedUrl?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Fetch global settings from Strapi
 * Used to get industry theme and site configuration
 */
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/global-setting?populate=*`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      console.error('Failed to fetch global settings:', res.status);
      return null;
    }

    const data = await res.json();

    if (!data.data) {
      return null;
    }

    const attributes = data.data.attributes;

    return {
      siteName: attributes.siteName || 'Your Business',
      tagline: attributes.tagline,
      businessType: attributes.businessType || 'default',
      contactEmail: attributes.contactEmail,
      contactPhone: attributes.contactPhone,
      address: attributes.address,
      businessHours: attributes.businessHours,
      primaryColor: attributes.primaryColor,
      secondaryColor: attributes.secondaryColor,
      whatsappNumber: attributes.whatsappNumber,
      whatsappMessage: attributes.whatsappMessage,
      logo: attributes.logo?.data ? {
        url: `${STRAPI_URL}${attributes.logo.data.attributes.url}`,
        alternativeText: attributes.logo.data.attributes.alternativeText,
      } : undefined,
      favicon: attributes.favicon?.data ? {
        url: `${STRAPI_URL}${attributes.favicon.data.attributes.url}`,
      } : undefined,
      socialLinks: attributes.socialLinks,
      seo: attributes.seo,
      googleMapsEmbedUrl: attributes.googleMapsEmbedUrl,
      latitude: attributes.latitude,
      longitude: attributes.longitude,
    };
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

/**
 * Get only the industry theme from global settings
 * Lightweight fetch for theme-only needs
 */
export async function getIndustryTheme(): Promise<string> {
  try {
    const settings = await getGlobalSettings();
    return settings?.businessType || 'default';
  } catch (error) {
    console.error('Error fetching industry theme:', error);
    return 'default';
  }
}
