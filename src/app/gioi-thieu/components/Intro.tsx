"use client";
import { motion } from "framer-motion";

export default function GioiThieuPage() {
  return (
    <main>
      <section className="relative min-h-[70vh] sm:min-h-screen flex items-center bg-white">
        {/* Ảnh nền desktop */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/image/anh-nhom-bia/anh-chinh.jpg')",
          }}
        ></div>

        {/* Lớp phủ tối nhẹ cho desktop */}
        <div className="hidden md:block absolute inset-0 bg-black/50"></div>

        {/* Nội dung chính */}
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-5 sm:px-8 py-16 sm:py-0 gap-8">
          {/* Ảnh riêng cho mobile */}
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
              className="w-full h-[300px] object-contain rounded-[50px]"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="relative z-10 space-y-4 sm:space-y-6 text-center md:text-left order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold leading-snug mb-3 sm:mb-6 
                         text-black md:text-white max-w-3xl mx-auto break-words"
            >
              CHÚNG TÔI LÀ THƯƠNG HIỆU THỜI TRANG
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700 md:text-gray-100">
              Lấy cảm hứng từ văn hoá, thiên nhiên và con người Việt Nam, UNID
              mang đến những thiết kế thanh lịch, tinh tế và đậm bản sắc. Mỗi
              sản phẩm là sự giao hòa giữa truyền thống và hiện đại, đơn giản mà
              vẫn cuốn hút.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700 md:text-gray-100">
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
