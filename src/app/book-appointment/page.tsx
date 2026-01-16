import { client } from '@/sanity/lib/client'
import { servicesQuery, availableTeamMembersQuery } from '@/sanity/lib/queries'
import BookingForm from '@/components/BookingForm'
import type { Service, TeamMember } from '@/types/sanity'
import PageHeader from '@/components/PageHeader'

export default async function BookAppointmentPage() {
  const [services, teamMembers] = await Promise.all([
    client.fetch(servicesQuery),
    client.fetch(availableTeamMembersQuery),
  ])

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <PageHeader title="Book an Appointment" description="Schedule your visit and let us help you look your best" />
      <section className='mt-14'>
        <div className="container mx-auto px-4">
          {/* Booking Form */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <BookingForm services={services} teamMembers={teamMembers} />
          </div>
        </div>
      </section>
    </div>
  )
}
