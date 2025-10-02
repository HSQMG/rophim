"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CollectionCarousel() {
  const collections = [
    {
      title: "Độc đáo và Nữ tính",
      desc: "Bộ sưu tập của chúng tôi dành cho phái nữ mang phong cách độc đáo và nữ tính. Những mẫu thiết kế thể hiện phong cách bền vững trong khi vẫn đảm bảo thị hiếu thời trang và xu hướng.",
      img: "https://millamona.monamedia.net/wp-content/uploads/2024/01/ab_collection_001.jpg",
    },
    {
      title: "Xu hướng và Thoải mái",
      desc: "Từ may đo truyền thống đến những mẫu trang phục không chính thức nhất. Các bộ sưu tập Mona của chúng tôi mang đến những xu hướng mới nhất với sự thoải mái tối đa.",
      img: "https://millamona.monamedia.net/wp-content/uploads/2024/01/ab_collection_002.jpg",
    },
    {
      title: "Vui vẻ và Tự nhiên",
      desc: "Mona TEEN là dành cho tuổi teen. Các thiết kế đã được tạo ra theo xu hướng hiện tại, đồng thời để lại không gian cho sự biểu hiện cá nhân của thanh thiếu niên.",
      img: "https://millamona.monamedia.net/wp-content/uploads/2024/01/ab_collection_003.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">BỘ SƯU TẬP</h2>
          <p className="text-gray-600">
            Bộ sưu tập của chúng tôi dành cho phụ nữ, đàn ông và trẻ em thể hiện
            bản chất của phong cách Địa Trung Hải với sự kết hợp hiện đại thông
            qua việc chú trọng vào chất liệu và chi tiết.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {collections.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="group bg-white rounded-lg text-center">
                {/* Image */}
                <div className="w-full h-[420px] overflow-hidden rounded-t-full relative mx-auto border border-transparent group-hover:border-black transition duration-300 cursor-pointer">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Button (nằm dưới ảnh, cách 1 đoạn) */}
                <div className="relative">
                  <a
                    href="#"
                    aria-label={`Xem ${item.title}`}
                    className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-[#8B4513] hover:text-white"
                  >
                    →
                  </a>
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
