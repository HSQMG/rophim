"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    fetch("/featuredCategories.json")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const cat = data.find((c) => c.link.endsWith(slug as string));
        setCategory(cat || null);
      })
      .catch((err) => console.error("Lỗi khi tải JSON:", err));
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
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 lg:p-14">
        <h1 className="text-5xl font-serif font-bold mb-10 text-[#3e2c1c] text-center">
          {category.title}
        </h1>

        <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-10">
          {category.image && (
            <div className="w-full lg:w-1/2 h-[450px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="flex-1 text-gray-700 leading-relaxed text-lg flex items-start lg:items-center">
            <div className="w-full">
              {category.script ? (
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: category.script }}
                ></div>
              ) : (
                <p className="italic text-gray-400">Không có nội dung.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
