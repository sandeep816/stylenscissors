import {client} from '@/sanity/lib/client'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import type {SiteSettings} from '@/types/sanity'

export default async function ContactPage() {
  const siteSettings = await client.fetch(siteSettingsQuery)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us. We&apos;d love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>
            <div className="space-y-6">
              {siteSettings?.address && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    Address
                  </h3>
                  <p className="text-gray-700">
                    {siteSettings.address.street && (
                      <>{siteSettings.address.street}<br /></>
                    )}
                    {siteSettings.address.city && siteSettings.address.city}
                    {siteSettings.address.state && `, ${siteSettings.address.state}`}
                    {siteSettings.address.zipCode && ` ${siteSettings.address.zipCode}`}
                    {siteSettings.address.country && (
                      <><br />{siteSettings.address.country}</>
                    )}
                  </p>
                </div>
              )}

              {siteSettings?.phone && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    Phone
                  </h3>
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="text-pink-600 hover:text-pink-700 text-lg"
                  >
                    {siteSettings.phone}
                  </a>
                </div>
              )}

              {siteSettings?.email && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-pink-600 hover:text-pink-700 text-lg"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              )}

              {siteSettings?.businessHours && siteSettings.businessHours.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    Business Hours
                  </h3>
                  <div className="space-y-1 text-gray-700">
                    {siteSettings.businessHours.map((hours: {day: string; open?: string; close?: string; closed?: boolean}, idx: number) => (
                      <div key={idx} className="flex justify-between">
                        <span className="capitalize">{hours.day}:</span>
                        {hours.closed ? (
                          <span className="text-gray-500">Closed</span>
                        ) : (
                          <span>
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {siteSettings?.socialMedia && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {siteSettings.socialMedia.instagram && (
                      <a
                        href={siteSettings.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                        aria-label="Instagram"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {siteSettings.socialMedia.facebook && (
                      <a
                        href={siteSettings.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                        aria-label="Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        {siteSettings?.googleMapsEmbed && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Find Us
            </h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={siteSettings.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
