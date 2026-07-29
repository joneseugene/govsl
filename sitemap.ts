import type { MetadataRoute } from 'next';

import { NewsArticleInterface } from './libs/interface/news.articles.interface';
import { MDAInterface } from './libs/interface/mda/mdas.interface';
import { ServicesInterface } from './libs/interface/service/services.interface';
import { PublicationInterface } from './libs/interface/publications.interface';
import { AnnouncementInterface } from './libs/interface/announcements.interface';
import { PressReleaseInterface } from './libs/interface/press.releases.interface';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is missing');
}

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is missing');
}

async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.data || data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [
    news,
    mdas,
    services,
    publications,
    announcements,
    pressReleases,
  ] = await Promise.all([
    fetchData('news'),
    fetchData('mdas'),
    fetchData('services'),
    fetchData('publications'),
    fetchData('announcements'),
    fetchData('press-release'),
  ]);

  return [
    /* Homepage */

    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },

    /* Static Pages */

    {
      url: `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/press-release`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/announcements`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/publications`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/mdas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    /* Dynamic News */

    ...news.map((item: NewsArticleInterface) => ({
      url: `${BASE_URL}/news/${item.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    /* Dynamic Press Releases */

    ...pressReleases.map((item: PressReleaseInterface) => ({
      url: `${BASE_URL}/press-releases/${item.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    /* Dynamic Announcements */

    ...announcements.map((item: AnnouncementInterface) => ({
      url: `${BASE_URL}/announcements/${item.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    /* Dynamic Publications */

    ...publications.map((item: PublicationInterface) => ({
      url: `${BASE_URL}/publications/${item.id}`,
      lastModified: item.publish_date ? new Date(item.publish_date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    /* Dynamic Services */

    ...services.map((item: ServicesInterface) => ({
      url: `${BASE_URL}/services/${item.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    /* Dynamic MDAs */

    ...mdas.map((item: MDAInterface) => ({
      url: `${BASE_URL}/mdas/${item.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}