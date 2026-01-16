import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Service } from '@/types/sanity'
import PageHeader from '@/components/PageHeader'

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery)

  // Group services by category
  const servicesByCategory = services.reduce((acc: Record<string, Service[]>, service: Service) => {
    const category = service.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(service)
    return acc
  }, {})

  const categoryNames: { [key: string]: string } = {
    haircut: 'Haircuts',
    color: 'Hair Color',
    treatment: 'Hair Treatments',
    styling: 'Styling',
    bridal: 'Bridal Services',
    mens: "Men's Services",
    other: 'Other Services',
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <PageHeader title="Our Services" description="Discover our range of professional hair services tailored to your needs" />
      <section className='mt-14'>
        <div className="container mx-auto px-4">



          {/* Services by Category */}
          {Object.entries(servicesByCategory).map(([category, categoryServices]) => {
            const services = categoryServices as Service[]
            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {categoryNames[category] || category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service: Service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug.current}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        {service.image && (
                          <div className="relative h-64 w-full">
                            <Image
                              src={urlFor(service.image).width(600).height(400).url()}
                              alt={service.image.alt || service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-pink-600 font-bold text-xl">
                              {service.price}
                            </span>
                            <span className="text-gray-500">
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          {/* CTA */}
          <div className="text-center mt-12">
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
