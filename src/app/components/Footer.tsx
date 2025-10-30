"use client";

import { useState } from "react";
import { Merriweather } from "next/font/google";
import Link from "next/link";

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
    <footer
      className={`bg-[#111111] dark:bg-[#0b0b0b] text-gray-300 dark:text-gray-300 py-12 sm:py-16 transition-colors duration-500 ${merriweather.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h2 className="text-white dark:text-[#f5e7c6] text-2xl mb-4 font-bold">
              Unid
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-400">
              Unid là thương hiệu thời trang cao cấp dành cho phụ nữ hiện đại.
              Chúng tôi mang đến những sản phẩm tinh tế, sang trọng và đẳng cấp,
              giúp tôn lên vẻ đẹp của người phụ nữ.
            </p>
          </div>

          {/* Điều hướng */}
          <div>
            <h3 className="text-white dark:text-[#f5e7c6] font-semibold mb-4 text-sm tracking-wide">
              ĐIỀU HƯỚNG
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "TRANG CHỦ", href: "/" },
                { name: "CỬA HÀNG", href: "/cua-hang" },
                { name: "VỀ UNID", href: "/gioi-thieu" },
                { name: "LIÊN HỆ", href: "/lien-he" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#d3b78f] transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-[#f5e7c6] font-semibold mb-4 text-sm tracking-wide">
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
                  <a
                    href="#"
                    className="hover:text-[#d3b78f] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right w-full">
          <div className="max-w-md w-full">
            <h3 className="text-white dark:text-[#f5e7c6] text-xl sm:text-2xl md:text-3xl leading-snug mb-5 sm:mb-6 font-bold">
              NHẬN TẤT CẢ CÁC TIN TỨC
              <br className="hidden sm:block" />
              MỚI NHẤT & BẢN TIN
            </h3>

            <form
              onSubmit={handleSubmit}
              className="w-full"
              aria-label="newsletter-form"
            >
              <div className="flex flex-col sm:flex-row bg-white dark:bg-[#1a1a1a] rounded-md overflow-hidden shadow-sm transition-colors">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email..."
                  className="flex-1 px-4 py-3 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#7b5335] hover:bg-[#946a4a] dark:hover:bg-[#d3b78f] dark:text-[#2b1b0f] transition"
                >
                  ĐĂNG KÍ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12 border-t border-gray-800 dark:border-gray-700 pt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Unid. All rights reserved.
      </div>
    </footer>
  );
}
