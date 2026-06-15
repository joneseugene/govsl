import MDASectionClient from './MdaSection.client';
import { toPlain } from '@/libs/functions';
import { getHomeMdas } from '@/libs/query/home/mda.query';

export const revalidate = 120;

export default async function MDASectionServer() {
  const data = await getHomeMdas();

  return <MDASectionClient initialData={toPlain(data)} />;
}