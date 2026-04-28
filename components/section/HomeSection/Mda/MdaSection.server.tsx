import { getMdas } from '@/libs/api/mdas.api';
import MDASectionClient from './MdaSection.client';

export default async function MDASectionServer() {
  const mdas = await getMdas({ limit: 10 });

  return <MDASectionClient items={mdas} />;
}
