"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatPrice = (value: string | number) => {
  const numeric = value.toString().replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-300 italic bg-white dark:bg-[#0e0e0e] transition-colors duration-500">
        Đang tải sản phẩm...
      </p>
    );

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#0e0e0e] transition-colors duration-500">
      {/* --- Tiêu đề --- */}
      <div className="text-center mb-10 sm:mb-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-2 text-[#2b2b2b] dark:text-[#f5e7c6] transition-colors">
          SẢN PHẨM MỚI
        </h2>
        <div className="w-14 h-[2px] bg-[#2b2b2b] dark:bg-[#d3b78f] mx-auto mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 italic text-sm sm:text-base">
          Đón đầu phong cách - Cùng khám phá những thiết kế mới nhất từ UNID.
        </p>
      </div>

      {/* --- Danh sách sản phẩm --- */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div
          className="
            grid
            grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-x-4 sm:gap-x-6 md:gap-x-8
            gap-y-8 sm:gap-y-10 md:gap-y-12
            justify-items-center
          "
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/cua-hang/${product.category}/${product.id}`}
              className="group w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] text-center cursor-pointer"
            >
              {/* --- Hình sản phẩm --- */}
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
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
              <div className="mt-3 sm:mt-4">
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#2b2b2b] dark:text-[#f5e7c6] group-hover:underline underline-offset-4 px-1 line-clamp-2 transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#6b4f36] dark:text-[#d3b78f] font-semibold mt-1 text-sm sm:text-base transition-colors">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
