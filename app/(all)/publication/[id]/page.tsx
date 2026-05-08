import { notFound } from 'next/navigation';

import PublicationDetailClient from '@/components/section/DetailSection/Publication/PublicationDetail';

import { getPublicationById } from '@/libs/api/publications.api';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const publication = await getPublicationById(id);

  if (!publication) {
    notFound();
  }

  return <PublicationDetailClient publication={publication} />;
}
