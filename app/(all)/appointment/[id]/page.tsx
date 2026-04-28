'use client'

import { useRouter, useParams } from 'next/navigation'
import { AppointmentDetail } from '@/components/section/DetailSection/Appointment/AppointmentDetail'
import { mockAppointments } from '@/libs/sampleData'

export default function AppointmentPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const appointment = mockAppointments.find(a => a.id === id)

  if (!appointment) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Appointment Notice Not Found</h1>
        <p className="mb-6 text-gray-600">
          The requested appointment notice could not be located.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-[#003366] text-white rounded"
        >
          Go back home
        </button>
      </div>
    )
  }

  return (
    <AppointmentDetail
      noticeId={appointment.id}
      onNavigate={() => router.back()}
    />
  )
}
