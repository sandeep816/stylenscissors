import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import { Scissors } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  const siteSettings = await client.fetch(siteSettingsQuery)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center shadow-pink-100 group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5 text-white" />
            </div>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
             
            <Link
              href="/book-appointment"
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
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
