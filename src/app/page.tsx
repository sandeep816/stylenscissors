import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {
  homePageQuery,
  siteSettingsQuery,
  featuredServicesQuery,
  featuredTestimonialsQuery,
  featuredGalleryQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type {
  Service,
  Testimonial,
  GalleryItem,
  HomePage,
} from "@/types/sanity";
import { Star } from "lucide-react";

export default async function Home() {
  const [
    homePage,
    siteSettings,
    featuredServices,
    featuredTestimonials,
    featuredGallery,
  ] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(featuredServicesQuery),
    client.fetch(featuredTestimonialsQuery),
    client.fetch(featuredGalleryQuery),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-linear-to-r from-pink-50 to-purple-50">
        {homePage?.heroSection?.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(homePage.heroSection.image).width(1920).height(600).url()}
              alt={homePage.heroSection.image.alt || "Hero"}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {homePage?.heroSection?.title || "Welcome to Style & Scissors"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {homePage?.heroSection?.subtitle ||
              "Your trusted destination for premium hair styling and exceptional service"}
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

      {/* About Preview Section */}
      {homePage?.aboutPreview && (
        <section className="py-16 bg-pink-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                {/* Image Grid - Now on Left */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop"
                    alt="Salon interior"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop"
                    alt="Hair styling"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img
                    src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop"
                    alt="Hair coloring"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img
                    src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=500&fit=crop"
                    alt="Salon treatment"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-background rounded-2xl shadow-elevated p-6 animate-fade-up z-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center shadow-pink-100">
                  <Star className="w-7 h-7 text-pink-500 fill-current" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">Client Rating</p>
                </div>
              </div>
            </div>

              </div>
              <div className="order-1 lg:order-2">
              <span className="font-medium tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {homePage.aboutPreview.title || "About Style & Scissors"}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                {homePage.aboutPreview.description}
              </p>
            <Link
              href="/about"
              className="text-pink-600 hover:text-pink-700 font-semibold text-lg inline-flex items-center gap-2"
            >
              Learn More About Us
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
              </div>
            </div>
            
        </div>
      </section>
      )}

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
                          src={urlFor(service.image)
                            .width(400)
                            .height(300)
                            .url()}
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
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
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

      {/* Why Choose Section */}
      {homePage?.whyChooseSection && (
        <section className="py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-[#8B6F47] text-sm font-medium uppercase tracking-wider mb-3">
                {homePage.whyChooseSection.label || "WHY US"}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {homePage.whyChooseSection.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {homePage.whyChooseSection.subtitle}
              </p>
            </div>

            {/* Statistics Section */}
            {homePage.whyChooseSection.statistics &&
              homePage.whyChooseSection.statistics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                  {homePage.whyChooseSection.statistics.map(
                    (
                      stat: {
                        number: string
                        label: string
                        icon: 'users' | 'clock' | 'award' | 'star'
                      },
                      index: number
                    ) => {
                      // Icon component based on type
                      const getIcon = () => {
                        switch (stat.icon) {
                          case 'users':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            )
                          case 'clock':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            )
                          case 'award':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                              </svg>
                            )
                          case 'star':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            )
                          default:
                            return null
                        }
                      }

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 shadow-sm text-center"
                        >
                          <div className="w-16 h-16 bg-[#8B6F47] rounded-lg flex items-center justify-center mx-auto mb-4">
                            {getIcon()}
                          </div>
                          <div className="text-4xl font-bold text-gray-900 mb-2">
                            {stat.number}
                          </div>
                          <div className="text-gray-600 text-sm">{stat.label}</div>
                        </div>
                      )
                    }
                  )}
                </div>
              )}

            {/* Features Section */}
            {homePage.whyChooseSection.features &&
              homePage.whyChooseSection.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {homePage.whyChooseSection.features.map(
                    (
                      feature: {
                        title: string
                        description: string
                        icon: 'shield' | 'sparkle' | 'heart' | 'diamond'
                      },
                      index: number
                    ) => {
                      // Icon component based on type
                      const getIcon = () => {
                        switch (feature.icon) {
                          case 'shield':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                            )
                          case 'sparkle':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                            )
                          case 'heart':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            )
                          case 'diamond':
                            return (
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                              </svg>
                            )
                          default:
                            return null
                        }
                      }

                      return (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 bg-[#8B6F47] rounded-lg flex items-center justify-center mx-auto mb-4">
                            {getIcon()}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      )
                    }
                  )}
                </div>
              )}
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
              {featuredTestimonials
                .slice(0, 3)
                .map((testimonial: Testimonial) => (
                  <div
                    key={testimonial._id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating || 5 }).map(
                        (_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ⭐
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
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
                    alt={item.title || "Gallery image"}
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
  );
}
