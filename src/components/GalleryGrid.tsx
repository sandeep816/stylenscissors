"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryItem } from "@/types/sanity";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryGridProps {
    items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [filter, setFilter] = useState("All");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Extract unique categories from items
    const categories = useMemo(() => {
        const cats = new Set(items.map((item) => item.category).filter(Boolean));
        return ["All", ...Array.from(cats)];
    }, [items]);

    // Filter items based on selected category
    const filteredItems = useMemo(() => {
        if (filter === "All") return items;
        return items.filter((item) => item.category === filter);
    }, [items, filter]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) =>
            prev === null ? null : (prev + 1) % filteredItems.length
        );
    }, [selectedIndex, filteredItems.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) =>
            prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
    }, [selectedIndex, filteredItems.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") setSelectedIndex(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedIndex]);

    return (
        <div>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setFilter(category as string);
                            setSelectedIndex(null);
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category
                            ? "bg-pink-600 text-white shadow-lg scale-105"
                            : "bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <LayoutGroup>
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => {
                            // Calculate aspect ratio or default
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
                                    layout
                                    key={item._id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="break-inside-avoid"
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100 cursor-zoom-in">
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
                                            {item.isBeforeAfter && (
                                                <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                                    Before/After
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {filteredItems.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No images found in this category.</p>
                </div>
            )}

            {/* Image Modal */}
            <AnimatePresence>
                {selectedIndex !== null && filteredItems[selectedIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-50 bg-black/20 rounded-full hover:bg-black/40"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full bg-black/20 hover:bg-black/40 z-50 hidden md:block"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full bg-black/20 hover:bg-black/40 z-50 hidden md:block"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            layoutId={filteredItems[selectedIndex]._id}
                            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {(() => {
                                    const item = filteredItems[selectedIndex];
                                    return (
                                        <div className="relative w-full h-[80vh]">
                                            <Image
                                                src={urlFor(item.image).width(1200).auto("format").url()}
                                                alt={item.title || "Gallery image"}
                                                fill
                                                className="object-contain"
                                                priority
                                                sizes="100vw"
                                            />
                                        </div>
                                    );
                                })()}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 text-center text-white"
                            >
                                <h3 className="text-2xl font-bold mb-1">{filteredItems[selectedIndex].title}</h3>
                                <p className="text-pink-300 font-medium">{filteredItems[selectedIndex].category}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
