"use client";
import { Playfair_Display, Inter } from "next/font/google";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Search } from "lucide-react";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "A. Lange & Söhne – The new Zeitwerk",
      author: "monamedia",
      date: "30 Tháng Mười, 2022",
      category: "Watches",
      excerpt:
        "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez from expanding her property collection...",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_08.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Maurice Lacroix – Aikon Venturer 38mm",
      author: "monamedia",
      date: "30 Tháng Mười, 2022",
      category: "Watches",
      excerpt:
        "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez from expanding her property collection...",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_02.jpg",
      link: "#",
    },
  ];

  const [showCategories, setShowCategories] = useState(true);

  const categories = [
    { id: 1, name: "Collection", link: "#" },
    { id: 2, name: "Fashion", link: "#" },
    { id: 3, name: "Lifestyle", link: "#" },
    { id: 4, name: "Tin tức", link: "#" },
    { id: 5, name: "Trends", link: "#" },
    { id: 6, name: "Watches", link: "#" },
  ];

  const archives = [
    { id: 1, label: "Tháng Mười 2022", link: "#" },
    { id: 2, label: "Tháng Chín 2022", link: "#" },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "A. Lange & Söhne – The new Zeitwerk",
      date: "30 Tháng Mười, 2022",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_08.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Maurice Lacroix – Aikon Venturer 38mm",
      date: "30 Tháng Mười, 2022",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_02.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Mido Ocean Star GMT Special Edition",
      date: "30 Tháng Mười, 2022",
      image:
        "https://millamona.monamedia.net/wp-content/uploads/2024/01/m8_blog_img_01.jpg",
      link: "#",
    },
  ];

  const tags = [
    { id: 1, name: "blog", size: "text-2xl", link: "#" },
    { id: 2, name: "creative", size: "text-2xl", link: "#" },
    { id: 3, name: "fashion", size: "text-2xl", link: "#" },
    { id: 4, name: "lifestyle", size: "text-2xl", link: "#" },
    { id: 5, name: "m1", size: "text-sm", link: "#" },
  ];

  return (
    <section className="py-16 container mx-auto px-4 flex flex-col md:flex-row gap-12">
      {/* Left Content - Blog List */}
      <div className="w-full md:w-2/3">
        <h1
          className={`${playfair.className} text-4xl font-semibold uppercase mb-10`}
        >
          Blog
        </h1>

        {posts.map((post) => (
          <article key={post.id} className="mb-16 border-b pb-10">
            {/* Image */}
            <a href={post.link} className="block overflow-hidden rounded-md">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </a>

            {/* Title */}
            <h2
              className={`${playfair.className} text-2xl font-semibold mt-6 hover:text-gray-600 transition`}
            >
              <a href={post.link}>{post.title}</a>
            </h2>

            {/* Meta */}
            <p
              className={`${inter.className} text-sm text-gray-500 mt-2 flex items-center gap-2`}
            >
              <span>{post.author}</span> — <span>{post.date}</span> —{" "}
              <span className="italic">{post.category}</span>
            </p>

            {/* Excerpt */}
            <p className={`${inter.className} mt-4 text-gray-700`}>
              {post.excerpt}
            </p>

            {/* Button */}
            <a
              href={post.link}
              className="inline-block mt-5 px-6 py-2 border border-black text-sm hover:bg-black hover:text-white transition"
            >
              Read more
            </a>
          </article>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-1/3 space-y-8">
        {/* Search */}
        <div className="widget bg-white shadow-sm border rounded-md p-5">
          <h4
            className={`${playfair.className} widget-title text-lg font-semibold mb-4 border-b pb-2`}
          >
            Tìm kiếm
          </h4>
          <form className="flex">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="flex-1 border border-gray-300 px-4 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gray-300 rounded-r-md bg-black text-white hover:bg-gray-800 transition text-sm flex items-center justify-center cursor-pointer"
            >
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Categories */}
        <div className="widget bg-white shadow-sm border rounded-md p-5">
          {/* Header + Toggle */}
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h4
              className={`${playfair.className} widget-title text-lg font-semibold`}
            >
              Chuyên mục
            </h4>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="text-sm text-gray-500 hover:text-black transition flex items-center gap-1"
            >
              {showCategories ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>

          {/* Animated Category List */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showCategories ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-2 text-gray-600">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={cat.link}
                    className="hover:text-black transition block text-sm"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Archives */}
        <div className="widget bg-white shadow-sm border rounded-md p-5">
          <h4
            className={`${playfair.className} widget-title text-lg font-semibold mb-4 border-b pb-2`}
          >
            Lưu trữ
          </h4>
          <select className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-black">
            <option>Chọn tháng</option>
            {archives.map((arc) => (
              <option key={arc.id}>{arc.label}</option>
            ))}
          </select>
        </div>

        {/* Recent Posts */}
        <div className="widget bg-white shadow-sm border rounded-md p-5">
          <h4
            className={`${playfair.className} widget-title text-lg font-semibold mb-4 border-b pb-2`}
          >
            Bài viết mới
          </h4>
          <ul className="space-y-5">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex gap-3 items-center">
                <a href={post.link}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </a>
                <div>
                  <p className="text-xs text-gray-500">{post.date}</p>
                  <a
                    href={post.link}
                    className="text-sm font-medium hover:text-black transition"
                  >
                    {post.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tag Cloud */}
        <div className="widget bg-white shadow-sm border rounded-md p-5">
          <h4
            className={`${playfair.className} widget-title text-lg font-semibold mb-4 border-b pb-2`}
          >
            Các thẻ liên quan
          </h4>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <a
                key={tag.id}
                href={tag.link}
                className={`${tag.size} ${inter.className} px-3 py-1 border border-gray-300 rounded-md hover:bg-black hover:text-white transition`}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
