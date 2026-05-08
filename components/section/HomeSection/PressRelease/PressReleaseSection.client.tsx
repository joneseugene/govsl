'use client';

import { PressReleaseItem } from '@/components/section/HomeSection/PressRelease/PressReleaseItem';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ViewAllButton } from '@/components/ui/ViewAllUI';
import { homeSections } from '@/libs/consts/home.const';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { useRouter } from 'next/navigation';

export default function PressReleaseSectionClient({ items }: { items: PressReleaseInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.pressRelease.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h2"
          title="Press Releases"
          description="Official communications from Government of Sierra Leone"
        />

        <div className="space-y-14">
          {items.length === 0 ? (
            <p className="text-[19px] text-[#505A5F] italic">
              No recent updates available at this time.
            </p>
          ) : (
            <div className="space-y-12 sm:space-y-14">
              {items.map((item) => (
                <PressReleaseItem
                  key={item.id}
                  item={item}
                  onNavigate={(path) => router.push(path)}
                />
              ))}
            </div>
          )}
        </div>

        <ViewAllButton onClick={() => router.push(homeSections.pressRelease.routes.all)}>
          See all Press Releases
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
