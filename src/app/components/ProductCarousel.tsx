"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "ROBETO SUIT BLAZER",
    price: "1,499,000đ",
    oldPrice: null,
    image:
      "https://hmkeyewear.com/wp-content/uploads/2024/10/phu-kien-thoi-trang-2.jpg",
    sale: true,
  },
  {
    id: 2,
    name: "BLAZER SUIT 100% LINEN",
    price: "999,000đ – 1,299,000đ",
    oldPrice: null,
    image:
      "https://hmkeyewear.com/wp-content/uploads/2024/10/phu-kien-thoi-trang-14.jpg",
    sale: false,
  },
  {
    id: 3,
    name: "POCKETS SUIT BLAZER",
    price: "1,499,000đ",
    oldPrice: "1,739,000đ",
    image:
      "https://hmkeyewear.com/wp-content/uploads/2024/10/phu-kien-thoi-trang-14.jpg",
    sale: true,
  },
  {
    id: 4,
    name: "DOUBLE BREASTED SUIT",
    price: "1,699,000đ",
    oldPrice: null,
    image:
      "https://hmkeyewear.com/wp-content/uploads/2024/10/phu-kien-thoi-trang-14.jpg",
    sale: false,
  },
];

export default function ProductCarousel() {
  return (
    <section className="py-16 bg-white">
      {/* Tiêu đề */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-wide mb-2">SẢN PHẨM MỚI</h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-3"></div>
        <p className="text-gray-500 italic">
          Tất cả kiểu dáng và màu sắc đều có sẵn trong cửa hàng trực tuyến chính
          thức của Millamona
        </p>
      </div>

      {/* Swiper */}
      <div className="relative max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={3}
          loop
          grabCursor={true}
          onInit={(swiper) => {
            const navigation = swiper.params.navigation as any; // hoặc as NavigationOptions
            navigation.prevEl = ".custom-prev";
            navigation.nextEl = ".custom-next";
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group relative text-center">
                {/* Hình */}
                <div className="relative w-full h-[500px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* SALE badge */}
                {product.sale && (
                  <span className="absolute top-4 left-4 bg-white text-black text-sm md:text-base font-bold px-3 py-1.5 rounded shadow-lg uppercase tracking-wide border border-gray-200">
                    SALE
                  </span>
                )}

                {/* Tên + giá */}
                <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
                <div className="mt-1">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through mr-2">
                      {product.oldPrice}
                    </span>
                  )}
                  <span className="font-semibold">{product.price}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center 
                       transition-all duration-300 hover:bg-[#7B3F00] hover:text-white cursor-pointer"
          >
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current"
            >
              <path
                d="M10.617 0.482964C10.8882 0.754136 10.8882 1.19379 10.617 1.46497L1.80242 10.2796L10.617 19.0942C10.8882 19.3654 10.8882 19.805 10.617 20.0762C10.3459 20.3474 9.90621 20.3474 9.63504 20.0762L0.565862 11.007C0.164105 10.6053 0.164105 9.9539 0.565862 9.55214L9.63504 0.482964C9.90621 0.211792 10.3459 0.211792 10.617 0.482964Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center 
                       transition-all duration-300 hover:bg-[#7B3F00] hover:text-white cursor-pointer"
          >
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current"
            >
              <path
                d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
