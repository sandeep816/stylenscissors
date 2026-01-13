# Style & Scissors - Professional Hair Salon Website

A modern, professional hair salon website built with Next.js 16 and Sanity CMS. This project showcases a complete salon website with online booking, service management, team profiles, gallery, testimonials, and blog functionality.

## 🚀 Features

### Core Features
- **Home Page** - Hero section with featured services, testimonials, and gallery preview
- **About Us** - Salon information and why choose us section
- **Our Team** - Team member profiles with specializations and social links
- **Services** - Complete service listing with categories, pricing, and duration
- **Gallery** - Image gallery with before/after support and category filters
- **Testimonials** - Customer reviews with star ratings
- **FAQ** - Frequently asked questions organized by category
- **Blog** - Blog posts with categories, authors, and related posts
- **Book Appointment** - Online booking form with service and team member selection
- **Contact Us** - Contact form, business hours, and Google Maps integration

### Technical Features
- ✅ **Next.js 16** with App Router
- ✅ **Sanity CMS** for content management
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** for styling
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Proper metadata and semantic HTML
- ✅ **Image Optimization** - Sanity Image URL builder
- ✅ **Portable Text** - Rich text content rendering
- ✅ **Server-Side Rendering** - Fast page loads

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A Sanity account (free tier available)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandeep816/stylenscissors.git
   cd stylenscissors
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-13
   ```

   See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions on getting your Sanity credentials.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   - Website: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📁 Project Structure

```
stylenscissors/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About Us page
│   │   ├── blog/               # Blog pages
│   │   ├── book-appointment/   # Booking page
│   │   ├── contact/            # Contact page
│   │   ├── faq/                # FAQ page
│   │   ├── gallery/            # Gallery page
│   │   ├── services/           # Services pages
│   │   ├── team/               # Team page
│   │   ├── testimonials/       # Testimonials page
│   │   └── studio/             # Sanity Studio
│   ├── components/             # React components
│   │   ├── Header.tsx          # Site header
│   │   └── Footer.tsx          # Site footer
│   ├── lib/                    # Utility functions
│   │   └── portableText.tsx   # Portable Text renderer
│   ├── sanity/                 # Sanity configuration
│   │   ├── lib/                # Sanity utilities
│   │   │   ├── client.ts      # Sanity client
│   │   │   ├── queries.ts     # GROQ queries
│   │   │   └── image.ts       # Image URL builder
│   │   └── schemaTypes/       # Sanity schemas
│   │       ├── serviceType.ts
│   │       ├── teamMemberType.ts
│   │       ├── galleryType.ts
│   │       ├── testimonialType.ts
│   │       ├── faqType.ts
│   │       ├── appointmentType.ts
│   │       ├── siteSettingsType.ts
│   │       └── ...
│   └── types/                  # TypeScript types
│       └── sanity.ts           # Sanity type definitions
├── public/                     # Static assets
├── sanity.config.ts           # Sanity Studio config
└── package.json               # Dependencies
```

## 🎨 Sanity CMS Setup

1. **Access Sanity Studio**
   
   Navigate to `http://localhost:3000/studio` after starting the dev server.

2. **Create Site Settings** (Required First Step)
   
   - Go to "Site Settings" in the Studio
   - Fill in your salon name, contact information, and business hours
   - Upload your logo and hero image

3. **Add Content**
   
   - **Services**: Add your salon services with pricing and duration
   - **Team Members**: Add staff profiles with photos and specializations
   - **Gallery**: Upload before/after images
   - **Testimonials**: Add customer reviews
   - **FAQ**: Add frequently asked questions
   - **Blog Posts**: Create blog content

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your deployment platform.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [@sanity/icons](https://www.sanity.io/docs/icons)
- **Rich Text**: [@portabletext/react](https://portabletext.dev/)

## 📄 Content Types

The website supports the following Sanity content types:

- **Site Settings** - Global site configuration
- **Services** - Salon services with pricing
- **Team Members** - Staff profiles
- **Gallery** - Image gallery with before/after
- **Testimonials** - Customer reviews
- **FAQ** - Frequently asked questions
- **Appointments** - Booking records
- **Blog Posts** - Blog content
- **Authors** - Blog authors
- **Categories** - Content categories

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

**Author**: Sandeep Sharma  
**Email**: Sandeep816@gmail.com  
**Repository**: [https://github.com/sandeep816/stylenscissors](https://github.com/sandeep816/stylenscissors)

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Complete project plan
- [Phase 1 Complete](./PHASE1_COMPLETE.md) - Schema setup details
- [Phase 2 Complete](./PHASE2_COMPLETE.md) - Pages implementation
- [Environment Setup](./ENV_SETUP.md) - Environment variables guide
- [Quick Reference](./QUICK_REFERENCE.md) - Quick feature reference

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Content managed with [Sanity](https://www.sanity.io/)
- Icons from [@sanity/icons](https://www.sanity.io/docs/icons)

---

**Made with ❤️ by Sandeep Sharma**
