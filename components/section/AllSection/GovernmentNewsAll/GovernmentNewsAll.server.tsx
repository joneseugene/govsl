import { getNewsArticles } from "@/libs/api/news.articles.api";
import { getMDAOptions } from "@/libs/api/mdas.api";
import AllGovernmentNewsClient from "./GovernmentNewsAll.client";

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function AllGovernmentNewsServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministryId && params.ministryId !== "all"
      ? params.ministryId
      : undefined;

  const [result, ministries] = await Promise.all([
    getNewsArticles({
      page: safePage,
      limit: 5,
      search,
      ministryId,
      status: "published",
    }),
    getMDAOptions(),
  ]);

  return (
    <AllGovernmentNewsClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={params.ministryId ?? "all"}
      ministries={ministries}
    />
  );
}