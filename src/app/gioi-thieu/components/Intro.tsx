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
              Lấy cảm hứng từ văn hoá, thiên nhiên và con người Việt Nam, UNID
              mang đến những thiết kế thanh lịch, tinh tế và đậm bản sắc. Mỗi
              sản phẩm là sự giao hòa giữa truyền thống và hiện đại, đơn giản mà
              vẫn cuốn hút.
            </p>
            <p className="text-lg leading-relaxed mb-6">
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
