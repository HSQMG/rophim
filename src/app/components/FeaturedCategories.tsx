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
  if (categories.length === 4) {
    rows.push(categories.slice(0, 2));
    rows.push(categories.slice(2, 4));
  } else {
    for (let i = 0; i < categories.length; i += 3) {
      rows.push(categories.slice(i, i + 3));
    }
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
          const isTwoItems = row.length === 2;
          const isOneItem = row.length === 1;
          const justifyClass =
            isOneItem || isTwoItems ? "justify-center" : "justify-between";

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
                  style={{ minHeight: "480px" }}
                >
                  {/* Ảnh danh mục — dùng aspect-ratio để không crop */}
                  <Link
                    href={`/cua-hang/${slugify(cat.title)}`}
                    className="block w-full overflow-hidden bg-[#fdf9f6]"
                  >
                    <div className="relative w-full aspect-[3/4] flex items-center justify-center">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        width={600}
                        height={800}
                        className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
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
