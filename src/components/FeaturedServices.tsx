"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Service } from "@/types/sanity";
import { motion } from "framer-motion";

interface FeaturedServicesProps {
  services: Service[];
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-pink-600 text-sm font-bold uppercase tracking-wider mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Discover Our Expertly Crafted Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From precision haircuts to luxurious treatments, each service is
              designed to enhance your natural beauty and leave you feeling
              refreshed and confident.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.slice(0, 3).map((service: Service) => (
            <motion.div key={service._id} variants={item}>
              <Link
                href={`/services/${service.slug.current}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 transform group-hover:-translate-y-2">
                  {service.image && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={urlFor(service.image)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={service.image.alt || service.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-pink-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-pink-600 font-bold text-xl">
                        {service.price}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-bold text-lg hover:underline decoration-2 underline-offset-4 transition-all"
          >
            View All Services
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
