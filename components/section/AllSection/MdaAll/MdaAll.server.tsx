import { getMdas } from '@/libs/api/mdas.api';
import AllMDAClient from './MdaAll.client';

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function AllMDAServer({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params.page || 1);
  const search = params.search || '';

  const mdas = await getMdas({
    status: 'active',
    search,
    limit: 300,
  });

  return (
    <AllMDAClient
      items={mdas}
      currentPage={currentPage}
      search={search}
    />
  );
}
