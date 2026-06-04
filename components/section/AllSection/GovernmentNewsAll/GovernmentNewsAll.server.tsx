import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AllGovernmentNewsClient from "./GovernmentNewsAll.client";
import { getQueryClient } from "@/libs/functions";
import { getAllGovernmentNews, getGovernmentNewsMdaOptions, governmentNewsAllQueryKey, governmentNewsMdaOptionsQueryKey } from "@/libs/query/all/news_all.query";

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

  const queryClient = getQueryClient();

  const queryParams = {
    page: safePage,
    search,
    ministryId,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: governmentNewsAllQueryKey(queryParams),
      queryFn: () => getAllGovernmentNews(queryParams),
    }),

    queryClient.prefetchQuery({
      queryKey: governmentNewsMdaOptionsQueryKey,
      queryFn: getGovernmentNewsMdaOptions,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllGovernmentNewsClient
        currentPage={safePage}
        search={search}
        ministryId={params.ministryId ?? "all"}
      />
    </HydrationBoundary>
  );
}