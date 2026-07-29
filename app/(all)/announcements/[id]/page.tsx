import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/libs/functions";

import {
  announcementDetailQueryKey,
  getAnnouncementDetail,
} from "@/libs/query/detail/announcement_detail.query";
import AnnouncementDetailPage from "@/components/section/DetailSection/Announcement/AnnouncementDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: announcementDetailQueryKey(id),
    queryFn: () => getAnnouncementDetail(id),
  });

  const announcement = queryClient.getQueryData(
    announcementDetailQueryKey(id)
  ) as Awaited<ReturnType<typeof getAnnouncementDetail>>;

  if (!announcement) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnnouncementDetailPage id={id} />
    </HydrationBoundary>
  );
}