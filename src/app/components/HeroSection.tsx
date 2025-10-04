"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
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
      img: "https://millamona.monamedia.net/wp-content/uploads/revslider/home-01/m1_slider_01.png",
      title: "PHỤ KIỆN ĐỘC ĐÁO",
      desc: "Điểm nhấn hoàn hảo cho bộ trang phục của bạn.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section
      className="relative w-full h-screen flex items-end justify-between px-20"
      style={{
        background: `linear-gradient(135deg, #fdf7f4 0%, #fbeeee 50%, #fff6f2 100%)`,
      }}
    >
      {/* Left text section */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mb-24">
        <AnimatePresence mode="wait">
          <motion.h1
            key={data[current].title}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-6xl font-serif font-bold leading-tight mb-6 text-gray-900"
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
            transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
            className="text-lg italic text-gray-600 mb-10"
          >
            {data[current].desc}
          </motion.p>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="flex gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className={`w-20 h-24 relative overflow-hidden rounded-t-full border transition-all duration-300 cursor-pointer
                ${
                  current === i
                    ? "border-black scale-110 shadow-md"
                    : "border-gray-300 hover:scale-105"
                }`}
              onClick={() => setCurrent(i)}
            >
              <Image
                src={item.img}
                alt={`thumbnail ${i}`}
                width={300}
                height={400}
                quality={100}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right main image (sát đáy) */}
      <div className="flex-1 flex justify-center items-end relative h-full">
        <div className="w-[500px] h-[700px] relative overflow-hidden rounded-t-full border border-black shadow-lg self-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={data[current].img}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={data[current].img}
                alt="main"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
