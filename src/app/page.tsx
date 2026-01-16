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
import { Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeaturedServices from "@/components/FeaturedServices";
import WhyChooseSection from "@/components/WhyChooseSection";
import GallerySection from "@/components/GallerySection";
import FeaturedTestimonials from "@/components/FeaturedTestimonials";
import CTASection from "@/components/CTASection";

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
      <HeroSection heroSection={homePage?.heroSection} />

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

      <FeaturedServices services={featuredServices || []} />

      <WhyChooseSection whyChooseSection={homePage?.whyChooseSection} />

 

      <GallerySection galleryItems={featuredGallery || []} />

      <FeaturedTestimonials testimonials={featuredTestimonials || []} />


      <CTASection />
    </div>
  );
}
