import AllMDAClient from './MdaAll.client';
import { getAllMdas } from '@/libs/query/all/mda_all.query';

export const revalidate = 120;

type SearchParams = {
  page?: string;
  search?: string;
  type?: string;
  acronym?: string;
  from?: string;
};

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function AllMDAServer({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params?.page ?? 1) || 1);
  const search = params?.search?.trim() || '';

  const result = await getAllMdas({
    page: currentPage,
    search: search || undefined,
  });

  return (
    <AllMDAClient
      currentPage={currentPage}
      search={search}
      type={params?.type ?? 'all'}
      acronym={params?.acronym}
      mdas={result.data}
      total={result.total ?? 0}
    />
  );
}
