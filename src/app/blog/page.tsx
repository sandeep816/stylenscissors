import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {postsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import type {BlogPost} from '@/types/sanity'
import PageHeader from '@/components/PageHeader'

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="min-h-screen py-16 bg-gray-50">
       {/* Header */}
       <PageHeader title="Blog" description="Latest tips, trends, and insights from our salon" />
       <section className='mt-14'>
      <div className="container mx-auto px-4">
       
    

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  {post.mainImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {post.author && (
                        <span>By {post.author.name}</span>
                      )}
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Blog posts coming soon!</p>
          </div>
        )}
      </div>
      </section>
    </div>
  )
}
