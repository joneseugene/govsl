import { getMDAById, getMdas } from '@/libs/api/mdas.api';
import { notFound } from 'next/navigation';
import MdaDetailPage from './MDADetail.client';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const mda = await getMDAById(id);

  if (!mda) {
    notFound();
  }

  const allMdas = await getMdas({
    status: 'active',
    limit: 100,
  });

  const relatedAgencies = allMdas.filter((item) => item.parent_ministry_id === id);

  return <MdaDetailPage mda={mda} relatedAgencies={relatedAgencies} />;
}
