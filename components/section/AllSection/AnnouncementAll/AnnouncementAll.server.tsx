import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AllAnnouncementClient from "./AnnouncementAll.client";
import { getQueryClient } from "@/libs/functions";
import { announcementAllQueryKey, announcementMdaOptionsQueryKey, getAllAnnouncements, getAnnouncementMdaOptions } from "@/libs/query/all/announcement_all.query";

type SearchParams = {
  page?: string;
  search?: string;
  ministry?: string;
  category?: string;
};

export default async function AllAnnouncementServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);
  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministry && params.ministry !== "all"
      ? params.ministry
      : undefined;

  const category =
    params.category && params.category !== "all"
      ? params.category
      : undefined;

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: announcementAllQueryKey({
        page: safePage,
        search,
        ministryId,
        category,
      }),
      queryFn: () =>
        getAllAnnouncements({
          page: safePage,
          search,
          ministryId,
          category,
        }),
    }),

    queryClient.prefetchQuery({
      queryKey: announcementMdaOptionsQueryKey,
      queryFn: getAnnouncementMdaOptions,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllAnnouncementClient
        currentPage={safePage}
        search={search}
        ministryId={params.ministry ?? "all"}
        category={params.category ?? "all"}
      />
    </HydrationBoundary>
  );
}