// components/Footer.tsx
"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      alert("Vui lòng nhập địa chỉ email.");
      return;
    }
    alert(`Cảm ơn! Email đăng ký: ${email}`);
    setEmail("");
  }

  return (
    <footer className="bg-[#111111] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-white font-serif text-2xl mb-4">MILLAMONA</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Millamona là thương hiệu thời trang cao cấp dành cho phụ nữ hiện
              đại. Chúng tôi mang đến những sản phẩm thời trang tinh tế, sang
              trọng và đẳng cấp, giúp tôn lên vẻ đẹp của người phụ nữ.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">ĐIỀU HƯỚNG</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  TRANG CHỦ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  CỬA HÀNG
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  VỀ MILLAMONA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  TIN TỨC
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  LIÊN HỆ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">HỖ TRỢ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  HỎI ĐÁP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  CHÍNH SÁCH ĐỔI TRẢ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  ĐIỀU KHOẢN & CHÍNH SÁCH
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  CHÍNH SÁCH BẢO MẬT
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT - Newsletter */}
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-2xl md:text-3xl font-serif leading-snug mb-6">
            NHẬN TẤT CẢ CÁC TIN TỨC
            <br />
            MỚI NHẤT & BẢN TIN.
          </h3>

          {/* centered input like in your screenshot */}
          <form
            onSubmit={handleSubmit}
            className="mt-2 w-full max-w-[700px] mx-0 md:mx-0"
            aria-label="newsletter-form"
          >
            <div className="flex bg-white rounded-sm overflow-hidden shadow-sm">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email..."
                className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                aria-label="Nhập địa chỉ email"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-black bg-white border-l"
                aria-label="Đăng ký"
              >
                ĐĂNG KÍ
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* optional bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-8 border-t border-gray-800 pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Millamona. All rights reserved.
      </div>
    </footer>
  );
}
