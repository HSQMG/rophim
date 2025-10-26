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

  // --- Điều khiển phím trái/phải trên desktop ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slides.length === 0) return;
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

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
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].img}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing"
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            priority
            className="object-cover object-center sm:object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000020] to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-20 text-white">
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-wide leading-snug sm:leading-tight drop-shadow-lg max-w-[90%] sm:max-w-[80%]"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={`desc-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-[#f4ede2] max-w-[95%] sm:max-w-2xl leading-relaxed drop-shadow-sm"
        >
          {slides[current].desc}
        </motion.p>
      </div>

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
