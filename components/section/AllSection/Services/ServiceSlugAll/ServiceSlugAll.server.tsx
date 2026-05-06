import { getServicesByCategorySlug } from '@/libs/api/services.api';
import ServicesClient from './ServiceSlugAll.cllient';

interface Props {
  categoryPage: string;
}

export default async function ServiceSlugServer({ categoryPage }: Props) {
  const result = await getServicesByCategorySlug({
    categoryPage,
  });

  return <ServicesClient result={result} />;
}
