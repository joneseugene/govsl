'use client';

import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { HomeSection } from '../../../ui/HomeSections';
import { SectionHeading } from '../../../ui/SectionHeading';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { MdaItem } from './MdaItem';
import { homeSections } from '@/libs/consts/home.const';
import { useRouter } from 'next/navigation';

export default function MDASectionClient({ items }: { items: MDAInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.mda.id} className="bg-white px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[20px]"
        />

        {/* List of MDAs */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {items.map((item) => (
            <MdaItem
              key={item.id}
              item={item}
              onNavigate={(path) => router.push(path)}
              variant="compact"
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-6 text-center">
          <ViewAllButton onClick={() => router.push(homeSections.mda.routes.all)}>
            See all Ministries, Departments & Agencies
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
