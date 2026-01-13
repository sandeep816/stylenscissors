import {client} from '@/sanity/lib/client'
import {faqsQuery} from '@/sanity/lib/queries'
import {PortableText} from '@/lib/portableText'

export default async function FAQPage() {
  const faqs = await client.fetch(faqsQuery)

  const faqsByCategory = faqs.reduce((acc: Record<string, unknown[]>, faq) => {
    const category = faq.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {})

  const categoryNames: {[key: string]: string} = {
    general: 'General',
    services: 'Services',
    booking: 'Booking',
    pricing: 'Pricing',
    products: 'Products',
    other: 'Other',
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ by Category */}
        {Object.keys(faqsByCategory).length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-12">
            {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {categoryNames[category] || category}
                </h2>
                <div className="space-y-4">
                  {categoryFaqs.map((faq) => (
                    <div
                      key={faq._id}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {faq.question}
                      </h3>
                      <div className="text-gray-700">
                        <PortableText value={faq.answer} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">FAQs coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
