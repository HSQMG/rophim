"use client";

import { motion } from "framer-motion";

export default function RiseTogether() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Chúng ta cùng <br /> nhau trỗi dậy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Một công ty có thể sản xuất ra những sản phẩm - nhưng việc thay đổi
            môi trường làm việc cần sự hỗ trợ từ cộng đồng. Chúng tôi đã đặt
            nhiệm vụ của mình là đảm bảo mỗi thành viên trong đội ngũ toàn cầu
            của chúng tôi cảm thấy được nhìn thấy, truyền cảm hứng và truyền
            động lực. Sự nghiệp tại Inditex của bạn không chỉ là một công việc -
            nó là nguồn cảm hứng và cơ hội không ngừng.
          </p>
          <a
            href="/cua-hang"
            className="inline-block px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition"
          >
            Khám phá ngay
          </a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <img
            src="https://millamona.monamedia.net/wp-content/uploads/2024/01/ab_banner.jpg"
            alt="Rise Together"
            className="w-full h-[480px] object-cover rounded-[120px_120px_0px_0px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
