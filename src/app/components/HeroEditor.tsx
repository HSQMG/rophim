"use client";

import { useEffect, useState } from "react";

export default function HeroEditor() {
  const [slides, setSlides] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch(() => setSlides([]));
  }, []);

  const saveToFile = async (updated: any[]) => {
    setSlides(updated);
    setSaving(true);
    await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  const handleAdd = () => {
    const updated = [...slides, { title: "", desc: "" }];
    saveToFile(updated);
  };

  const handleDelete = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    saveToFile(updated);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...slides];
    updated[index][field] = value;
    saveToFile(updated);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Quản lý nội dung trang chủ
      </h1>

      {slides.map((slide, index) => (
        <div
          key={index}
          className="border rounded-2xl p-6 mb-6 bg-white shadow-sm hover:shadow-lg transition"
        >
          <div className="space-y-4">
            <input
              type="text"
              className="border border-gray-300 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Nhập tiêu đề..."
              value={slide.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />

            <textarea
              className="border border-gray-300 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black outline-none"
              rows={3}
              placeholder="Nhập mô tả..."
              value={slide.desc}
              onChange={(e) => handleChange(index, "desc", e.target.value)}
            />

            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 text-sm hover:underline"
              >
                🗑 Xóa
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleAdd}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          ➕ Thêm Slide
        </button>
      </div>

      {saving && (
        <p className="text-center text-sm text-gray-500 mt-4 animate-pulse">
          Đang lưu thay đổi...
        </p>
      )}
    </div>
  );
}
