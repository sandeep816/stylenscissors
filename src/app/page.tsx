import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {
  siteSettingsQuery,
  featuredServicesQuery,
  featuredTestimonialsQuery,
  featuredGalleryQuery,
} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import type {Service, Testimonial, GalleryItem} from '@/types/sanity'

export default async function Home() {
  const [siteSettings, featuredServices, featuredTestimonials, featuredGallery] =
    await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(featuredServicesQuery),
      client.fetch(featuredTestimonialsQuery),
      client.fetch(featuredGalleryQuery),
    ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50">
        {siteSettings?.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(siteSettings.heroImage).width(1920).height(600).url()}
              alt={siteSettings.heroImage.alt || 'Hero'}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {siteSettings?.heroTitle || 'Welcome to Style & Scissors'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {siteSettings?.heroSubtitle ||
              'Your trusted destination for premium hair styling and exceptional service'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-appointment"
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-pink-600"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {featuredServices && featuredServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.slice(0, 3).map((service: Service) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    {service.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={urlFor(service.image).width(400).height(300).url()}
                          alt={service.image.alt || service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-pink-600 font-bold text-lg">
                          {service.price}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {service.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="text-pink-600 hover:text-pink-700 font-semibold text-lg"
              >
                View All Services →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Testimonials */}
      {featuredTestimonials && featuredTestimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.slice(0, 3).map((testimonial: Testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {Array.from({length: testimonial.rating || 5}).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.review}&rdquo;</p>
                  <div className="flex items-center">
                    {testimonial.customerPhoto && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={urlFor(testimonial.customerPhoto)
                            .width(48)
                            .height(48)
                            .url()}
                          alt={testimonial.customerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.customerName}
                      </p>
                      {testimonial.service && (
                        <p className="text-sm text-gray-600">
                          {testimonial.service.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/testimonials"
                className="text-pink-600 hover:text-pink-700 font-semibold text-lg"
              >
                Read More Reviews →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {featuredGallery && featuredGallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Our Work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredGallery.slice(0, 8).map((item: GalleryItem) => (
                <Link
                  key={item._id}
                  href="/gallery"
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={urlFor(item.image).width(400).height(400).url()}
                    alt={item.title || 'Gallery image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/gallery"
                className="text-pink-600 hover:text-pink-700 font-semibold text-lg"
              >
                View Full Gallery →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for a New Look?</h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience the difference
          </p>
          <Link
            href="/book-appointment"
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
