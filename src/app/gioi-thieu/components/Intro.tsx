"use client";
import { motion } from "framer-motion";

export default function GioiThieuPage() {
  return (
    <main>
      <section
        className="relative bg-cover bg-center text-white min-h-screen"
        style={{
          backgroundImage: "url('/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-screen">
          {/* Text Left */}
          <motion.div
            className="px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-6">
              CHÚNG TÔI LÀ CỬA HÀNG THỜI TRANG
            </h1>
            <p className="text-lg leading-relaxed mb-6">
              Nibh ipsum consequat nisl vel pretium lectus quam. Posuere lorem
              ipsum dolor sit amet consectetur adipiscing. Viverra suspendisse
              potenti nullam ac tortor vitae.
            </p>
            <p className="font-semibold">Dula - CEO</p>
            <img src="/signature.png" alt="Signature" className="mt-4 h-16" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
