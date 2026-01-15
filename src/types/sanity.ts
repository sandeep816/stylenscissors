// Type definitions for Sanity data
import {PortableTextBlock} from '@portabletext/types'

export interface Service {
  _id: string
  name: string
  slug: {current: string}
  description: string
  fullDescription?: PortableTextBlock[]
  price: string
  duration: number
  image?: {
    asset: {_ref: string}
    alt?: string
  }
  category: string
  featured?: boolean
  order?: number
}

export interface TeamMember {
  _id: string
  name: string
  slug: {current: string}
  role: string
  photo?: {
    asset: {_ref: string}
    alt?: string
  }
  bio?: PortableTextBlock[]
  specializations?: string[]
  experience?: number
  certifications?: string[]
  email?: string
  phone?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  availableForBooking?: boolean
  order?: number
}

export interface GalleryItem {
  _id: string
  title: string
  image: {
    asset: {_ref: string}
    alt?: string
  }
  beforeImage?: {
    asset: {_ref: string}
    alt?: string
  }
  afterImage?: {
    asset: {_ref: string}
    alt?: string
  }
  isBeforeAfter?: boolean
  service?: {
    _id: string
    name: string
    slug: {current: string}
  }
  category?: string
  featured?: boolean
  order?: number
}

export interface Testimonial {
  _id: string
  customerName: string
  customerPhoto?: {
    asset: {_ref: string}
    alt?: string
  }
  rating: number
  review: string
  service?: {
    _id: string
    name: string
    slug: {current: string}
  }
  date: string
  videoUrl?: string
  featured?: boolean
  order?: number
}

export interface FAQ {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category: string
  order?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: {current: string}
  author?: {
    _id: string
    name: string
    image?: {
      asset: {_ref: string}
      alt?: string
    }
    slug: {current: string}
    bio?: PortableTextBlock[]
  }
  mainImage?: {
    asset: {_ref: string}
    alt?: string
  }
  categories?: Array<{
    _id: string
    title: string
    slug: {current: string}
  }>
  excerpt?: string
  publishedAt: string
  body?: PortableTextBlock[]
}

export interface SiteSettings {
  salonName?: string
  logo?: {
    asset: {_ref: string}
    alt?: string
  }
  description?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  phone?: string
  email?: string
  businessHours?: Array<{
    day: string
    open?: string
    close?: string
    closed?: boolean
  }>
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
  }
  googleMapsEmbed?: string
  heroImage?: {
    asset: {_ref: string}
    alt?: string
  }
  heroTitle?: string
  heroSubtitle?: string
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  heroSection?: {
    title?: string
    subtitle?: string
    image?: {
      asset: {_ref: string}
      alt?: string
    }
  }
  aboutPreview?: {
    title?: string
    description?: string
  }
  whyChooseSection?: {
    label?: string
    title?: string
    subtitle?: string
    statistics?: Array<{
      number: string
      label: string
      icon: 'users' | 'clock' | 'award' | 'star'
    }>
    features?: Array<{
      title: string
      description: string
      icon: 'shield' | 'sparkle' | 'heart' | 'diamond'
    }>
  }
}
