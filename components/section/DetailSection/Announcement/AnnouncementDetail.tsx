'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  announcementDetailQueryKey,
  getAnnouncementDetail,
} from '@/libs/query/detail/announcement_detail.query';
import { RichContent } from '@/utils/richContent';

interface Props {
  id: string;
}

export default function AnnouncementDetailPage({ id }: Props) {
  const router = useRouter();

  const {
    data: announcement,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: announcementDetailQueryKey(id),
    queryFn: () => getAnnouncementDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const formattedDate = useMemo(() => {
    if (!announcement?.date) return null;

    const parsed = new Date(announcement.date);
    if (isNaN(parsed.getTime())) return null;

    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
}, [announcement]);

  if (isLoading) {
    return (
      <HomeSection>
        <div className="mx-auto max-w-4xl py-20 text-center text-gray-500">
          Loading announcement...
        </div>
      </HomeSection>
    );
  }

  if (isError || !announcement) {
    return (
      <HomeSection>
        <div className="mx-auto max-w-4xl py-20 text-center text-gray-500">
          Announcement could not be loaded.
        </div>
      </HomeSection>
    );
  }

  return (
    <HomeSection>
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', page: '/' },
            { label: 'Announcements', page: '/announcement' },
            { label: announcement.title || 'Announcement' },
          ]}
          variant="government"
        />

        <div className="mb-4 flex flex-wrap items-center gap-3">
          {announcement.announcement_type && (
            <span className="bg-[#F3F2F1] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#0B0C0C]">
              {announcement.announcement_type}
            </span>
          )}

          {announcement.status && (
            <span className="text-sm font-medium text-[#008A3C]">✓ {announcement.status}</span>
          )}
        </div>

        {announcement.mdas?.name && (
          <p className="mb-2 text-[18px] text-[#505A5F]">{announcement.mdas.name}</p>
        )}

        {formattedDate && (
          <p className="mb-6 text-[18px] text-[#505A5F]">Published: {formattedDate}</p>
        )}

        <SectionHeading
          level="h4"
          title={announcement.title || 'Announcement'}
          description={announcement.description}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
        />

        {announcement.content && (
          <div className="mt-8 whitespace-pre-line text-[18px] leading-8 text-gray-800">
            <RichContent content={announcement.content} />
          </div>
        )}

        {announcement.announcement_type === 'vacancy' && (
          <div className="mt-10 space-y-6 border-t border-gray-200 pt-6">
            {announcement.job_title && <Detail label="Job Title" value={announcement.job_title} />}

            {announcement.employment_type && (
              <Detail label="Employment Type" value={announcement.employment_type} />
            )}

            {announcement.job_summary && <RichContent content={announcement.job_summary} />}

            {announcement.key_responsibilities && (
              <RichContent content={announcement.key_responsibilities} />
            )}

            {announcement.education_experience && (
              <RichContent content={announcement.education_experience} />
            )}

            {announcement.skills && <Detail label="Skills" value={announcement.skills} />}

            {announcement.how_to_apply && <RichContent content={announcement.how_to_apply} />}
          </div>
        )}

        {announcement.announcement_type === 'event' && (
          <div className="mt-10 space-y-6 border-t border-gray-200 pt-6">
            {announcement.event_date && (
              <Detail label="Event Date" value={announcement.event_date} />
            )}

            {announcement.event_time && (
              <Detail label="Event Time" value={announcement.event_time} />
            )}

            {announcement.location && <Detail label="Location" value={announcement.location} />}

            {announcement.event_type && (
              <Detail label="Event Type" value={announcement.event_type} />
            )}

            {(announcement.contact_email || announcement.contact_phone) && (
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="mb-4 font-heading text-2xl font-normal text-[#003366]">Contact</h3>

                {announcement.contact_email && (
                  <p className="text-lg text-gray-800">
                    <strong>Email:</strong> {announcement.contact_email}
                  </p>
                )}

                {announcement.contact_phone && (
                  <p className="mt-2 text-lg text-gray-800">
                    <strong>Phone:</strong> {announcement.contact_phone}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {announcement.announcement_type === 'notice' && (
          <div className="mt-10 space-y-6 border-t border-gray-200 pt-6">
            {announcement.notice_type && (
              <Detail label="Notice Type" value={announcement.notice_type} />
            )}

            {announcement.expiry_date && (
              <Detail label="Expiry Date" value={announcement.expiry_date} />
            )}

            {announcement.contact_info && (
              <Detail label="Contact Info" value={announcement.contact_info} />
            )}

            {(announcement.contact_email || announcement.contact_phone) && (
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="mb-4 font-heading text-2xl font-normal text-[#003366]">Contact</h3>

                {announcement.contact_email && (
                  <p className="text-lg text-gray-800">
                    <strong>Email:</strong> {announcement.contact_email}
                  </p>
                )}

                {announcement.contact_phone && (
                  <p className="mt-2 text-lg text-gray-800">
                    <strong>Phone:</strong> {announcement.contact_phone}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </HomeSection>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <h3 className="mb-2 font-heading text-2xl font-normal text-[#003366]">{label}</h3>
      <p className="whitespace-pre-line text-lg leading-8 text-gray-700">{value}</p>
    </div>
  );
}
