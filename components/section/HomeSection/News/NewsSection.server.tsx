import NewsArticleSectionClient from './NewsSection.client';
import { getQueryClient } from '@/libs/functions';
import { getHomeNewsArticles, newsQueryKey } from '@/libs/query/home/news.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function NewsSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: newsQueryKey,
    queryFn: getHomeNewsArticles,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsArticleSectionClient />
    </HydrationBoundary>
  );
}