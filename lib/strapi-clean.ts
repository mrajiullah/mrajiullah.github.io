import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions {
  populate?: string | string[] | object;
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export async function fetchAPI<T>(
  path: string,
  options: FetchOptions = {},
  fetchOptions: RequestInit = {}
): Promise<T> {
  const query = qs.stringify(options, {
    encodeValuesOnly: true,
  });

  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ''}`;

  const res = await fetch(url, {
    ...fetchOptions,
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${res.statusText}`);
  }

  const json = await res.json();
  return json;
}

// ============ HELPERS ============
export function getStrapiURL(path: string = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return getStrapiURL(url);
}

// ============ GLOBAL SETTINGS ============
export async function getGlobalSettings() {
  return fetchAPI('/global-setting', {
    populate: {
      logo: true,
      favicon: true,
      socialLinks: true,
      seo: true,
    },
  });
}

export async function getNavigation() {
  return fetchAPI('/navigation');
}

// ============ ACADEMIC/PROFESSOR PORTFOLIO ============
export async function getAcademicProfile() {
  return fetchAPI('/academic-profile', {
    populate: {
      profileImage: true,
      cvFile: true,
    },
  });
}

export async function getPublications(featured?: boolean, researchArea?: string) {
  return fetchAPI('/publications', {
    populate: '*',
    filters: {
      ...(featured && { isFeatured: { $eq: true } }),
      ...(researchArea && { researchArea: { $eq: researchArea } }),
    },
    sort: ['publicationDate:desc'],
  });
}

export async function getPublication(slug: string) {
  return fetchAPI('/publications', {
    filters: { slug: { $eq: slug } },
    populate: {
      pdfFile: true,
      relatedProject: {
        populate: '*',
      },
    },
  });
}

export async function getResearchProjects(status?: string, featured?: boolean) {
  return fetchAPI('/research-projects', {
    populate: '*',
    filters: {
      ...(status && { projectStatus: { $eq: status } }),
      ...(featured && { isFeatured: { $eq: true } }),
    },
    sort: ['startDate:desc'],
  });
}

export async function getResearchProject(slug: string) {
  return fetchAPI('/research-projects', {
    filters: { slug: { $eq: slug } },
    populate: {
      featuredImage: true,
      gallery: true,
      documents: true,
      publications: {
        populate: '*',
      },
    },
  });
}

export async function getConferences(featured?: boolean) {
  return fetchAPI('/conferences', {
    populate: '*',
    filters: featured ? { isFeatured: { $eq: true } } : {},
    sort: ['date:desc'],
  });
}

export async function getConference(slug: string) {
  return fetchAPI('/conferences', {
    filters: { slug: { $eq: slug } },
    populate: {
      slidesFile: true,
      posterFile: true,
      relatedPublication: {
        populate: '*',
      },
    },
  });
}

export async function getGrants(status?: string, featured?: boolean) {
  return fetchAPI('/grants', {
    populate: '*',
    filters: {
      ...(status && { status: { $eq: status } }),
      ...(featured && { isFeatured: { $eq: true } }),
    },
    sort: ['startDate:desc'],
  });
}

export async function getGrant(slug: string) {
  return fetchAPI('/grants', {
    filters: { slug: { $eq: slug } },
    populate: {
      relatedProjects: {
        populate: '*',
      },
    },
  });
}

// ============ CONTACT FORM (Optional - keep if you have contact page) ============
export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}) {
  return fetchAPI('/contact-forms', {}, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
}
