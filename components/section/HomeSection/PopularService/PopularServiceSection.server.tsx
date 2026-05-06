import { getServices } from '@/libs/api/services.api';
import PopularServicesSectionClient from './PopularServiceSection.client';

export default async function PopularServicesSectionServer() {
  const service = await getServices();

  return <PopularServicesSectionClient items={service.data} />;
}
