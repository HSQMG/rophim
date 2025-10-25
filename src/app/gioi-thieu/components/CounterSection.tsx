"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function CounterSection() {
  const counters = [
    { value: 70, suffix: "%", title: "Bán hàng trực tuyến", delay: 0 },
    { value: 215, suffix: "", title: "Thị trường", delay: 0.2 },
    { value: 500, prefix: ">", suffix: "", title: "Nhân viên", delay: 0.4 },
    { value: 50, prefix: ">", suffix: "", title: "Quốc gia", delay: 0.6 },
  ];

  return (
    <section
      className="relative py-16 sm:py-20 text-white text-center"
      style={{
        backgroundImage: "url('/bg-counter.jpg')", // 👉 thay ảnh thật của bạn
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay mờ để nổi chữ */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Nội dung */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
        {counters.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            viewport={{ once: true }}
            className="space-y-2 sm:space-y-3"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
              {item.prefix && <span>{item.prefix}</span>}
              <CountUp end={item.value} duration={2} />
              {item.suffix && <span>{item.suffix}</span>}
            </div>
            <p className="text-sm sm:text-base md:text-lg font-light text-gray-200">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
