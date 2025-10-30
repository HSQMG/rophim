"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          agree: false,
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-white dark:bg-[#0f0f0f] text-[#3e2c1c] dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* --- Thông tin liên hệ --- */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
              THÔNG TIN LIÊN HỆ
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base leading-relaxed">
              Chúng tôi làm việc từ <strong>8 giờ sáng - 5 giờ tối</strong>, từ{" "}
              <strong>thứ 2 đến thứ 7</strong> hàng tuần.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Customer Service
                </h4>
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <FaPhoneAlt className="text-[#6d4c2f]" />
                  <a
                    href="tel:0984320202"
                    className="hover:text-[#6d4c2f] dark:hover:text-[#d9a97c] transition"
                  >
                    09384320202
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Địa chỉ email
                </h4>
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <FaEnvelope className="text-[#6d4c2f]" />
                  <a
                    href="mailto:unidofficial43@gmail.com"
                    className="hover:text-[#6d4c2f] dark:hover:text-[#d9a97c] transition"
                  >
                    unidofficial43@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- Form liên hệ --- */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 text-gray-700 dark:text-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#3e2c1c] dark:text-white">
              HỖ TRỢ
            </h2>

            {["name", "email", "phone", "subject"].map((field) => (
              <input
                key={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "name"
                    ? "Tên của bạn"
                    : field === "email"
                    ? "Email"
                    : field === "phone"
                    ? "Số điện thoại"
                    : "Chủ đề"
                }
                value={(formData as any)[field]}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f] text-sm sm:text-base placeholder-gray-400 dark:placeholder-gray-500"
              />
            ))}

            <textarea
              name="message"
              placeholder="Nội dung"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f] text-sm sm:text-base placeholder-gray-400 dark:placeholder-gray-500"
            ></textarea>

            <div className="flex items-start space-x-2 text-xs sm:text-sm leading-tight">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="accent-[#6d4c2f] mt-1"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Dữ liệu sẽ được thu thập và lưu trữ theo{" "}
                <a
                  href="/privacy-policy"
                  className="underline text-[#6d4c2f] dark:text-[#d9a97c]"
                >
                  Điều khoản Bảo mật
                </a>
                .
              </span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`bg-[#6d4c2f] text-white py-3 rounded font-medium text-sm sm:text-base hover:bg-[#5a3f26] transition ${
                status === "loading" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status === "loading" ? "Đang gửi..." : "Gửi Thông Tin"}
            </button>

            {status === "success" && (
              <div className="mt-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded text-sm">
                ✅ Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm nhất có
                thể.
              </div>
            )}
            {status === "error" && (
              <div className="mt-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded text-sm">
                ❌ Gửi thất bại. Vui lòng thử lại sau!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
