"use client";
import { motion } from "framer-motion";

export default function GioiThieuPage() {
  return (
    <main>
      <section className="relative min-h-[90vh] sm:min-h-[110vh] flex items-center bg-white dark:bg-[#0e0e0e] transition-colors">
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('/image/anh-nhom-bia/anh-chinh.jpg')",
          }}
        />
        <div className="hidden md:block absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-5 sm:px-8 py-16 sm:py-0 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:hidden order-1"
          >
            <img
              src="/image/anh-nhom-bia/anh-chinh.jpg"
              alt="Giới thiệu UNID"
              className="w-full h-[380px] sm:h-[420px] object-contain object-top rounded-[50px]"
            />
          </motion.div>
          <motion.div
            className="relative z-10 order-2 ml-0 md:ml-[2%] text-center md:text-left space-y-6 max-w-[600px] mx-auto md:mx-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight 
  text-black md:text-white dark:text-[#f5e7c6] text-center md:text-left 
  line-clamp-2 "
            >
              CHÚNG TÔI LÀ THƯƠNG HIỆU THỜI TRANG UNID
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700 md:text-gray-100 dark:text-gray-300 whitespace-normal break-words">
              Lấy cảm hứng từ văn hoá, thiên nhiên và con người Việt Nam, UNID
              mang đến những thiết kế thanh lịch, tinh tế và đậm bản sắc. Mỗi
              sản phẩm là sự giao hòa giữa truyền thống và hiện đại — đơn giản
              mà vẫn cuốn hút.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700 md:text-gray-100 dark:text-gray-300 whitespace-normal break-words">
              Chúng tôi tin rằng thời trang là cách người phụ nữ thể hiện sự tự
              tin và niềm tự hào về cội nguồn. UNID theo đuổi con đường thời
              trang bền vững, đề cao chất lượng, giá trị sử dụng và tinh thần
              Việt trong từng đường kim mũi chỉ.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
