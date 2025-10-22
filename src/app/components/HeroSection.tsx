"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  // 🔹 Đọc dữ liệu từ API (hoặc dùng fallback)
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
        else
          setSlides([
            {
              img: "/home/image1.jpg",
              title: "CỬA HÀNG MILLAMONA",
              desc: "Bộ sưu tập cao cấp cho phong cách cá tính & năng động.",
            },
            {
              img: "/home/image2.jpg",
              title: "PHONG CÁCH THANH LỊCH",
              desc: "Khám phá xu hướng thời trang sang trọng & tinh tế.",
            },
          ]);
      })
      .catch(() =>
        setSlides([
          {
            img: "/home/image1.jpg",
            title: "CỬA HÀNG MILLAMONA",
            desc: "Bộ sưu tập cao cấp cho phong cách cá tính & năng động.",
          },
        ])
      );
  }, []);

  // 🔹 Xử lý bàn phím: ← và → để đổi ảnh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slides.length === 0) return;

      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrent((prev) =>
          prev === 0 ? slides.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative w-full h-screen flex items-end justify-between px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf7f4 0%, #fbeeee 50%, #fff6f2 100%)",
      }}
    >
      {/* 🔸 Left text */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mb-24">
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[current].title}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl font-serif font-bold leading-tight mb-6 text-gray-900"
          >
            {slides[current].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={slides[current].desc}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg italic text-gray-600 mb-10"
          >
            {slides[current].desc}
          </motion.p>
        </AnimatePresence>

        {/* 🔸 Thumbnails */}
        <div className="flex gap-4">
          {slides.map((item, i) => (
            <div
              key={i}
              className={`w-20 h-24 relative overflow-hidden rounded-t-full border transition-all duration-300 cursor-pointer ${
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
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔸 Right main image */}
      <div className="flex-1 flex justify-center items-end relative h-full">
        <div className="relative w-[520px] h-[720px]">
          {/* Viền ngoài bo tròn & mờ dần từ dưới lên */}
          <div
            className="absolute -top-[10px] left-1/2 translate-x-[calc(-50%+32px)] w-[520px] h-[720px] rounded-t-[260px] z-20 pointer-events-none"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderImage:
                "linear-gradient(to top, rgba(181,181,181,0), rgba(181,181,181,1)) 1",
            }}
          ></div>

          {/* Ảnh chính (animation xuất hiện từ trên xuống) */}
          <div className="relative w-full h-full overflow-hidden rounded-t-[260px] z-10 translate-x-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].img}
                initial={{ opacity: 0, y: -120 }} // xuất hiện từ trên xuống
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 120 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].img}
                  alt="main"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
