"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryItem } from "@/types/sanity";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export default function GallerySection({ galleryItems }: GallerySectionProps) {
  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  // Use all items or a slice, depending on preference. The original used slice(0,8).
  // For masonry, more items usually look better, but we'll stick to 8 or maybe 12 for the section.
  const displayItems = galleryItems.slice(0, 10);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-pink-600 font-medium uppercase tracking-wider mb-3">
              Our Masterpieces
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Style Gallery
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore our collection of stunning transformations and artistic styles.
              Each image tells a story of beauty and confidence.
            </p>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {displayItems.map((item: GalleryItem, index: number) => {
            // Calculate aspect ratio or default
            // If metadata is missing (old data), we fall back gracefully, but the new query fetches it.
            const imageUrl = item.image
              ? urlFor(item.image).width(800).auto("format").url()
              : "";

            // Calculate specific dimensions to prevent layout shift
            const dimensions = item.image?.asset?.metadata?.dimensions;
            const width = dimensions?.width || 800;
            const height = dimensions?.height || 600;

            if (!imageUrl) return null;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <Link
                  href="/gallery"
                  className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100"
                >
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt={item.title || "Gallery image"}
                      width={width}
                      height={height}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </p>
                      {item.category && (
                        <p className="text-pink-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {item.category}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Full Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
