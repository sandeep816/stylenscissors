import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {galleryItemsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'

export default async function GalleryPage() {
  const galleryItems = await client.fetch(galleryItemsQuery)

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our portfolio of stunning transformations
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems && galleryItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={urlFor(item.image).width(600).height(600).url()}
                  alt={item.title || 'Gallery image'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {item.isBeforeAfter && (
                  <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Before/After
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Gallery items coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
