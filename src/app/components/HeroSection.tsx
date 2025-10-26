"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimation,
} from "framer-motion";

interface Slide {
  title: string;
  desc: string;
  img: string;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data: Slide[]) => setSlides(data))
      .catch(() => setSlides([]));
  }, []);

  // Tự động chuyển ảnh mỗi 6s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    controls.start({ x: 0 });
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    controls.start({ x: 0 });
  };

  if (slides.length === 0) return null;

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Nếu kéo mạnh hoặc kéo đủ xa thì đổi ảnh
    if (offset > 100 || velocity > 500) {
      prevSlide();
    } else if (offset < -100 || velocity < -500) {
      nextSlide();
    } else {
      // Nếu kéo nhẹ → quay về giữa
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300 } });
    }
  };

  return (
    <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-[#f9f8f5]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].img}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            drag="x"
            style={{ x }}
            animate={controls}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={slides[current].img}
              alt={slides[current].title}
              fill
              className="object-cover object-center sm:object-top select-none"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000020] to-transparent" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* --- Text Overlay --- */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-20 text-white pointer-events-none">
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-wide leading-snug sm:leading-tight drop-shadow-lg max-w-[90%] sm:max-w-[80%]"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={`desc-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-[#f4ede2] max-w-[95%] sm:max-w-2xl leading-relaxed drop-shadow-sm"
        >
          {slides[current].desc}
        </motion.p>
      </div>

      {/* --- Frame image (ẩn bớt trên mobile) --- */}
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

      {/* --- Thumbnails --- */}
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
