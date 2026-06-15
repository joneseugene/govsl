import PopularServicesSectionClient from './PopularServiceSection.client';
import { toPlain } from '@/libs/functions';

import { getHomePopularServices } from '@/libs/query/home/service.query';

export const revalidate = 120;

export default async function PopularServicesSectionServer() {
  const data = await getHomePopularServices();

  return <PopularServicesSectionClient initialData={toPlain(data)} />;
}