import PublicationSectionClient from './PublicationSection.client';
import { toPlain } from '@/libs/functions';
import { getHomePublications } from '@/libs/query/home/publication.query';

export const revalidate = 120;

export default async function PublicationSectionServer() {
  const data = await getHomePublications();

  return <PublicationSectionClient initialData={toPlain(data)} />;
}