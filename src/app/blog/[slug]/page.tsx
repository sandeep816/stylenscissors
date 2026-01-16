import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, relatedPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/lib/portableText'
import type { BlogPost } from '@/types/sanity'
import PageHeader from '@/components/PageHeader'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  // Get related posts
  const categoryIds = post.categories?.map((cat: { _id: string }) => cat._id) || []
  const relatedPosts = categoryIds.length > 0
    ? await client.fetch(relatedPostsQuery, {
      slug,
      categoryIds,
    })
    : []

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Blog" description="" />
      <section className='mt-14'>
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/blog"
            className="text-pink-600 hover:text-pink-700 mb-6 inline-block"
          >
            ← Back to Blog
          </Link>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>By {post.author.name}</span>
                  </div>
                )}
                {post.publishedAt && (
                  <>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.categories.map((category: { _id: string; title: string; slug: { current: string } }) => (
                    <span
                      key={category._id}
                      className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {post.mainImage && (
              <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            {post.body && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={post.body} />
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost: BlogPost) => (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug.current}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        {relatedPost.mainImage && (
                          <div className="relative h-32 w-full">
                            <Image
                              src={urlFor(relatedPost.mainImage)
                                .width(400)
                                .height(200)
                                .url()}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  )
}
