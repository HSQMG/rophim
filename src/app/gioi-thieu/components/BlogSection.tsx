"use client";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "A. Lange & Söhne – The new Zeitwerk",
      date: "30 Tháng Mười, 2022",
      excerpt:
        "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez from expanding…",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_08.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Maurice Lacroix – Aikon Venturer 38mm",
      date: "30 Tháng Mười, 2022",
      excerpt:
        "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez from expanding…",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_02.jpg",
      link: "#",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className={`${playfair.className} text-4xl font-light text-center uppercase tracking-wide mb-16`}
        >
          Blog
        </h2>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post) => (
            <article key={post.id} className="text-center">
              {/* Image */}
              <a href={post.link} className="block overflow-hidden rounded-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[420px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>

              {/* Date */}
              <p
                className={`${inter.className} mt-6 text-sm tracking-widest uppercase text-gray-500`}
              >
                {post.date}
              </p>

              {/* Title */}
              <h3
                className={`${playfair.className} mt-3 text-2xl font-semibold text-gray-900 hover:text-gray-700 transition`}
              >
                <a href={post.link}>{post.title}</a>
              </h3>

              {/* Excerpt */}
              <p
                className={`${inter.className} mt-3 text-gray-600 text-base leading-relaxed max-w-lg mx-auto`}
              >
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
