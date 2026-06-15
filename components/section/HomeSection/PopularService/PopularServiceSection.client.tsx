'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PopularCategoryItem } from './PopularServiceItem';
import { useRouter } from 'next/navigation';
import { ServicesInterface } from '@/libs/interface/service/services.interface';

type ServiceResponse =
  | ServicesInterface[]
  | {
      data?: ServicesInterface[];
    };

type Props = {
  initialData: ServiceResponse;
};

export default function PopularServicesSectionClient({
  initialData,
}: Props) {
  const router = useRouter();

  const items: ServicesInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

  return (
    <HomeSection id={homeSections.service.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Popular Services"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[19px] italic text-[#505A5F]">
              No popular services available at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-14">
            {items.map((item, index) => (
              <PopularCategoryItem
                key={
                  item.id ??
                  `${item.name}-${index}`
                }
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        <ViewAllButton
          onClick={() =>
            router.push(
              `${homeSections.service.routes.all}?from=%2F%23${homeSections.service.id}`,
            )
          }
        >
          See all Popular Services
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}