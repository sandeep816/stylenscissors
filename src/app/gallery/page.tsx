import { client } from '@/sanity/lib/client'
import { galleryItemsQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/PageHeader'
import GalleryGrid from '@/components/GalleryGrid'

export default async function GalleryPage() {
  const galleryItems = await client.fetch(galleryItemsQuery)

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <PageHeader label='' title="Gallery" description="Browse through our portfolio of stunning transformations" />
      <section className='mt-14'>
        <div className="container mx-auto px-4">
          <GalleryGrid items={galleryItems || []} />
        </div>
      </section>
    </div>
  )
}
