'use client';

import { PressReleaseItem } from '@/components/section/HomeSection/PressRelease/PressReleaseItem';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ViewAllButton } from '@/components/ui/ViewAllUI';
import { homeSections } from '@/libs/consts/home.const';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { useRouter } from 'next/navigation';

type PressReleaseResponse =
  | PressReleaseInterface[]
  | {
      data?: PressReleaseInterface[];
    };

type Props = {
  initialData: PressReleaseResponse;
};

export default function PressReleaseSectionClient({ initialData }: Props) {
  const router = useRouter();

  const items: PressReleaseInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

  return (
    <HomeSection id={homeSections.pressRelease.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Latest Press Releases"
          description="Official communications from Government of Sierra Leone"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        <div className="space-y-14">
          {items.length === 0 ? (
            <p className="text-[19px] italic text-[#505A5F]">
              No recent updates available at this time.
            </p>
          ) : (
            <div className="space-y-12 sm:space-y-14">
              {items.map((item, index) => (
                <PressReleaseItem
                  key={
                    item.id ??
                    `${item.title}-${index}`
                  }
                  item={item}
                  onNavigate={(path) => router.push(path)}
                />
              ))}
            </div>
          )}
        </div>

        <ViewAllButton
          onClick={() =>
            router.push(
              `${homeSections.pressRelease.routes.all}?from=%2F%23${homeSections.pressRelease.id}`,
            )
          }
        >
          See all Press Releases
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}