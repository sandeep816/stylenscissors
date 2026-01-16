"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/lib/portableText";
import type { TeamMember } from "@/types/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Facebook, Twitter, Calendar } from "lucide-react";

interface TeamGridProps {
    members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedMember]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
                {members.map((member) => (
                    <motion.div
                        key={member._id}
                        variants={item}
                        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                    >
                        {member.photo && (
                            <div className="relative h-96 w-full overflow-hidden">
                                <Image
                                    src={urlFor(member.photo).width(600).height(800).url()}
                                    alt={member.photo.alt || member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-pink-300 font-medium text-lg">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Hover overlay hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View Profile
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Team Member Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedMember(null)}
                        />

                        <motion.div
                            layoutId={selectedMember._id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden z-10 flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-20"
                            >
                                <X className="w-6 h-6 text-gray-700" />
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-2/5 relative min-h-[300px] md:min-h-full">
                                {selectedMember.photo && (
                                    <Image
                                        src={urlFor(selectedMember.photo).width(600).height(800).url()}
                                        alt={selectedMember.photo.alt || selectedMember.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col">
                                <div className="mb-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
                                        {selectedMember.name}
                                    </h2>
                                    <p className="text-pink-600 text-xl font-medium mb-4">
                                        {selectedMember.role}
                                    </p>

                                    {selectedMember.experience && (
                                        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600 mb-4">
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            {selectedMember.experience} Years Experience
                                        </div>
                                    )}

                                    {selectedMember.specializations && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedMember.specializations.map((spec, idx) => (
                                                <span key={idx} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm font-medium border border-pink-100">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-pink prose-sm max-w-none text-gray-600 mb-8 flex-grow">
                                    {selectedMember.bio && <PortableText value={selectedMember.bio} />}
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 mt-auto">
                                    <div className="flex gap-4">
                                        {selectedMember.socialLinks?.instagram && (
                                            <a href={selectedMember.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                                                <Instagram className="w-6 h-6" />
                                            </a>
                                        )}
                                        {selectedMember.socialLinks?.facebook && (
                                            <a href={selectedMember.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <Facebook className="w-6 h-6" />
                                            </a>
                                        )}
                                        {selectedMember.socialLinks?.twitter && (
                                            <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500 transition-colors">
                                                <Twitter className="w-6 h-6" />
                                            </a>
                                        )}
                                    </div>

                                    <Link
                                        href="/book-appointment"
                                        className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors w-full sm:w-auto"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
