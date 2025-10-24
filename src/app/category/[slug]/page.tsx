"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function decodeHTML(str: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const found = data.find((cat) => slugify(cat.title) === slug);
        if (found) setCategory(found);
      })
      .catch(() => setCategory(null));
  }, [slug]);
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf7f4] to-[#fff6f2]">
        <p className="text-gray-500 italic text-xl">Danh mục không tồn tại.</p>
      </div>
    );
  }
  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#fdf7f4] to-[#fff6f2]">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 lg:p-14 font-[Inter]">
        <h1 className="text-5xl font-bold mb-10 text-center text-[#3e2c1c] leading-tight">
          {category.title}
        </h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="relative w-full lg:w-1/2 h-[450px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 text-gray-700 leading-relaxed text-lg">
            {category.script ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(category.script),
                }}
                className="whitespace-pre-wrap"
              />
            ) : (
              <p className="italic text-gray-400">Không có nội dung.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
