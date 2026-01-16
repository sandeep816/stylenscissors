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
import { Star, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeaturedServices from "@/components/FeaturedServices";
import WhyChooseSection from "@/components/WhyChooseSection";
import GallerySection from "@/components/GallerySection";
import FeaturedTestimonials from "@/components/FeaturedTestimonials";
import CTASection from "@/components/CTASection";
import AboutPreviewSection from "@/components/AboutPreviewSection";

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

      <AboutPreviewSection aboutPreview={homePage?.aboutPreview} />

      <FeaturedServices services={featuredServices || []} />

      <WhyChooseSection whyChooseSection={homePage?.whyChooseSection} />



      <GallerySection galleryItems={featuredGallery || []} />

      <FeaturedTestimonials testimonials={featuredTestimonials || []} />


      <CTASection />
    </div>
  );
}
