'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PublicationItem } from './PublicationItem';
import { useRouter } from 'next/navigation';
import { PublicationInterface } from '@/libs/interface/publications.interface';

export default function PublicationSectionClient({ items }: { items: PublicationInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.publication.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h3"
          title="Official Publications & Reports"
          description="Policy documents, strategic plans, annual reports and government publications."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[20px]"
        />

        {items.length === 0 ? (
          <div className="space-y-8 text-center py-12">
            <p
              className="
              text-[19px] text-[#505A5F] italic
            "
            >
              No recent publications available at this time.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-12 sm:space-y-14 mb-12">
              {items.map((item) => (
                <PublicationItem
                  key={item.id}
                  item={item}
                  onNavigate={(path) => router.push(path)}
                />
              ))}
            </div>

            {/* View All */}
            <ViewAllButton onClick={() => router.push(homeSections.publication.routes.all)}>
              See all Publications & Reports
            </ViewAllButton>
          </>
        )}
      </div>
    </HomeSection>
  );
}
