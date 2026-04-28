'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { AppointmentItem } from './AppointmentItem';
import { useRouter } from 'next/navigation';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';

export default function AppointmentSectionClient({ items }: { items: AppointmentInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.appointment.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h2"
          title="Appointment Notices"
          description="Official government appointments and designations"
        />

        {/* CONTENT */}
        {items.length === 0 ? (
          <div className="text-center py-16 text-[19px] text-[#505A5F] italic">
            No recent appointment notices to display.
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {items.map((item) => (
              <AppointmentItem key={item.id} item={item} onNavigate={(path) => router.push(path)} />
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        <ViewAllButton onClick={() => router.push(homeSections.appointment.routes.all)}>
          See all Appointments
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
