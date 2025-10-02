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
      className="relative py-20 text-white"
      style={{
        backgroundImage: "url('/bg-counter.jpg')", // 👉 thay bằng ảnh của bạn
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay đen mờ */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {counters.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="text-4xl font-bold">
              {item.prefix && <span>{item.prefix}</span>}
              <CountUp end={item.value} duration={2} />
              {item.suffix && <span>{item.suffix}</span>}
            </div>
            <p className="text-lg">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
