/**
 * BizMaster Pro - Industry-Specific Theme Configurations
 * Each industry gets custom colors, fonts, layout styles
 */

export type IndustryType =
  | 'restaurant'
  | 'tech'
  | 'healthcare'
  | 'ecommerce'
  | 'professional'
  | 'academic'
  | 'default';

export interface ThemeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    cardBg: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    heroStyle: 'full-screen' | 'split' | 'minimal' | 'carousel';
    navStyle: 'transparent' | 'solid' | 'bordered';
    cardStyle: 'elevated' | 'bordered' | 'minimal';
    buttonStyle: 'rounded' | 'sharp' | 'pill';
  };
  features: {
    showHeroAnimation: boolean;
    showParallax: boolean;
    showTestimonialCarousel: boolean;
    showPricingTable: boolean;
    showBookingWidget: boolean;
    showMenuDisplay: boolean;
  };
}

export const industryThemes: Record<IndustryType, ThemeConfig> = {
  // Restaurant, Cafe, Food Business
  restaurant: {
    name: 'Restaurant & Cafe',
    description: 'Warm, inviting design perfect for food businesses',
    colors: {
      primary: '#D97706',      // Warm orange
      secondary: '#92400E',    // Dark brown
      accent: '#FCD34D',       // Gold
      background: '#FFFBEB',   // Cream
      text: '#1F2937',
      textLight: '#6B7280',
      cardBg: '#FFFFFF',
      border: '#FDE68A',
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Montserrat, sans-serif',
    },
    layout: {
      heroStyle: 'full-screen',
      navStyle: 'transparent',
      cardStyle: 'elevated',
      buttonStyle: 'rounded',
    },
    features: {
      showHeroAnimation: true,
      showParallax: true,
      showTestimonialCarousel: true,
      showPricingTable: false,
      showBookingWidget: true,
      showMenuDisplay: true,
    },
  },

  // Tech, IT, Software Company
  tech: {
    name: 'Technology & IT',
    description: 'Modern, clean design for tech companies',
    colors: {
      primary: '#3B82F6',      // Blue
      secondary: '#1E40AF',    // Dark blue
      accent: '#10B981',       // Green
      background: '#F9FAFB',   // Light gray
      text: '#111827',
      textLight: '#6B7280',
      cardBg: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    layout: {
      heroStyle: 'split',
      navStyle: 'solid',
      cardStyle: 'bordered',
      buttonStyle: 'sharp',
    },
    features: {
      showHeroAnimation: true,
      showParallax: false,
      showTestimonialCarousel: true,
      showPricingTable: true,
      showBookingWidget: false,
      showMenuDisplay: false,
    },
  },

  // Healthcare, Medical, Clinic
  healthcare: {
    name: 'Healthcare & Medical',
    description: 'Clean, trustworthy design for healthcare',
    colors: {
      primary: '#06B6D4',      // Cyan
      secondary: '#0E7490',    // Teal
      accent: '#10B981',       // Green
      background: '#F0FDFA',   // Light mint
      text: '#134E4A',
      textLight: '#6B7280',
      cardBg: '#FFFFFF',
      border: '#A7F3D0',
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Open Sans, sans-serif',
    },
    layout: {
      heroStyle: 'minimal',
      navStyle: 'solid',
      cardStyle: 'elevated',
      buttonStyle: 'pill',
    },
    features: {
      showHeroAnimation: false,
      showParallax: false,
      showTestimonialCarousel: true,
      showPricingTable: false,
      showBookingWidget: true,
      showMenuDisplay: false,
    },
  },

  // E-commerce, Retail, Shop
  ecommerce: {
    name: 'E-commerce & Retail',
    description: 'Product-focused design for online stores',
    colors: {
      primary: '#EC4899',      // Pink
      secondary: '#BE185D',    // Dark pink
      accent: '#F59E0B',       // Orange
      background: '#FFF7ED',   // Light peach
      text: '#1F2937',
      textLight: '#6B7280',
      cardBg: '#FFFFFF',
      border: '#FED7AA',
    },
    fonts: {
      heading: 'Raleway, sans-serif',
      body: 'Lato, sans-serif',
    },
    layout: {
      heroStyle: 'carousel',
      navStyle: 'solid',
      cardStyle: 'elevated',
      buttonStyle: 'rounded',
    },
    features: {
      showHeroAnimation: true,
      showParallax: false,
      showTestimonialCarousel: true,
      showPricingTable: true,
      showBookingWidget: false,
      showMenuDisplay: false,
    },
  },

  // Professional Services (Law, Accounting, Consulting)
  professional: {
    name: 'Professional Services',
    description: 'Elegant, corporate design for professional firms',
    colors: {
      primary: '#1E3A8A',      // Navy blue
      secondary: '#1E40AF',    // Blue
      accent: '#D97706',       // Gold
      background: '#F8FAFC',   // Light slate
      text: '#0F172A',
      textLight: '#64748B',
      cardBg: '#FFFFFF',
      border: '#CBD5E1',
    },
    fonts: {
      heading: 'Merriweather, serif',
      body: 'Source Sans Pro, sans-serif',
    },
    layout: {
      heroStyle: 'split',
      navStyle: 'solid',
      cardStyle: 'bordered',
      buttonStyle: 'sharp',
    },
    features: {
      showHeroAnimation: false,
      showParallax: false,
      showTestimonialCarousel: true,
      showPricingTable: true,
      showBookingWidget: true,
      showMenuDisplay: false,
    },
  },

  // Academic, University, Research
  academic: {
    name: 'Academic & Research',
    description: 'Scholarly design for academic portfolios and research',
    colors: {
      primary: '#1E40AF',      // Academic blue
      secondary: '#1E3A8A',    // Deep blue
      accent: '#DC2626',       // Academic red
      background: '#F8FAFC',   // Light slate
      text: '#0F172A',
      textLight: '#64748B',
      cardBg: '#FFFFFF',
      border: '#CBD5E1',
    },
    fonts: {
      heading: 'Merriweather, serif',
      body: 'Georgia, serif',
    },
    layout: {
      heroStyle: 'minimal',
      navStyle: 'solid',
      cardStyle: 'bordered',
      buttonStyle: 'sharp',
    },
    features: {
      showHeroAnimation: false,
      showParallax: false,
      showTestimonialCarousel: true,
      showPricingTable: false,
      showBookingWidget: false,
      showMenuDisplay: false,
    },
  },

  // Default/Generic Business
  default: {
    name: 'Default Business',
    description: 'Versatile design for any business type',
    colors: {
      primary: '#00B4D8',      // Cyan blue (BizMaster Pro)
      secondary: '#0096c7',    // Dark cyan
      accent: '#FFC107',       // Gold
      background: '#FFFFFF',
      text: '#1F2937',
      textLight: '#6B7280',
      cardBg: '#F9FAFB',
      border: '#E5E7EB',
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif',
    },
    layout: {
      heroStyle: 'full-screen',
      navStyle: 'transparent',
      cardStyle: 'elevated',
      buttonStyle: 'rounded',
    },
    features: {
      showHeroAnimation: true,
      showParallax: true,
      showTestimonialCarousel: true,
      showPricingTable: true,
      showBookingWidget: true,
      showMenuDisplay: false,
    },
  },
};

/**
 * Get theme configuration based on industry type
 */
export function getIndustryTheme(industry?: string): ThemeConfig {
  const normalizedIndustry = industry?.toLowerCase() as IndustryType;
  return industryThemes[normalizedIndustry] || industryThemes.default;
}

/**
 * Generate Tailwind CSS variables from theme
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-background: ${theme.colors.background};
      --color-text: ${theme.colors.text};
      --color-text-light: ${theme.colors.textLight};
      --color-card-bg: ${theme.colors.cardBg};
      --color-border: ${theme.colors.border};
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
    }
  `;
}
