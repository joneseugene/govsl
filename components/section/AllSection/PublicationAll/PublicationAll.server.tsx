import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PublicationAllClient from "./PublicationAll.client";
import { getQueryClient } from "@/libs/functions";
import { getAllPublications, getPublicationMdaOptions, publicationAllQueryKey, publicationMdaOptionsQueryKey } from "@/libs/query/all/publication_all.query";

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function PublicationAllServer({
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
      queryKey: publicationAllQueryKey(queryParams),
      queryFn: () => getAllPublications(queryParams),
    }),

    queryClient.prefetchQuery({
      queryKey: publicationMdaOptionsQueryKey,
      queryFn: getPublicationMdaOptions,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicationAllClient
        currentPage={safePage}
        search={search}
        ministryId={params.ministryId ?? "all"}
      />
    </HydrationBoundary>
  );
}