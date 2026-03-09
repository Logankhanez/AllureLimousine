import { Metadata } from "next"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog | Allure Limousine - Actualités et conseils transport de luxe",
  description: "Découvrez nos articles sur le transport de prestige, les transferts vers les stations de ski et nos conseils pour voyager en toute sérénité.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=600&fit=crop"
            alt="Montagnes enneigées"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-4">
              Notre Blog
            </h1>
            <div className="w-16 h-[2px] bg-[#8e7d3f] mx-auto mb-6"></div>
            <p className="text-white/80 text-lg">
              Actualités, conseils et informations sur nos services de transport de prestige
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-[#8e7d3f] font-medium">
                      {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="font-['Georgia'] text-xl text-gray-900 mt-2 mb-3 group-hover:text-[#8e7d3f] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-[#8e7d3f] text-sm font-medium">
                      Lire la suite
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Georgia'] text-3xl text-[#8e7d3f] mb-4">
            Besoin d&apos;un transfert ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pour organiser votre prochain déplacement en toute sérénité.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#8e7d3f] text-white px-8 py-3 rounded hover:bg-[#8e7d3f]/90 transition-colors font-medium"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
  )
}
