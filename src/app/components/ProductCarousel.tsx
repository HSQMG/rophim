"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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

const formatPrice = (value: string | number) => {
  const numeric = value.toString().replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
}

export default function HomeShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (categories.length === 0 && products.length === 0)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-300 italic bg-white dark:bg-[#0e0e0e] transition-colors">
        Đang tải nội dung...
      </p>
    );

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#0e0e0e] transition-colors duration-500 relative">
      {/* --- Tiêu đề --- */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2
          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-2 
                     text-[#2b2b2b] dark:text-[#f5e7c6]`}
        >
          SẢN PHẨM MỚI
        </h2>
        <div className="w-14 h-[2px] bg-[#2b2b2b] dark:bg-[#d3b78f] mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 italic text-sm sm:text-base">
          Đón đầu phong cách - Cùng khám phá những thiết kế mới nhất từ UNID.
        </p>
      </div>

      {/* --- Swiper --- */}
      <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.1}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 18 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                href={`/cua-hang/${product.category}/${product.id}`}
                className="group relative text-center cursor-pointer block"
              >
                {/* --- Hình sản phẩm --- */}
                <div className="relative w-full h-[280px] sm:h-[350px] md:h-[430px] overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={`${product.name} hover`}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  )}
                </div>

                {/* --- Tên & Giá --- */}
                <div className="pt-3 sm:pt-4">
                  <h3
                    className="text-sm sm:text-base md:text-lg font-medium text-[#2b2b2b] dark:text-[#f5e7c6] 
                               group-hover:underline underline-offset-4 px-1 transition-colors"
                  >
                    {product.name}
                  </h3>
                  <div className="mt-1 text-[#6b4f36] dark:text-[#d3b78f] font-semibold text-sm sm:text-base">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- Nút điều hướng --- */}
        <button
          ref={prevRef}
          className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                     bg-white dark:bg-[#1a1a1a] shadow-md items-center justify-center 
                     transition-all duration-300 hover:bg-[#6b4f36] dark:hover:bg-[#f5e7c6] 
                     hover:text-white dark:hover:text-[#2b1b0f] hover:scale-110 cursor-pointer 
                     absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          ref={nextRef}
          className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                     bg-white dark:bg-[#1a1a1a] shadow-md items-center justify-center 
                     transition-all duration-300 hover:bg-[#6b4f36] dark:hover:bg-[#f5e7c6] 
                     hover:text-white dark:hover:text-[#2b1b0f] hover:scale-110 cursor-pointer 
                     absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
