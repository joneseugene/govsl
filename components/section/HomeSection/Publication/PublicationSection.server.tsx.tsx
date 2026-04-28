import { getPublications } from '@/libs/api/publications.api';
import PublicationSectionClient from './PublicationSection.client';

export default async function PublicationSectionServer() {
  const publications = await getPublications();

  return <PublicationSectionClient items={publications} />;
}
