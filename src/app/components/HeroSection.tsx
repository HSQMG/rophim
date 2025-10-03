"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  // Dữ liệu ảnh + chữ
  const data = [
    {
      img: "https://bazaarvietnam.vn/wp-content/uploads/2020/02/0E3A1637-1.jpg",
      title: "CỬA HÀNG MILLAMONA",
      desc: "Bộ sưu tập cao cấp cho phong cách cá tính & năng động.",
    },
    {
      img: "https://bazaarvietnam.vn/wp-content/uploads/2020/02/loi-khuyen-thoi-trang-a.jpg",
      title: "PHONG CÁCH THANH LỊCH",
      desc: "Khám phá xu hướng thời trang sang trọng & tinh tế.",
    },
    {
      img: "https://bazaarvietnam.vn/wp-content/uploads/2020/02/loi-khuyen-thoi-trang-2.jpg",
      title: "THỜI TRANG NĂNG ĐỘNG",
      desc: "Bộ sưu tập dành cho những tín đồ yêu thích sự thoải mái.",
    },
    {
      img: "https://bazaarvietnam.vn/wp-content/uploads/2020/02/loi-khuyen-thoi-trang-6.jpg",
      title: "PHỤ KIỆN ĐỘC ĐÁO",
      desc: "Điểm nhấn hoàn hảo cho bộ trang phục của bạn.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-between px-10 bg-gradient-to-r from-pink-50 to-white">
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={data[current].title}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-serif font-bold leading-tight mb-4"
          >
            {data[current].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={data[current].desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg italic text-gray-500 mb-8"
          >
            {data[current].desc}
          </motion.p>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="flex gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className={`w-20 h-20 overflow-hidden rounded-full border-2 cursor-pointer transition 
                ${
                  current === i
                    ? "border-black scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
              onClick={() => setCurrent(i)}
            >
              <Image
                src={item.img}
                alt={`thumbnail ${i}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bên phải: ảnh lớn */}
      <div className="flex-1 flex justify-center relative">
        <div className="w-[500px] h-[650px] relative overflow-hidden rounded-t-full border border-gray-300 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={data[current].img}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={data[current].img}
                alt="main"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
