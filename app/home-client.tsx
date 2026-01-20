'use client';

import React from 'react';
import { useTheme } from '@/lib/theme-provider';
import Link from 'next/link';

interface HomePageClientProps {
  industryType: string;
  heroData: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string | null;
  };
  servicesData: Array<{
    id: number | string;
    title: string;
    description: string;
    icon: string;
  }>;
  testimonialsData: Array<{
    id: number | string;
    name: string;
    company: string;
    text: string;
    rating: number;
  }>;
}

export default function HomePageClient({
  heroData,
  servicesData,
  testimonialsData,
}: HomePageClientProps) {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      {/* Hero Section - Fully Dynamic from CMS */}
      <section
        className="relative py-32"
        style={{
          backgroundColor: theme.colors.primary,
          color: '#ffffff',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {heroData.title}
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 opacity-90"
              style={{ fontFamily: theme.fonts.body }}
            >
              {heroData.subtitle}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.text,
              }}
            >
              {heroData.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Fully Dynamic from CMS */}
      {servicesData.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2
              className="text-4xl font-bold text-center mb-12"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}
            >
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="p-8 shadow-lg rounded-lg hover:shadow-xl transition"
                  style={{
                    backgroundColor: theme.colors.cardBg,
                  }}
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: theme.fonts.heading,
                      color: theme.colors.text,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      color: theme.colors.textLight,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Fully Dynamic from CMS */}
      {testimonialsData.length > 0 && (
        <section
          className="py-20"
          style={{
            backgroundColor: theme.colors.cardBg,
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-4xl font-bold text-center mb-12"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}
            >
              Client Testimonials
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-6 rounded-lg shadow-md"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderLeft: `4px solid ${theme.colors.accent}`,
                  }}
                >
                  <p
                    className="mb-4 italic"
                    style={{
                      color: theme.colors.textLight,
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-bold"
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        {testimonial.name}
                      </p>
                      {testimonial.company && (
                        <p
                          className="text-sm"
                          style={{
                            color: theme.colors.textLight,
                          }}
                        >
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} style={{ color: theme.colors.accent }}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
