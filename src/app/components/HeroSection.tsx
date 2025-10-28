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

  // --- Load slides ---
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
    <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-[#f9f8f5] select-none">
      {/* --- Background --- */}
      <div className="absolute inset-0">
        <Image
          src="/image/anh-nhom-bia/anh-nen-bia.jpg"
          alt="Background Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000020] to-transparent" />
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

        {/* --- Text (desktop) --- */}
        {/* --- Text (desktop) --- */}
<div className="hidden sm:flex relative z-10 flex-col justify-center h-full px-6 sm:px-10 md:px-20 text-white">
  <motion.h1
    key={`title-${current}`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.5 }}
    style={{
      fontFamily: "FCClassyVogue",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      wordBreak: "break-word",
    }}
    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] leading-snug sm:leading-tight 
               text-[#f4ede2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] 
               max-w-[90%] sm:max-w-[70%] md:max-w-[55%]"  // 👈 Giới hạn chiều rộng
  >
    {slides[current].title}
  </motion.h1>

  <motion.p
    key={`desc-${current}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    style={{ fontFamily: "TUV" }}
    className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl text-[#f4ede2] 
               max-w-[90%] sm:max-w-[60%] md:max-w-[50%] leading-relaxed drop-shadow-sm"
  >
    {slides[current].desc}
  </motion.p>
</div>


        {/* --- Ảnh desktop --- */}
        <div className="hidden sm:flex absolute bottom-0 right-6 md:right-20 items-end justify-center h-full pointer-events-none">
          <motion.div
            key={`frame-${current}`}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
            className="relative w-[220px] sm:w-[300px] md:w-[460px] h-[340px] sm:h-[480px] md:h-[700px] rounded-t-[120px] sm:rounded-t-[160px] md:rounded-t-[200px] overflow-hidden shadow-2xl border-2 border-white/60"
          >
            <Image
              src={slides[current].img}
              alt={slides[current].title}
              fill
              className="object-cover object-top"
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
          className="relative w-[230px] h-[290px] rounded-t-[100px] overflow-hidden shadow-2xl border-2 border-white/60 mb-6"
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
          className="text-xl sm:text-2xl font-serif text-white leading-snug drop-shadow-lg max-w-[90%]"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={`desc-mobile-${current}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-xs sm:text-sm text-[#f4ede2] leading-relaxed drop-shadow-sm max-w-[90%]"
        >
          {slides[current].desc}
        </motion.p>
      </div>

      {/* --- Nút điều hướng Mobile --- */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-3 z-30 sm:hidden -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="bg-black/40 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition shadow-md active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black/40 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition shadow-md active:scale-95"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* --- Thumbnail nhỏ --- */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 z-20 flex gap-2 sm:gap-4 bg-white/10 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/30 shadow-lg overflow-x-auto">
        {slides.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24 overflow-hidden rounded-lg sm:rounded-xl border transition-all duration-300 cursor-pointer ${
              current === i
                ? "border-[#d3b58f] scale-105 shadow-md"
                : "border-white/40 hover:border-[#e0d1b2]"
            }`}
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover object-top"
            />
            {current === i && <div className="absolute inset-0 bg-black/15" />}
          </button>
        ))}
      </div>
    </section>
  );
}
