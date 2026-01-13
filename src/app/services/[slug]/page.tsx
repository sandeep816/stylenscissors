import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {serviceBySlugQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@/lib/portableText'

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const service = await client.fetch(serviceBySlugQuery, {slug})

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/services"
          className="text-pink-600 hover:text-pink-700 mb-6 inline-block"
        >
          ← Back to Services
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.name}
            </h1>
            <div className="flex items-center gap-4 text-lg">
              <span className="text-pink-600 font-bold">{service.price}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{service.duration} minutes</span>
              {service.category && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 capitalize">{service.category}</span>
                </>
              )}
            </div>
          </div>

          {/* Image */}
          {service.image && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={urlFor(service.image).width(1200).height(600).url()}
                alt={service.image.alt || service.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <p className="text-xl text-gray-700 mb-6">{service.description}</p>
            {service.fullDescription && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={service.fullDescription} />
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-pink-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Ready to Book?
            </h2>
            <p className="text-gray-700 mb-6">
              Schedule your appointment and experience our premium service
            </p>
            <Link
              href={`/book-appointment?service=${service.slug.current}`}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
            >
              Book This Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
