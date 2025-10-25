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

    // Ẩn thông báo sau 4 giây
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-white text-[#3e2c1c]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* --- CỘT TRÁI --- */}
          <div>
            <h2 className="text-3xl font-bold mb-4">THÔNG TIN LIÊN HỆ</h2>
            <p className="text-gray-600 mb-8">
              Chúng tôi làm việc từ 9 giờ sáng - 6 giờ tối, 5 ngày một tuần.
            </p>

            <div className="mb-6">
              <h4 className="font-semibold mb-1">Customer Service</h4>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPhoneAlt className="text-[#3e2c1c]" />
                <a
                  href="tel:1900636648"
                  className="hover:text-[#6d4c2f] transition"
                >
                  1900 636 648
                </a>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-1">Địa chỉ email</h4>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaEnvelope className="text-[#3e2c1c]" />
                <a
                  href="mailto:unidofficial43@gmail.com"
                  className="hover:text-[#6d4c2f] transition"
                >
                  info@themona.global
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Địa chỉ</h4>
              <div className="flex items-start space-x-2 text-gray-700">
                <FaMapMarkerAlt className="text-[#3e2c1c] mt-1" />
                <p>
                  Công ty TNHH – MONA MEDIA <br />
                  1073/23 Đ. Cách Mạng Tháng 8, P.7, Tân Bình, TP.HCM 72100,
                  Việt Nam
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 text-gray-700 relative"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#3e2c1c]">HỖ TRỢ</h2>

            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f]"
            />

            <input
              type="text"
              name="subject"
              placeholder="Chủ đề"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f]"
            />

            <textarea
              name="message"
              placeholder="Nội dung"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#6d4c2f]"
            ></textarea>

            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="accent-[#6d4c2f]"
              />
              <span>
                Dữ liệu sẽ được thu thập và lưu trữ theo{" "}
                <a href="/privacy-policy" className="underline text-[#6d4c2f]">
                  Điều khoản Bảo mật
                </a>
                .
              </span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`bg-[#6d4c2f] text-white py-3 rounded font-medium hover:bg-[#5a3f26] transition ${
                status === "loading" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status === "loading" ? "Đang gửi..." : "Gửi Thông Tin"}
            </button>
            {status === "success" && (
              <div className="mt-3 text-green-600 bg-green-50 border border-green-200 p-3 rounded text-sm">
                ✅ Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm nhất có
                thể.
              </div>
            )}
            {status === "error" && (
              <div className="mt-3 text-red-600 bg-red-50 border border-red-200 p-3 rounded text-sm">
                ❌ Gửi thất bại. Vui lòng thử lại sau!
              </div>
            )}
          </form>
        </div>

        {/* --- GOOGLE MAP --- */}
        <div className="mt-20 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=C%C3%B4ng%20ty%20TNHH%20%E2%80%93%20MONA%20MEDIA%201073%2F23%20%C4%90.%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%2C%20P.7%2C%20T%C3%A2n%20B%C3%ACnh%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2072100%2C%20Vi%E1%BB%87t%20Nam&amp;t=m&amp;z=16&amp;output=embed"
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen
            title="Mona Media Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
