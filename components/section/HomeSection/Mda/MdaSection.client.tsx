'use client';

import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { HomeSection } from '../../../ui/HomeSections';
import { SectionHeading } from '../../../ui/SectionHeading';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { MdaItem } from './MdaItem';
import { homeSections } from '@/libs/consts/home.const';
import { useRouter } from 'next/navigation';

type MDAResponse =
  | MDAInterface[]
  | {
      data?: MDAInterface[];
    };

type Props = {
  initialData: MDAResponse;
};

export default function MDASectionClient({ initialData }: Props) {
  const router = useRouter();

  const items: MDAInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

  const isLoading = false;
  const isError = false;

  return (
    <HomeSection id={homeSections.mda.id} className="bg-white px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {isLoading ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              Loading ministries, departments and agencies...
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              Ministries, departments and agencies could not be loaded.
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              No ministries, departments or agencies available.
            </div>
          ) : (
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
          )}
        </div>

        <div className="mt-6 text-center">
          <ViewAllButton
            onClick={() =>
              router.push(`${homeSections.mda.routes.all}?from=%2F%23${homeSections.mda.id}`)
            }
          >
            See all Ministries, Departments & Agencies
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
