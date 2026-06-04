import { getNewsArticles } from "@/libs/api/news.articles.api";
import { getMDAOptions } from "@/libs/api/mdas.api";

export type GovernmentNewsAllParams = {
  page: number;
  search?: string;
  ministryId?: string;
};

export const governmentNewsAllQueryKey = (
  params: GovernmentNewsAllParams
) => [
  "all-government-news",
  params.page,
  params.search ?? "",
  params.ministryId ?? "all",
];

export const governmentNewsMdaOptionsQueryKey = [
  "government-news-mda-options",
];

export async function getAllGovernmentNews(
  params: GovernmentNewsAllParams
) {
  return getNewsArticles({
    page: params.page,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
    status: "published",
  });
}

export async function getGovernmentNewsMdaOptions() {
  return getMDAOptions();
}