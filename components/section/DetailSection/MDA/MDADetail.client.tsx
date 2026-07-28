'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  getMdaDetail,
  getRelatedMdas,
  mdaDetailQueryKey,
  relatedMdaQueryKey,
} from '@/libs/query/detail/mda_detail.query';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

function safeJsonParse<T>(value: unknown): T | undefined {
  if (!value) return undefined;

  if (typeof value !== 'string') {
    return value as T;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

type MinisterInfo = {
  name?: string;
  title?: string;
  bio?: string;
};

export default function MdaDetailPage({ id }: Props) {
  const router = useRouter();

  const {
    data: mda,
    isLoading,
    isError,
  } = useQuery({
    queryKey: mdaDetailQueryKey(id),
    queryFn: () => getMdaDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { data: relatedAgencies = [] } = useQuery({
    queryKey: relatedMdaQueryKey(id),
    queryFn: () => getRelatedMdas(id),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  if (isLoading) {
    return (
      <HomeSection
        backgroundColor="gray"
        hasBorderTop={false}
        padding="small"
        className="min-h-screen"
      >
        <div className="mx-auto max-w-4xl py-20 text-center text-gray-500">Loading MDA...</div>
      </HomeSection>
    );
  }

  if (isError || !mda) {
    return (
      <HomeSection
        backgroundColor="gray"
        hasBorderTop={false}
        padding="small"
        className="min-h-screen"
      >
        <div className="mx-auto max-w-4xl py-20 text-center text-gray-500">
          MDA could not be loaded.
        </div>
      </HomeSection>
    );
  }

  const minister = safeJsonParse<MinisterInfo>(mda.minister);

  const deputy_minister = safeJsonParse<MinisterInfo>(mda.deputy_minister);

  return (
    <HomeSection
      backgroundColor="gray"
      hasBorderTop={false}
      padding="small"
      className="min-h-screen"
    >
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', page: '/' },
            { label: 'MDAs', page: '/mda' },
            { label: mda.acronym || mda.name },
          ]}
          variant="government"
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading
            level="h5"
            title={mda.name}
            fontWeight="font-normal"
            description="Ministries, Departments and Agencies"
            descriptionClassName="text-gray-400"
            descriptionSizeClassName="text-[16px]"
            showBack
            onBack={() => router.back()}
          />
        </div>

        {mda.mandate && (
          <div className="mt-8 w-full border border-gray-200 bg-gray-100 p-5">
            <h3 className="mb-4 font-heading text-2xl font-normal tracking-tight text-[#003366]">
              Mandate
            </h3>

            <p className="mt-1 font-body text-lg text-gray-600">{mda.mandate}</p>
          </div>
        )}

        {(mda.vision || mda.mission) && (
          <div className="mt-8 w-full border-t border-gray-200 p-5">
            <h3 className="mb-4 font-heading text-2xl font-normal tracking-tight text-[#003366]">
              About
            </h3>

            {mda.vision && (
              <div className="mt-5">
                <p className="font-body text-lg leading-relaxed text-gray-700">
                  <span className="mr-2 font-heading font-normal text-black">Vision:</span>
                  {mda.vision}
                </p>
              </div>
            )}

            {mda.mission && (
              <div className="mt-4">
                <p className="font-body text-lg leading-relaxed text-gray-700">
                  <span className="mr-2 font-heading font-normal text-black">Mission:</span>
                  {mda.mission}
                </p>
              </div>
            )}
          </div>
        )}

        {(minister || deputy_minister) && (
          <div className="mt-5 w-full border-t border-gray-200 p-5">
            {minister && (
              <div>
                <h3 className="mb-4 font-heading text-2xl font-normal tracking-tight text-[#003366]">
                  Minister
                </h3>

                {minister.name && (
                  <p className="mt-2 font-heading text-lg font-normal text-gray-900">
                    {minister.name}
                  </p>
                )}

                {minister.title && (
                  <p className="mt-1 font-heading text-lg font-normal text-gray-900">
                    {minister.title}
                  </p>
                )}

                {minister.bio && (
                  <p className="mt-4 font-body text-lg leading-relaxed text-gray-700">
                    {minister.bio}
                  </p>
                )}
              </div>
            )}

            {deputy_minister && (
              <div className="mt-8">
                <h3 className="mb-4 font-heading text-2xl font-normal tracking-tight text-[#003366]">
                  Deputy Minister
                </h3>

                {deputy_minister.name && (
                  <p className="mt-2 font-heading text-lg font-normal text-gray-900">
                    {deputy_minister.name}
                  </p>
                )}

                {deputy_minister.title && (
                  <p className="mt-1 font-heading text-lg font-normal text-gray-600">
                    {deputy_minister.title}
                  </p>
                )}

                {deputy_minister.bio && (
                  <p className="mt-4 font-body text-lg leading-relaxed text-gray-700">
                    {deputy_minister.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {mda.contact && (
          <div className="mt-5 w-full border border-gray-200 p-5">
            <h3 className="mb-4 font-heading text-2xl font-normal tracking-tight text-[#003366]">
              Contact Information
            </h3>

            <div className="space-y-3 text-sm text-gray-700">
              {mda.contact.email && (
                <p className="font-body text-lg text-gray-900">
                  <span className="font-bold">Email:</span> {mda.contact.email}
                </p>
              )}

              {mda.contact.phone && (
                <p className="font-body text-lg text-gray-900">
                  <span className="font-bold">Phone:</span> {mda.contact.phone}
                </p>
              )}

              {mda.contact.address && (
                <p className="font-body text-lg text-gray-900">
                  <span className="font-bold">Address:</span> {mda.contact.address}
                </p>
              )}

              {mda.contact.website && (
                <p className="font-body text-lg text-gray-900">
                  <span className="font-bold">Website: </span>

                  <a
                    href={mda.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-700 hover:underline"
                  >
                    {mda.contact.website}
                  </a>
                </p>
              )}

              {mda.contact.hours && (
                <p className="font-body text-lg text-gray-900">
                  <span className="font-bold">Office Hours:</span> {mda.contact.hours}
                </p>
              )}
            </div>
          </div>
        )}

        {relatedAgencies.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-normal text-[#003366]">
                Related Agencies ({relatedAgencies.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {relatedAgencies.map((agency) => (
                <button
                  key={agency.id}
                  type="button"
                  onClick={() => router.push(`/mda/${agency.id}`)}
                  className="text-left"
                >
                  <h3 className="line-clamp-2 font-body text-lg font-normal text-[#1D70B8]">
                    {agency.name}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </HomeSection>
  );
}
