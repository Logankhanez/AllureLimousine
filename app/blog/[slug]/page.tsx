import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Article non trouvé | Allure Limousine",
    }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/70 hover:text-[#8e7d3f] transition-colors mb-6"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour au blog
            </Link>
            <time className="text-[#8e7d3f] font-medium">
              {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="font-['Georgia'] text-3xl md:text-4xl lg:text-5xl text-white mt-4">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.content.map((section, index) => {
              if (section.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="font-['Georgia'] text-2xl md:text-3xl text-[#8e7d3f] mt-10 mb-4"
                  >
                    {section.content}
                  </h2>
                )
              }
              return (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-4"
                >
                  {section.content}
                </p>
              )
            })}

            {/* CTA Box */}
            <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-['Georgia'] text-xl text-[#8e7d3f] mb-3">
                Réservez votre transfert
              </h3>
              <p className="text-gray-600 mb-4">
                Contactez notre équipe pour organiser votre prochain déplacement en toute sérénité.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#8e7d3f] text-white px-6 py-3 rounded hover:bg-[#8e7d3f]/90 transition-colors font-medium"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-['Georgia'] text-3xl text-[#8e7d3f] text-center mb-10">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-['Georgia'] text-lg text-gray-900 group-hover:text-[#8e7d3f] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
