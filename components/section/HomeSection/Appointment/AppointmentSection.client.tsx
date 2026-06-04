'use client';

import { useRouter } from 'next/navigation';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { AppointmentItem } from './AppointmentItem';
import { homeSections } from '@/libs/consts/home.const';
import { appointmentQueryKey, getHomeAppointments } from '@/libs/query/home/appointment.query';
import { useQuery } from '@tanstack/react-query';

export default function AppointmentSectionClient() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: appointmentQueryKey,
    queryFn: getHomeAppointments,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = data?.data ?? [];

  return (
    <HomeSection id={homeSections.appointment.id} className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Appointment Notices"
          description="Official government appointments, designations and public service notices."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {isLoading ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Loading appointment notices...
          </div>
        ) : isError ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Appointment notices could not be loaded.
          </div>
        ) : items.length === 0 ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            No recent appointment notices available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {items.map((item, index) => (
              <AppointmentItem
                key={`${item.id ?? 'appointment'}-${item.reference_number ?? index}`}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        <div className="mt-1 flex">
          <ViewAllButton onClick={() => router.push(homeSections.appointment.routes.all)}>
            See all Appointment Notices
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
