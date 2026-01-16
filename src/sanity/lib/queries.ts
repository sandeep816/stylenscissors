import { groq } from 'next-sanity'

// Site Settings (singleton)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

// Home Page (singleton)
export const homePageQuery = groq`*[_type == "homePage"][0]`

// Services
export const servicesQuery = groq`*[_type == "service"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  description,
  fullDescription,
  price,
  duration,
  image,
  category,
  featured,
  order
}`

export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc) {
  _id,
  name,
  slug,
  description,
  price,
  duration,
  image,
  category
}`

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  fullDescription,
  price,
  duration,
  image,
  category,
  featured
}`

// Team Members
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  role,
  photo,
  bio,
  specializations,
  experience,
  certifications,
  email,
  phone,
  socialLinks,
  availableForBooking,
  order
}`

export const teamMemberBySlugQuery = groq`*[_type == "teamMember" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  role,
  photo,
  bio,
  specializations,
  experience,
  certifications,
  email,
  phone,
  socialLinks,
  availableForBooking
}`

export const availableTeamMembersQuery = groq`*[_type == "teamMember" && availableForBooking == true] | order(order asc, name asc) {
  _id,
  name,
  slug,
  role,
  photo,
  specializations
}`

// Gallery
export const galleryItemsQuery = groq`*[_type == "gallery"] | order(order asc, title asc) {
  _id,
  title,
  image {
    asset-> {
      _id,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  },
  beforeImage,
  afterImage,
  isBeforeAfter,
  service->{
    _id,
    name,
    slug
  },
  category,
  featured,
  order
}`

export const featuredGalleryQuery = groq`*[_type == "gallery" && featured == true] | order(order asc) {
  _id,
  title,
  image {
    asset-> {
      _id,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  },
  beforeImage,
  afterImage,
  isBeforeAfter,
  service->{
    _id,
    name,
    slug
  },
  category
}`

export const galleryByCategoryQuery = groq`*[_type == "gallery" && category == $category] | order(order asc) {
  _id,
  title,
  image,
  beforeImage,
  afterImage,
  isBeforeAfter,
  service->{
    _id,
    name,
    slug
  },
  category
}`

export const beforeAfterGalleryQuery = groq`*[_type == "gallery" && isBeforeAfter == true] | order(order asc) {
  _id,
  title,
  beforeImage,
  afterImage,
  service->{
    _id,
    name,
    slug
  },
  category
}`

// Testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc, date desc) {
  _id,
  customerName,
  customerPhoto,
  rating,
  review,
  service->{
    _id,
    name,
    slug
  },
  date,
  videoUrl,
  featured,
  order
}`

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc, date desc) {
  _id,
  customerName,
  customerPhoto,
  rating,
  review,
  service->{
    _id,
    name,
    slug
  },
  date,
  videoUrl
}`

// FAQ
export const faqsQuery = groq`*[_type == "faq"] | order(order asc, question asc) {
  _id,
  question,
  answer,
  category,
  order
}`

export const faqsByCategoryQuery = groq`*[_type == "faq" && category == $category] | order(order asc) {
  _id,
  question,
  answer,
  category,
  order
}`

// Blog Posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    image,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  excerpt,
  publishedAt,
  body
}`

export const featuredPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    image,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  excerpt,
  publishedAt
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    image,
    slug,
    bio
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  excerpt,
  publishedAt,
  body
}`

export const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    image,
    slug
  },
  mainImage,
  excerpt,
  publishedAt
}`

// Appointments
export const appointmentsQuery = groq`*[_type == "appointment"] | order(appointmentDate asc) {
  _id,
  customerName,
  customerEmail,
  customerPhone,
  service->{
    _id,
    name,
    slug
  },
  teamMember->{
    _id,
    name,
    slug,
    role
  },
  appointmentDate,
  status,
  notes,
  internalNotes
}`

export const upcomingAppointmentsQuery = groq`*[_type == "appointment" && appointmentDate >= now() && status != "cancelled"] | order(appointmentDate asc) {
  _id,
  customerName,
  customerEmail,
  customerPhone,
  service->{
    _id,
    name,
    slug
  },
  teamMember->{
    _id,
    name,
    slug,
    role
  },
  appointmentDate,
  status,
  notes
}`
