'use client';

import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { HomePage } from "@/types/sanity";

interface AboutPreviewSectionProps {
    aboutPreview?: HomePage["aboutPreview"];
}

export default function AboutPreviewSection({ aboutPreview }: AboutPreviewSectionProps) {
    if (!aboutPreview) return null;

    // Fallback images if not provided in Sanity
    const defaultImages = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=500&fit=crop"
    ];

    const getImageUrl = (index: number) => {
        if (aboutPreview.images && aboutPreview.images[index]) {
            return urlFor(aboutPreview.images[index]).width(400).height(index % 2 === 0 ? 500 : 300).url();
        }
        return defaultImages[index];
    };

    const badgeValue = aboutPreview.badge?.value || "4.9";
    const badgeLabel = aboutPreview.badge?.label || "Client Rating";

    return (
        <section className="py-16 bg-pink-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative order-2 lg:order-1">
                        {/* Image Grid - Now on Left */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden shadow-elevated">
                                    <Image
                                        src={getImageUrl(0)}
                                        alt="Salon interior"
                                        width={400}
                                        height={500}
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-elevated">
                                    <Image
                                        src={getImageUrl(1)}
                                        alt="Hair styling"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-2xl overflow-hidden shadow-elevated">
                                    <Image
                                        src={getImageUrl(2)}
                                        alt="Hair coloring"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-elevated">
                                    <Image
                                        src={getImageUrl(3)}
                                        alt="Salon treatment"
                                        width={400}
                                        height={500}
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
                                    <p className="font-serif text-2xl font-bold text-foreground">{badgeValue}</p>
                                    <p className="text-sm text-muted-foreground">{badgeLabel}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="order-1 lg:order-2">
                        <span className="font-medium tracking-wider uppercase text-sm">About Us</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            {aboutPreview.title || "About Style & Scissors"}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                            {aboutPreview.description}
                        </p>
                        <Link
                            href="/about"
                            className="text-pink-600 hover:text-pink-700 font-semibold text-lg inline-flex items-center gap-2"
                        >
                            Learn More About Us
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
