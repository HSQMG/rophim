"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCarousel() {
  const [products, setProducts] = useState<any[]>([]);

  // 🔢 Hàm định dạng giá tiền
  const formatPrice = (value: string | number) => {
    if (!value) return "";
    const numeric = value.toString().replace(/\D/g, "");
    if (!numeric) return "";
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // 🔹 Lấy dữ liệu từ file JSON thật qua API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0)
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Hiện chưa có sản phẩm nào.
      </p>
    );

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-wide mb-2">SẢN PHẨM MỚI</h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Tất cả kiểu dáng và màu sắc đều có sẵn trong cửa hàng trực tuyến chính
          thức của Millamona
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={3}
          loop
          navigation
          grabCursor
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group relative text-center">
                <div className="relative w-full h-[500px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {product.sale && (
                  <span className="absolute top-4 left-4 bg-white text-black text-sm font-bold px-3 py-1.5 rounded shadow uppercase tracking-wide border border-gray-200">
                    SALE
                  </span>
                )}

                <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
                <div className="mt-1">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through mr-2">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="font-semibold">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
