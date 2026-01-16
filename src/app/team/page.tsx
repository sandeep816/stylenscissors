import { client } from '@/sanity/lib/client'
import { teamMembersQuery } from '@/sanity/lib/queries'
import type { TeamMember } from '@/types/sanity'
import PageHeader from '@/components/PageHeader'
import TeamGrid from '@/components/TeamGrid'
import Link from 'next/link'

export default async function TeamPage() {
  const teamMembers = await client.fetch(teamMembersQuery)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader title="Our Team" description="Meet our talented team of professional stylists" />
      <section className='mt-14'>
        <div className="container mx-auto px-4">

          {/* Team Grid Client Component */}
          <TeamGrid members={teamMembers} />

          {/* CTA */}
          <div className="text-center pb-20">
            <p className="text-lg text-gray-700 mb-6">
              Ready to book with one of our talented stylists?
            </p>
            <Link
              href="/book-appointment"
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
