"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
  script?: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("featuredCategories");
    if (saved) {
      const categories: Category[] = JSON.parse(saved);
      const cat = categories.find((c) => c.link === "/category/" + slug);
      if (cat) setCategory(cat);
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf7f4] to-[#fff6f2]">
        <p className="text-center py-20 text-gray-500 italic text-xl">
          Danh mục không tồn tại.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#fdf7f4] to-[#fff6f2]">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-12 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-5xl font-serif font-bold mb-4 text-[#3e2c1c] text-center">
          {category.title}
        </h1>
        {/* Items */}
        {category.items && (
          <p className="text-gray-500 italic mb-8 text-lg">
            {category.items} items
          </p>
        )}
        {category.image && (
          <div className="relative w-full h-[500px] mb-8 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        {category.script && (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner text-left">
            <h2 className="text-xl font-semibold mb-3 text-[#6b4f36]">
              Nội dung tùy chỉnh
            </h2>
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: category.script }}
            ></div>
          </div>
        )}
      </div>
    </section>
  );
}
