"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CollectionCarousel() {
  const collections = [
    {
      title: "THANH LỊCH VÀ HIỆN ĐẠI",
      desc: "Bộ sưu tập được thiết kế cho người phụ nữ hiện đại, tự tin, bản lĩnh nhưng vẫn giữ nét mềm mại, duyên dáng. Form dáng basic, chất liệu jean cao cấp cùng những chi tiết tinh tế tạo nên vẻ đẹp sang trọng và thời thượng.",
      img: "/image/anh-gioi-thieu/1-min.jpg",
    },
    {
      title: "DẤU ẤN VĂN HÓA VIỆT",
      desc: "Mỗi đường kim, mũi chỉ đều ẩn chứa tinh thần Việt. Họa tiết Truyền thống được thổi hồn trong từng thiết kế, gợi nhớ về cội nguồn nhưng vẫn hòa nhịp cùng thời trang đương đại.",
      img: "/image/anh-gioi-thieu/2-min.jpg",
    },
    {
      title: "LINH HOẠT VÀ DỄ PHỐI",
      desc: "Với chất liệu cao cấp, form dáng đa dạng, UNID mang đến những thiết kế dễ phối cho nhiều hoàn cảnh. Thời trang trở nên gần gũi hơn, tự nhiên hơn như chính nhịp sống Việt mỗi ngày.",
      img: "/image/anh-gioi-thieu/3-min.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">BỘ SƯU TẬP</h2>
          <p className="text-gray-600">
            Bộ sưu tập của UNID tôn vinh vẻ đẹp người phụ nữ Việt hiện đại qua
            chất liệu jean mềm mại và họa tiết thêu mang đậm bản sắc dân tộc.
          </p>
        </div>

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
                <div className="w-full h-[420px] overflow-hidden rounded-t-full relative mx-auto border border-transparent group-hover:border-black transition duration-300 cursor-pointer">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="relative">
                  <a
                    href="#"
                    aria-label={`Xem ${item.title}`}
                    className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-[#8B4513] hover:text-white"
                  >
                    →
                  </a>
                </div>

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
