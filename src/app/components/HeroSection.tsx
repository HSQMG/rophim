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
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/hero");
        if (!res.ok) throw new Error("Failed to fetch slides");
        const data: Slide[] = await res.json();
        setSlides(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slides.length === 0) return;
      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <section
      role="region"
      aria-label="Hero Section"
      className="relative w-full h-screen flex flex-col md:flex-row items-end justify-between px-8 md:px-20 overflow-hidden"
      style={{
        backgroundImage: ` url('/image/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 flex flex-col justify-center max-w-3xl mb-12 md:mb-24">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6 text-gray-900 max-w-3xl"
          >
            {slides[current].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-md md:text-lg italic text-gray-600 mb-10 max-w-2xl leading-relaxed"
          >
            {slides[current].desc}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-4 flex-wrap">
          {slides.map((item, i) => (
            <div
              key={i}
              className={`w-20 h-24 relative overflow-hidden rounded-t-full border transition-transform duration-300 cursor-pointer ${
                current === i
                  ? "border-black scale-110 shadow-md"
                  : "border-gray-300 hover:scale-105"
              }`}
              onClick={() => setCurrent(i)}
            >
              <Image
                src={item.img}
                alt={`Thumbnail for ${item.title}`}
                width={300}
                height={400}
                quality={70}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-end relative h-full mt-8 md:mt-0">
        <div className="relative w-[320px] md:w-[520px] h-[440px] md:h-[720px]">
          <div
            className="absolute -top-[10px] left-1/2 translate-x-[calc(-50%+16px)] w-full h-full rounded-t-[180px] md:rounded-t-[260px] z-20 pointer-events-none"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderImage:
                "linear-gradient(to top, rgba(181,181,181,0), rgba(181,181,181,1)) 1",
            }}
          ></div>
          <div className="relative w-full h-full overflow-hidden rounded-t-[180px] md:rounded-t-[260px] z-10 translate-x-4 md:translate-x-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${current}`}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].img}
                  alt={slides[current].title}
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
