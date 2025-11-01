"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  title: string;
  desc: string;
  img: string;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data: Slide[]) => setSlides(data))
      .catch(() => setSlides([]));
  }, []);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipe = Math.abs(offset) > 80 || Math.abs(velocity) > 500;
    if (!swipe) return;
    if (offset < 0) nextSlide();
    else prevSlide();
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-[#f9f8f5] dark:bg-[#0d0d0d] transition-colors duration-500 select-none">
      {/* --- Background --- */}
      <div className="absolute inset-0">
        <Image
          src="/image/anh-nhom-bia/anh-nen-bia.jpg"
          alt="Background Hero"
          fill
          priority
          className="object-cover object-center brightness-95 dark:brightness-75 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000020] to-transparent dark:from-[#00000090] dark:via-[#00000050]" />
      </div>

      {/* --- Desktop layout --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].title}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing hidden sm:block"
        />

        {/* --- Cột bên trái (title + desc + thumbnail) --- */}
        <div
          className="hidden sm:flex absolute top-1/2 left-[8vw] -translate-y-1/2 z-10 flex-col gap-8 
        text-white dark:text-[#f5e7c6] transition-colors duration-500 max-w-[40vw]"
        >
          {/* --- Text section --- */}
          <div>
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "FCClassyVogue",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // <-- Giới hạn tối đa 2 dòng
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 
  tracking-[0.05em] leading-snug text-[#f4ede2] dark:text-[#f5e7c6]
  drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
  max-w-[100%] sm:max-w-[60%] lg:max-w-[100%] text-center" // <-- Giới hạn độ rộng dòng
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontFamily: "TUV",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1, // Giữ 1 dòng
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl text-[#f4ede2] dark:text-[#e9dcc1]
  max-w-[85%] md:max-w-[70%] lg:max-w-[65%] xl:max-w-[90%] leading-relaxed drop-shadow-sm "
            >
              {slides[current].desc}
            </motion.p>
          </div>

          {/* --- Thumbnail nhỏ (cùng cột dọc) --- */}
          <div
            className="flex gap-3 sm:gap-4 bg-white/10 dark:bg-[#1a1a1a]/60 
            backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl 
            border border-white/30 dark:border-[#e8d8b3]/40 shadow-lg 
            overflow-x-auto justify-start items-center max-w-[85%]"
          >
            {slides.map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24 
                overflow-hidden rounded-lg sm:rounded-xl border transition-all 
                duration-300 cursor-pointer ${
                  current === i
                    ? "border-[#d3b58f] dark:border-[#f0dba9] scale-105 shadow-md"
                    : "border-white/40 dark:border-[#e8d8b3]/30 hover:border-[#e0d1b2]"
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                />
                {current === i && (
                  <div className="absolute inset-0 bg-black/15 dark:bg-white/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- Ảnh lớn bên phải --- */}
        <div className="hidden sm:flex absolute top-1/2 right-[8vw] -translate-y-1/2 items-center justify-center h-full pointer-events-none">
          <motion.div
            key={`frame-${current}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="relative w-[26vw] md:w-[28vw] lg:w-[30vw] xl:w-[32vw] 2xl:w-[34vw]
            h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh]
            rounded-t-[10vw] md:rounded-t-[9vw] lg:rounded-t-[8vw]
            overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.35)]
            border-[2px] border-white/70 dark:border-[#e8d8b3]/60
            bg-[#f9f8f5] dark:bg-[#0d0d0d]
            transition-all duration-500 ease-out"
          >
            <Image
              src={slides[current].img}
              alt={slides[current].title}
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </motion.div>
        </div>
      </AnimatePresence>

      {/* --- Mobile layout (ảnh trên, text dưới) --- */}
      <div className="sm:hidden relative z-10 flex flex-col items-center justify-center h-full pt-16 pb-10 px-4 text-center">
        <motion.div
          key={`mobile-frame-${current}`}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.6 }}
          className="relative w-[230px] h-[290px] rounded-t-[100px] overflow-hidden shadow-2xl border-2 border-white/60 dark:border-[#e8d8b3]/60 mb-6"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            className="object-cover object-top"
          />
        </motion.div>

        <motion.h1
          key={`title-mobile-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl font-serif text-white dark:text-[#f5e7c6] 
          leading-snug drop-shadow-lg max-w-[110%] text-center 
          whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={`desc-mobile-${current}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // 👈 số dòng tối đa hiển thị
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className="mt-3 text-xs sm:text-sm text-[#f4ede2] dark:text-[#e9dcc1]
  leading-relaxed drop-shadow-sm max-w-[100%]"
        >
          {slides[current].desc}
        </motion.p>
      </div>

      {/* --- Nút điều hướng Mobile --- */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-3 z-30 sm:hidden -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="bg-black/40 dark:bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 dark:hover:bg-white/30 transition shadow-md active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-white dark:text-[#f8eac8]" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black/40 dark:bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 dark:hover:bg-white/30 transition shadow-md active:scale-95"
        >
          <ChevronRight className="w-6 h-6 text-white dark:text-[#f8eac8]" />
        </button>
      </div>
    </section>
  );
}
