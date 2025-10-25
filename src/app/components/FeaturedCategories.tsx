"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  const rows: Category[][] = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <section className="py-12 sm:py-20 bg-[#fdf9f6]">
      {/* --- Tiêu đề --- */}
      <div className="text-center mb-10 sm:mb-16 px-4">
        <h2
          className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-serif text-[#3e2c1c] tracking-wide mb-3`}
        >
          DANH MỤC NỔI BẬT
        </h2>
        <div className="w-14 sm:w-16 h-[2px] bg-[#c7a17a] mx-auto mb-4"></div>
        <p className="text-gray-500 italic text-sm sm:text-base">
          Cập nhật những phong cách mới mỗi tuần
        </p>
      </div>

      {/* --- Danh mục --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-12">
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          const justify =
            isLast && row.length < 3 ? "justify-center" : "justify-between";

          return (
            <div
              key={index}
              className={`flex flex-wrap ${justify} gap-4 sm:gap-8 md:gap-10 transition-all`}
            >
              {row.map((cat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden w-[48%] sm:w-[45%] lg:w-[30%]"
                >
                  {/* Ảnh */}
                  <Link
                    href={`/cua-hang/${slugify(cat.title)}`}
                    className="block relative h-[240px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-t-xl sm:rounded-t-2xl"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient nhẹ be để ảnh không quá sáng */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f6]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  </Link>

                  {/* Nội dung chữ */}
                  <div className="p-4 sm:p-6 text-center">
                    <h3
                      className={`${playfair.className} text-base sm:text-lg md:text-xl text-[#3e2c1c] mb-1 tracking-wide`}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 italic mb-3 sm:mb-4">
                      {cat.items} items
                    </p>
                    <Link
                      href={`/cua-hang/${slugify(cat.title)}`}
                      className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#c7a17a] text-[#3e2c1c] hover:bg-[#6d4c2f] hover:text-white transition-all"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
