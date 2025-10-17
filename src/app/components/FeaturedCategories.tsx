"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const saved = localStorage.getItem("featuredCategories");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      fetch("/data/featuredCategories.json")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Lỗi tải danh mục:", err));
    }
  }, []);

  if (!isClient) return null;

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-wide mb-2">
          DANH MỤC NỔI BẬT
        </h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Phong cách mới được thêm vào hàng tuần
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500 italic">Đang tải danh mục...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center bg-[#fdf9f6] rounded-t-full p-6 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
              <p className="text-gray-500 italic text-sm mb-4">{cat.items}</p>

              <Link
                href={cat.link}
                className="relative w-40 h-52 mb-6 overflow-hidden rounded-md block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </Link>

              <Link href={cat.link}>
                <button className="peer w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer">
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
