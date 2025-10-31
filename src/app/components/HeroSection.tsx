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
          key={slides[current].img}
          className="absolute inset-0 hidden sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* --- Text (dịch sang phải 20%) --- */}
          <div className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-20 md:px-28 text-white dark:text-[#f5e7c6]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className=" sm:mt-40 md:mt-48 lg:mt-52 ml-[5%] mt-[30%]" // 🔥 chữ cách mép trái 20%
            >
              <h1
                style={{ fontFamily: "FCClassyVogue" }}
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-[0.05em] leading-snug sm:leading-tight 
                  text-[#f4ede2] dark:text-[#f5e7c6]
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] 
                  mb-3 max-w-[70%]"
              >
                {slides[current].title}
              </h1>

              <p
                className="text-sm sm:text-base md:text-lg text-[#f4ede2] dark:text-[#e9dcc1]
                  leading-relaxed drop-shadow-sm opacity-95 max-w-[60%]"
              >
                {slides[current].desc}
              </p>
            </motion.div>
          </div>

          {/* --- Ảnh lớn (bên phải) --- */}
          <motion.div
            key={`img-${current}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 right-[8vw] flex items-end justify-center h-full pointer-events-none"
          >
            <div
              className="
                relative 
                w-[22vw] md:w-[25vw] lg:w-[26vw] xl:w-[28vw]
                h-[60vh] md:h-[70vh] lg:h-[75vh]
                rounded-t-[9vw] overflow-hidden 
                shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                border-[2px] border-white/70 dark:border-[#e8d8b3]/60
                bg-[#f9f8f5] dark:bg-[#0d0d0d]
                transition-all duration-500 ease-out
              "
            >
              <Image
                src={slides[current].img}
                alt={slides[current].title}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* --- Mobile layout (giữ nguyên) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].img + "-mobile"}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.6 }}
          className="sm:hidden relative z-10 flex flex-col items-center justify-center h-full pt-20 pb-10 px-4 text-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative w-[220px] h-[280px] rounded-t-[90px] overflow-hidden shadow-2xl border-2 border-white/60 dark:border-[#e8d8b3]/60 mb-6">
            <Image
              src={slides[current].img}
              alt={slides[current].title}
              fill
              className="object-cover object-top"
            />
          </div>

          <h1 className="text-lg sm:text-xl font-serif text-white dark:text-[#f5e7c6] leading-snug drop-shadow-lg max-w-[90%]">
            {slides[current].title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#f4ede2] dark:text-[#e9dcc1] leading-relaxed drop-shadow-sm max-w-[90%]">
            {slides[current].desc}
          </p>
        </motion.div>
      </AnimatePresence>

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
