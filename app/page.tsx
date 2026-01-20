import {
  getServices,
  getTestimonials,
  getHeroSection,
  getGlobalSettings,
  getPublications,
  getResearchProjects,
  getAcademicProfile
} from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import HomePageClient from "./home-client";
import AcademicHome from "./academic-home";

export default async function HomePage() {
  // Fetch global settings to get industry type
  const globalSettings: any = await getGlobalSettings();
  const industryType = globalSettings?.data?.attributes?.businessType || 'default';

  // If academic, use specialized academic layout
  if (industryType === 'academic') {
    let academicProfile: any = null;
    let publications = [];
    let researchProjects = [];

    try {
      const profileResponse: any = await getAcademicProfile();
      academicProfile = profileResponse.data || null;
    } catch (error) {
      console.error('Error fetching academic profile:', error);
    }

    try {
      const pubsResponse: any = await getPublications();
      publications = pubsResponse.data || [];
    } catch (error) {
      console.error('Error fetching publications:', error);
    }

    try {
      const projectsResponse: any = await getResearchProjects();
      researchProjects = projectsResponse.data || [];
    } catch (error) {
      console.error('Error fetching research projects:', error);
    }

    // Calculate total citations
    const totalCitations = publications.reduce((sum: number, pub: any) =>
      sum + (pub.attributes.citations || 0), 0
    );

    // Calculate total funding
    const totalFunding = researchProjects.reduce((sum: number, project: any) =>
      sum + (project.attributes.fundingAmount || 0), 0
    );

    return (
      <AcademicHome
        academicProfile={academicProfile}
        globalSettings={globalSettings?.data}
        publications={publications}
        researchProjects={researchProjects}
        totalCitations={totalCitations}
        totalFunding={totalFunding}
      />
    );
  }

  // Default layout for other industries
  // Fetch CMS content
  let heroSection: any = null;
  let services = [];
  let testimonials = [];

  try {
    const heroResponse: any = await getHeroSection();
    heroSection = heroResponse.data || null;
  } catch (error) {
    console.error('Error fetching hero section:', error);
  }

  try {
    const servicesResponse: any = await getServices();
    services = servicesResponse.data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
  }

  try {
    const testimonialsResponse: any = await getTestimonials(true);
    testimonials = testimonialsResponse.data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  // Use CMS content with simple fallbacks
  const heroData = {
    title: heroSection?.attributes?.title || 'Welcome to Our Business',
    subtitle: heroSection?.attributes?.subtitle || 'Discover our services and solutions',
    ctaText: heroSection?.attributes?.primaryButtonText || 'Get Started',
    backgroundImage: heroSection?.attributes?.backgroundImage?.data
      ? getStrapiMedia(heroSection.attributes.backgroundImage.data.attributes.url)
      : null,
  };

  const servicesData = services.map((s: any) => ({
    id: s.id,
    title: s.attributes.name,
    description: s.attributes.description,
    icon: s.attributes.icon || '💼',
  }));

  const testimonialsData = testimonials.map((t: any) => ({
    id: t.id,
    name: t.attributes.clientName,
    company: t.attributes.clientCompany || '',
    text: t.attributes.content,
    rating: t.attributes.rating || 5,
  }));

  return (
    <HomePageClient
      industryType={industryType}
      heroData={heroData}
      servicesData={servicesData}
      testimonialsData={testimonialsData}
    />
  );
}
