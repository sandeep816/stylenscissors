"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { HomePage } from "@/types/sanity";
import { motion } from "framer-motion";

interface HeroSectionProps {
  heroSection?: HomePage["heroSection"];
}

export default function HeroSection({ heroSection }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50 overflow-hidden">
      {heroSection?.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(heroSection.image).width(1920).height(600).url()}
            alt={heroSection.image.alt || "Hero"}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display"
        >
          {heroSection?.title || "Welcome to Style & Scissors"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          {heroSection?.subtitle ||
            "Your trusted destination for premium hair styling and exceptional service"}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/book-appointment"
            className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 hover:shadow-lg transition-all border-2 border-pink-600 transform hover:-translate-y-1"
          >
            View Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
