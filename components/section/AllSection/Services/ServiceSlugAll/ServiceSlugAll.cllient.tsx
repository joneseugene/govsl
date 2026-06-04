'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HomeSection } from '@/components/ui/HomeSections';
import { ServicesInterface } from '@/libs/interface/service/services.interface';
import {
  getServiceCategoryBySlug,
  serviceSlugQueryKey,
} from '@/libs/query/all/service_all_slug.query';

interface Props {
  categoryPage: string;
}

export default function ServicesSlugClient({ categoryPage }: Props) {
  const router = useRouter();

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: serviceSlugQueryKey({
      categoryPage,
    }),
    queryFn: () =>
      getServiceCategoryBySlug({
        categoryPage,
      }),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const services = result?.data ?? [];

  return (
    <HomeSection>
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            {
              label: 'Home',
              page: '/',
            },
            {
              label: 'Categories',
              page: '/service',
            },
            {
              label: 'Services',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title={result?.meta?.name || 'Category'}
          description={result?.meta?.description || ''}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-4">
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading services...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Services could not be loaded.
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No services found for this category.
            </div>
          ) : (
            services.map((service: ServicesInterface) => (
              <div
                key={service.id}
                className="
                  rounded-xl border border-gray-200
                  bg-white p-5
                  transition hover:border-gray-300 hover:bg-gray-50
                "
              >
                <Link
                  href={`/service/${categoryPage}/${service.id}`}
                  className="
                    text-[18px] font-medium text-[#1D70B8]
                    transition-colors hover:underline
                    hover:underline-offset-4
                    sm:text-[18px]
                    md:text-[19px]
                    lg:text-[20px]
                  "
                >
                  {service.name}
                </Link>

                {service.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </HomeSection>
  );
}
