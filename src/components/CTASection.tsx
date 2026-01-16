import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-pink-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready for a New Look?</h2>
        <p className="text-xl mb-8">
          Book your appointment today and experience the difference
        </p>
        <Link
          href="/book-appointment"
          className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
