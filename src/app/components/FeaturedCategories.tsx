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

  // Chia 3 item mỗi hàng
  const rows: Category[][] = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <section className="py-10 sm:py-16 bg-[#fdf9f6]">
      {/* Tiêu đề */}
      <div className="text-center mb-10 px-4">
        <h2
          className={`${playfair.className} text-2xl sm:text-4xl md:text-5xl font-serif text-[#3e2c1c] tracking-wide mb-3`}
        >
          DANH MỤC NỔI BẬT
        </h2>
        <div className="w-14 sm:w-16 h-[2px] bg-[#c7a17a] mx-auto mb-4"></div>
        <p className="text-gray-500 italic text-sm sm:text-base">
          Cập nhật phong cách mới mỗi tuần
        </p>
      </div>

      {/* Danh mục chia hàng */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex flex-col gap-10 sm:gap-12">
        {rows.map((row, rowIndex) => {
          const isLast = rowIndex === rows.length - 1;
          const isTwoItems = row.length === 2;
          const isOneItem = row.length === 1;

          // Xử lý căn giữa hàng cuối
          const justifyClass = isOneItem
            ? "justify-center"
            : isTwoItems
            ? "justify-center"
            : "justify-between";

          return (
            <div
              key={rowIndex}
              className={`flex flex-wrap ${justifyClass} gap-6 sm:gap-8 transition-all`}
            >
              {row.map((cat, i) => (
                <div
                  key={i}
                  className={`group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col
                    w-full xs:w-[48%] sm:w-[30%]
                    ${isTwoItems ? "sm:w-[42%]" : ""}
                    ${isOneItem ? "sm:w-[60%]" : ""}
                  `}
                  style={{
                    minHeight: "480px", // toàn card cao đồng nhất
                  }}
                >
                  {/* Ảnh danh mục */}
                  <Link
                    href={`/cua-hang/${slugify(cat.title)}`}
                    className="block relative w-full h-[320px] overflow-hidden rounded-t-xl sm:rounded-t-2xl"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f6]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  </Link>

                  {/* Nội dung danh mục */}
                  <div className="flex-1 flex flex-col items-center justify-between p-5 text-center">
                    <div>
                      <h3
                        className={`${playfair.className} text-lg sm:text-xl text-[#3e2c1c] mb-1 tracking-wide`}
                      >
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 italic mb-3">
                        {cat.items} items
                      </p>
                    </div>

                    <Link
                      href={`/cua-hang/${slugify(cat.title)}`}
                      className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#c7a17a] text-[#3e2c1c] hover:bg-[#6d4c2f] hover:text-white transition-all"
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
