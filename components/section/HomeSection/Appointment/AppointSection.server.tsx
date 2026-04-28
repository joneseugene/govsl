import AppointmentSectionClient from './AppointmentSection.client'
import { getAppointments } from '@/libs/api/appointments.api'

export default async function AppointmentSectionServer() {
    const appointments = await getAppointments()
    
    console.log("Appointments: ", appointments)

    return (
        <AppointmentSectionClient
            appointments={appointments}
        />
    )
}