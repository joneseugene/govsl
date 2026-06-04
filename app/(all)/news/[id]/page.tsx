import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NewsDetailClient from "@/components/section/DetailSection/News/NewsDetail";
import { getQueryClient } from "@/libs/functions";

import {
  getNewsDetail,
  newsDetailQueryKey,
} from "@/libs/query/detail/news_detail.query";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: newsDetailQueryKey(id),
    queryFn: () => getNewsDetail(id),
  });

  const news = queryClient.getQueryData(
    newsDetailQueryKey(id)
  ) as Awaited<ReturnType<typeof getNewsDetail>>;

  if (!news) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsDetailClient id={id} />
    </HydrationBoundary>
  );
}