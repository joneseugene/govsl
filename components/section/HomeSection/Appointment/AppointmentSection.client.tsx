'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { AppointmentItem } from './AppointmentItem';
import { useRouter } from 'next/navigation';
import { AppointmentSummaryInterface } from '@/libs/interface/appointments.interface';

export default function AppointmentSectionClient({
  items,
}: {
  items: AppointmentSummaryInterface[];
}) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.appointment.id} className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          level="h2"
          title="Appointment Notices"
          description="Official government appointments, designations and public service notices."
        />

        {/* CONTENT */}
        {items.length === 0 ? (
          <div
            className="
              rounded-2xl border border-slate-200
              bg-white py-16 text-center
              text-[18px] italic text-[#505A5F]
              shadow-sm
            "
          >
            No recent appointment notices available.
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1
              gap-5 lg:gap-6
            "
          >
            {items.map((item, index) => (
              <AppointmentItem
                key={`${item.id ?? 'appointment'}-${item.appointment_date}-${index}`}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        <div className="mt-1 flex">
          <ViewAllButton onClick={() => router.push(homeSections.appointment.routes.all)}>
            See all Appointment Notices
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
