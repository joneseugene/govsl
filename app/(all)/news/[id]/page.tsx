import NewsDetailClient from '@/components/section/DetailSection/News/NewsDetail';
import { getNewsArticleById } from '@/libs/api/news.articles.api';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const news = await getNewsArticleById(id);

  if (!news) {
    notFound();
  }

  return (
    <NewsDetailClient
      id={news.id}
      category={news.category ?? 'News'}
      ministry={news.mdas?.name ?? 'Government of Sierra Leone'}
      date={news.date ?? ''}
      location={news.location}
      headline={news.headline ?? news.title}
      excerpt={news.summary}
      content={news.content ?? ''}
    />
  );
}
