import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {testimonialsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import type {Testimonial} from '@/types/sanity'
import PageHeader from '@/components/PageHeader'

export default async function TestimonialsPage() {
  const testimonials = await client.fetch(testimonialsQuery)

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      {/* Header */}
      <PageHeader title="Testimonials" description="Don't just take our word for it. Here's what our valued clients have to say about their experience with us." />
      <section className='mt-14'>
      <div className="container mx-auto px-4">
        


        {/* Testimonials Grid */}
        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: Testimonial) => (
              <div
                key={testimonial._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {Array.from({length: testimonial.rating || 5}).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                    <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.review}&rdquo;</p>
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
                    {testimonial.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Testimonials coming soon!</p>
          </div>
        )}
      </div>
      </section>
    </div>
  )
}
