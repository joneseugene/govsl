'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HomeSection } from '@/components/ui/HomeSections';
import { ServicesInterface } from '@/libs/interface/service/services.interface';

interface ServiceCategoryMeta {
  name?: string;
  description?: string;
}

interface Props {
  categoryPage: string;
  services: ServicesInterface[];
  meta: ServiceCategoryMeta | null;
}

export default function ServicesSlugClient({ categoryPage, services, meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from');

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace('/services');
  };

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
              page: '/services',
            },
            {
              label: 'Services',
            },
          ]}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title={meta?.name || 'Category'}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={handleBack}
        />

        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No services found for this category.
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="
                  bg-white p-5
                  transition hover:border-gray-300 hover:bg-gray-50
                "
              >
                <Link
                  href={`/services/${categoryPage}/${service.id}?from=${encodeURIComponent(
                    `/services/${categoryPage}`,
                  )}`}
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
