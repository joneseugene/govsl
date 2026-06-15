import NewsArticleSectionClient from './NewsSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHomeNewsArticles, newsQueryKey } from '@/libs/query/home/news.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function NewsSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: newsQueryKey,
    queryFn: async () => {
      const data = await getHomeNewsArticles();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <NewsArticleSectionClient />
    </HydrationBoundary>
  );
}
