'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PopularCategoryItem } from './PopularServiceItem';
import { ServicesInterface } from '@/libs/interface/service/services.interface';
import { useRouter } from 'next/navigation';

export default function PopularServicesSectionClient({ items }: { items: ServicesInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.service.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading 
          level="h3" 
          title="Popular Services" 
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[20px]"
          />

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[19px] text-[#505A5F] italic">
              No popular services available at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-14">
            {items.map((item) => (
              <PopularCategoryItem
                key={item.id}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <ViewAllButton onClick={() => router.push(homeSections.service.routes.all)}>
          See all Popular Services
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
