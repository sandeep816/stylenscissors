import { client } from '@/sanity/lib/client'
import { servicesQuery, availableTeamMembersQuery } from '@/sanity/lib/queries'
import BookingForm from '@/components/BookingForm'
import type { Service, TeamMember } from '@/types/sanity'

export default async function BookAppointmentPage() {
  const [services, teamMembers] = await Promise.all([
    client.fetch(servicesQuery),
    client.fetch(availableTeamMembersQuery),
  ])

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule your visit and let us help you look your best
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <BookingForm services={services} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}
