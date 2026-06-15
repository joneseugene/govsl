'use client';

import { useRouter } from 'next/navigation';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { AppointmentItem } from './AppointmentItem';
import { homeSections } from '@/libs/consts/home.const';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';

type AppointmentResponse =
  | AppointmentInterface[]
  | {
      data?: AppointmentInterface[];
    };

type Props = {
  initialData: AppointmentResponse;
};

export default function AppointmentSectionClient({ initialData }: Props) {
  const router = useRouter();

  const items: AppointmentInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

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

        {items.length === 0 ? (
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
          <ViewAllButton
            onClick={() =>
              router.push(
                `${homeSections.appointment.routes.all}?from=%2F%23${homeSections.appointment.id}`,
              )
            }
          >
            See all Appointment Notices
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
