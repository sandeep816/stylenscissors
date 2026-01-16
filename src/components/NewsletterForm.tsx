"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "loading">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm">
                <p className="font-semibold">Thank you for subscribing!</p>
                <p>You'll receive our latest updates soon.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-green-300 text-xs mt-2 hover:text-green-200 underline"
                >
                    Subscribe another email
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-full px-5 py-3 pr-12 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-gray-500"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="absolute right-1 top-1 bottom-1 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                </button>
            </div>
            <p className="text-gray-500 text-xs mt-3 pl-2">
                Subscribe to get the latest news and updates.
            </p>
        </form>
    );
}
