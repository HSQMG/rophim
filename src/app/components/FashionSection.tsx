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
      <p className="text-center py-20 text-gray-500 italic">
        Đang tải sản phẩm...
      </p>
    );

  return (
    <section className="py-16 bg-white">
      {/* Tiêu đề */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-wide mb-2">SẢN PHẨM MỚI</h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Đón đầu phong cách - Cùng khám phá những thiết kế mới nhất từ UNID.
        </p>
      </div>

      {/* Lưới sản phẩm */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            grid
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-x-8 gap-y-12
            justify-items-center
          "
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/cua-hang/${product.category}/${product.id}`}
              className="group w-full max-w-[300px] text-center cursor-pointer"
            >
              {/* Ảnh sản phẩm */}
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-sm">
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

              {/* Tên & giá */}
              <h3 className="mt-4 text-lg font-medium text-[#2b2b2b] group-hover:underline underline-offset-4">
                {product.name}
              </h3>
              <p className="text-[#5a3d2b] font-semibold mt-1">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
