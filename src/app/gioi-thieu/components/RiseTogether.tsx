"use client";

import { motion } from "framer-motion";

export default function RiseTogether() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <img
            style={{ objectPosition: "center 20%" }}
            src="/image/anh-nhom-bia/UNID.38973.jpg"
            alt="Rise Together"
            className="w-full h-[280px] sm:h-[380px] md:h-[480px] object-cover  rounded-[60px_60px_0px_0px] sm:rounded-[120px_120px_0px_0px]"
          />
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 space-y-4 sm:space-y-6 text-center md:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug tracking-wide">
            CHÚNG TA CÙNG NHAU <br className="hidden sm:block" /> KHỞI DẬY BẢN
            SẮC
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Thời trang có thể thay đổi theo mùa, nhưng giá trị văn hóa và cái
            đẹp truyền thống thì vẫn luôn trường tồn. UNID tin rằng, mỗi chi
            tiết trên sản phẩm đều là sợi dây gắn kết giữa người phụ nữ hiện đại
            và cội nguồn Việt. Chúng tôi không chỉ tạo nên trang phục, mà còn
            gửi gắm vào đó tinh thần của văn hóa, của con người. Tại UNID, thời
            trang là hành trình khám phá vẻ đẹp Việt trong dáng hình đương đại,
            giản dị, tinh tế và đầy cảm xúc.
          </p>

          <a
            href="/cua-hang"
            className="inline-block px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition text-sm sm:text-base"
          >
            Khám phá ngay
          </a>
        </motion.div>
      </div>
    </section>
  );
}
