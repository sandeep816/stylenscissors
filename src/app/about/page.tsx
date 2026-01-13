import {client} from '@/sanity/lib/client'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

export default async function AboutPage() {
  const siteSettings = await client.fetch(siteSettingsQuery)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn more about {siteSettings?.salonName || 'Style & Scissors'} and our
            commitment to excellence
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Image Section */}
          {siteSettings?.heroImage && (
            <div className="relative h-96 w-full mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(siteSettings.heroImage).width(1200).height(600).url()}
                alt="About us"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* About Text */}
          <div className="prose prose-lg max-w-none mb-12">
            {siteSettings?.description ? (
              <p className="text-lg text-gray-700 leading-relaxed">
                {siteSettings.description}
              </p>
            ) : (
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Welcome to {siteSettings?.salonName || 'Style & Scissors'}, where
                  beauty meets expertise. We are passionate about helping you look and
                  feel your best.
                </p>
                <p>
                  With years of experience in the industry, our team of skilled
                  professionals is dedicated to providing exceptional service and
                  creating stunning looks tailored to your unique style.
                </p>
                <p>
                  We believe that every client deserves personalized attention and
                  premium quality service. From classic cuts to the latest trends, we
                  stay ahead of the curve to bring you the best in hair care and
                  styling.
                </p>
              </div>
            )}
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Expert Stylists
              </h3>
              <p className="text-gray-600">
                Our team consists of highly trained and experienced professionals
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Premium Products
              </h3>
              <p className="text-gray-600">
                We use only the finest quality products for your hair
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Personalized Service
              </h3>
              <p className="text-gray-600">
                Every service is tailored to meet your individual needs
              </p>
            </div>
          </div>

          {/* Contact Info */}
          {siteSettings && (
            <div className="bg-pink-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Visit Us
              </h2>
              <div className="space-y-2 text-gray-700">
                {siteSettings.address && (
                  <p>
                    {siteSettings.address.street && (
                      <>{siteSettings.address.street}<br /></>
                    )}
                    {siteSettings.address.city && siteSettings.address.city}
                    {siteSettings.address.state && `, ${siteSettings.address.state}`}
                    {siteSettings.address.zipCode && ` ${siteSettings.address.zipCode}`}
                  </p>
                )}
                {siteSettings.phone && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${siteSettings.phone}`} className="text-pink-600 hover:underline">
                      {siteSettings.phone}
                    </a>
                  </p>
                )}
                {siteSettings.email && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${siteSettings.email}`} className="text-pink-600 hover:underline">
                      {siteSettings.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
