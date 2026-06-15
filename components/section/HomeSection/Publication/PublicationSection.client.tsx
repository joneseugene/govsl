'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PublicationItem } from './PublicationItem';
import { useRouter } from 'next/navigation';

type Props = {
  initialData: any;
};

export default function PublicationSectionClient({ initialData }: Props) {
  const router = useRouter();

  const items = Array.isArray(initialData?.data)
  ? initialData.data
  : initialData?.data && typeof initialData.data === 'object'
    ? Object.values(initialData.data)
    : [];

  return (
    <HomeSection id={homeSections.publication.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Official Publications & Reports"
          description="Policy documents, strategic plans, annual reports and government publications."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {items.length === 0 ? (
          <div className="space-y-8 py-12 text-center">
            <p className="text-[19px] italic text-[#505A5F]">
              No recent publications available at this time.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-12 space-y-12 sm:space-y-14">
              {items.map((item: any, index: number) => (
  <PublicationItem
    key={
      item.id ??
      item.legacy_id ??
      item.reference_number ??
      item.slug ??
      `${item.title}-${index}`
    }
    item={item}
    onNavigate={(path) => router.push(path)}
  />
))}
            </div>

            <ViewAllButton
              onClick={() =>
                router.push(
                  `${homeSections.publication.routes.all}?from=%2F%23${homeSections.publication.id}`,
                )
              }
            >
              See all Publications & Reports
            </ViewAllButton>
          </>
        )}
      </div>
    </HomeSection>
  );
}