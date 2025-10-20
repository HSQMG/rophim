"use client";

import { useState } from "react";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Vui lòng nhập địa chỉ email.");
      return;
    }
    alert(`Cảm ơn! Email đăng ký: ${email}`);
    setEmail("");
  };

  return (
    <footer className={`bg-[#111111] text-gray-300 py-16 ${merriweather.className}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Cột 1 */}
          <div>
            <h2 className="text-white text-2xl mb-4 font-bold">MILLAMONA</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Millamona là thương hiệu thời trang cao cấp dành cho phụ nữ hiện đại.
              Chúng tôi mang đến những sản phẩm tinh tế, sang trọng và đẳng cấp,
              giúp tôn lên vẻ đẹp của người phụ nữ.
            </p>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
              ĐIỀU HƯỚNG
            </h3>
            <ul className="space-y-2 text-sm">
              {["TRANG CHỦ", "CỬA HÀNG", "VỀ MILLAMONA", "TIN TỨC", "LIÊN HỆ"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
              HỖ TRỢ
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "HỎI ĐÁP",
                "CHÍNH SÁCH ĐỔI TRẢ",
                "ĐIỀU KHOẢN & CHÍNH SÁCH",
                "CHÍNH SÁCH BẢO MẬT",
              ].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right">
          <div className="max-w-md w-full">
            <h3 className="text-white text-2xl md:text-3xl leading-snug mb-6 font-bold">
              NHẬN TẤT CẢ CÁC TIN TỨC
              <br />
              MỚI NHẤT & BẢN TIN.
            </h3>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full"
              aria-label="newsletter-form"
            >
              <div className="flex bg-white rounded-md overflow-hidden shadow-sm">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email..."
                  className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#7b5335] hover:bg-[#946a4a] transition"
                >
                  ĐĂNG KÍ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Millamona. All rights reserved.
      </div>
    </footer>
  );
}
