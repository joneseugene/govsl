import type { MetadataRoute } from "next";
import { NewsArticleInterface } from "./libs/interface/news.articles.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is missing");
}

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}


async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      next: {
        revalidate: 3600, // refresh every hour
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.data || data || [];

  } catch (error) {
    console.error(
      `Failed fetching ${endpoint}`,
      error
    );

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
    reports,
    announcements,
  ] = await Promise.all([
    fetchData("news"),
    fetchData("mdas"),
    fetchData("services"),
    fetchData("publications"),
    fetchData("reports"),
    fetchData("announcements"),
  ]);



  return [

    // Homepage
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },


    // Static pages

    {
      url: `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },


    {
      url: `${BASE_URL}/mdas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },


    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },


    {
      url: `${BASE_URL}/publications`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },


    {
      url: `${BASE_URL}/reports`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },


    {
      url: `${BASE_URL}/announcements`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },



    // Dynamic News

    ...news.map((item: NewsArticleInterface) => ({
      url: `${BASE_URL}/news/${item.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),



    // Dynamic MDAs

    ...mdas.map((item: any) => ({
      url: `${BASE_URL}/mdas/${item.slug}`,
      lastModified:
        item.updated_at
          ? new Date(item.updated_at)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),


    // Dynamic Services

    ...services.map((item: any) => ({
      url: `${BASE_URL}/services/${item.slug}`,
      lastModified:
        item.updated_at
          ? new Date(item.updated_at)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),


    // Dynamic Publications

    ...publications.map((item: any) => ({
      url: `${BASE_URL}/publications/${item.slug}`,
      lastModified:
        item.updated_at
          ? new Date(item.updated_at)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),


    // Dynamic Reports

    ...reports.map((item: any) => ({
      url: `${BASE_URL}/reports/${item.slug}`,
      lastModified:
        item.updated_at
          ? new Date(item.updated_at)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),


    // Dynamic Announcements

    ...announcements.map((item: any) => ({
      url: `${BASE_URL}/announcements/${item.slug}`,
      lastModified:
        item.updated_at
          ? new Date(item.updated_at)
          : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),


  ];
}