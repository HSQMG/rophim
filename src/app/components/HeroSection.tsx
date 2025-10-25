"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (slides.length === 0) return;
      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#f9f8f5]">
      {/* --- Background --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].img}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-[#00000020] to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 max-w-3xl text-white">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif tracking-wide leading-tight drop-shadow-lg"
          >
            {slides[current].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-[#f4ede2] max-w-2xl leading-relaxed drop-shadow-sm"
          >
            {slides[current].desc}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 right-10 md:right-20 flex items-end justify-center h-full pointer-events-none">
        <motion.div
          key={`frame-${current}`}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.8 }}
          className="relative w-[280px] md:w-[460px] h-[420px] md:h-[700px] rounded-t-[200px] overflow-hidden shadow-2xl border-2 border-white/60"
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            className="object-cover object-top"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8 md:left-16 z-20 flex gap-4 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30 shadow-lg">
        {slides.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
              current === i
                ? "border-[#d3b58f] scale-110 shadow-md"
                : "border-white/40 hover:border-[#e0d1b2] hover:scale-105"
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
