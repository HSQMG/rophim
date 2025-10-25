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

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (categories.length === 0 && products.length === 0)
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Đang tải nội dung...
      </p>
    );

  return (
    <>
      {/* ==================== FEATURED CATEGORIES ==================== */}
      <section className="py-12 sm:py-20 bg-[#fdf9f6]">
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center sm:justify-between gap-5 sm:gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden w-[48%] sm:w-[45%] lg:w-[30%]"
            >
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f6]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </Link>

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
      </section>

      {/* ==================== PRODUCT CAROUSEL ==================== */}
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-2 text-[#2b2b2b]">
            SẢN PHẨM MỚI
          </h2>
          <div className="w-14 h-[2px] bg-[#2b2b2b] mx-auto mb-3"></div>
          <p className="text-gray-500 italic text-sm sm:text-base">
            Đón đầu phong cách - Cùng khám phá những thiết kế mới nhất từ UNID.
          </p>
        </div>

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
                  <div className="relative w-full h-[280px] sm:h-[350px] md:h-[430px] overflow-hidden rounded-xl shadow-sm">
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
                  <div className="pt-3 sm:pt-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#2b2b2b] group-hover:underline underline-offset-4 px-1">
                      {product.name}
                    </h3>
                    <div className="mt-1 text-[#6b4f36] font-semibold text-sm sm:text-base">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nút điều hướng */}
          <button
            ref={prevRef}
            className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            ref={nextRef}
            className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
