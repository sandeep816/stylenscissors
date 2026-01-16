"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Testimonial } from "@/types/sanity";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

interface FeaturedTestimonialsProps {
  testimonials: Testimonial[];
}

export default function FeaturedTestimonials({
  testimonials,
}: FeaturedTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // Custom active dot styling
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "-40px" }}>
        <ul className="slick-dots-custom flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-colors cursor-pointer" />
    ),
  };

  return (
    <section className="py-24 bg-gradient-to-br from-pink-600 to-rose-700 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-100 font-bold tracking-wider uppercase text-sm bg-white/10 px-4 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mt-6 mb-6 text-white font-display">
              What Our Clients Say
            </h2>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our valued clients have
              to say about their experience with us.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4"
        >
          <Slider {...settings} className="testimonial-slider -mx-4 pb-12">
            {testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial._id} className="px-4 h-full">
                <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl h-full flex flex-col border border-white/10 hover:bg-white/15 transition-colors duration-300">
                  <div className="flex items-center mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xl ${i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-400'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-pink-50 mb-6 italic leading-relaxed text-lg flex-grow">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>
                  <div className="flex items-center pt-6 border-t border-white/10">
                    {testimonial.customerPhoto ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-pink-200">
                        <Image
                          src={urlFor(testimonial.customerPhoto)
                            .width(56)
                            .height(56)
                            .url()}
                          alt={testimonial.customerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-pink-500 mr-4 flex items-center justify-center text-xl font-bold border-2 border-white/20">
                        {testimonial.customerName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {testimonial.customerName}
                      </h4>
                      {testimonial.service && (
                        <p className="text-sm text-pink-200">
                          {testimonial.service.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-white hover:text-pink-100 font-semibold text-lg transition-all group"
          >
            Read More Reviews
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Required for custom dots to show properly over overflow-hidden if absolutely positioned, 
          but here we used normal flow. Just ensuring slider styles work. */}
      <style jsx global>{`
        .slick-dots li button:before { display: none; }
        .slick-dots li.slick-active div { background-color: white !important; transform: scale(1.2); }
      `}</style>
    </section>
  );
}
