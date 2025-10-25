"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const formatPrice = (value: string | number) => {
  const numeric = value.toString().replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

export default function ProductCarousel() {
  const [products, setProducts] = useState<any[]>([]);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0)
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Đang tải sản phẩm...
      </p>
    );

  return (
    <section className="py-16 bg-white relative">
      {/* Tiêu đề */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-wide mb-2">SẢN PHẨM MỚI</h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Đón đầu phong cách - Cùng khám phá những thiết kế mới nhất từ UNID.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={3}
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
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                href={`/cua-hang/${product.category}/${product.id}`}
                className="group relative text-center cursor-pointer block"
              >
                <div className="relative w-full h-[450px] overflow-hidden rounded-lg">
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
                <h3 className="mt-4 text-lg font-medium text-[#2b2b2b] group-hover:underline underline-offset-4">
                  {product.name}
                </h3>
                <div className="mt-1 text-[#5a3d2b] font-semibold">
                  {formatPrice(product.price)}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nút điều hướng */}
        <button
          ref={prevRef}
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          ref={nextRef}
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#6b4f36] hover:text-white hover:scale-110 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
