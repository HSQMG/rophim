"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const rows = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">DANH MỤC NỔI BẬT</h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Phong cách mới được thêm vào hàng tuần
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        {rows.map((row, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;
          const remainder = categories.length % 3;

          const justify =
            isLastRow && remainder === 1
              ? "justify-center"
              : isLastRow && remainder === 2
              ? "justify-center gap-8"
              : "justify-between";

          return (
            <div
              key={rowIndex}
              className={`flex flex-wrap ${justify} gap-8 transition-all`}
            >
              {row.map((cat, i) => {
                const cleanLink = `/cua-hang/${slugify(cat.title)}`;

                return (
                  <div
                    key={i}
                    className="group w-full sm:w-[45%] lg:w-[30%] flex flex-col items-center bg-[#fdf9f6] rounded-t-full p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
                    <p className="text-gray-500 italic text-sm mb-4">
                      {cat.items} items
                    </p>

                    <Link
                      href={cleanLink}
                      className="relative w-55 h-52 mb-6 overflow-hidden rounded-md block"
                    >
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </Link>

                    <Link href={cleanLink}>
                      <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer">
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
