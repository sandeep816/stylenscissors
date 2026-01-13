import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'

export default async function Header() {
  const siteSettings = await client.fetch(siteSettingsQuery)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {siteSettings?.logo ? (
              <Image
                src={urlFor(siteSettings.logo).width(150).height(50).url()}
                alt={siteSettings.salonName || 'Logo'}
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {siteSettings?.salonName || 'Style & Scissors'}
              </span>
            )}
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/team"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Our Team
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/book-appointment"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-medium"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
