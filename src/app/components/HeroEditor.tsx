"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

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

  const handleImageUpload = (e: any, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...slides];
      updated[index].img = reader.result;
      saveToFile(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const updated = [...slides, { img: "", title: "", desc: "" }];
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
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Thêm / xóa hình ảnh trang chủ
      </h1>

      {slides.map((slide, index) => (
        <div
          key={index}
          className="border rounded-2xl p-6 mb-8 bg-white shadow-sm hover:shadow-lg transition"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-56 h-72 bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden group">
              {slide.img ? (
                <img
                  src={slide.img}
                  alt={`slide-${index}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 text-sm italic flex flex-col items-center">
                  <Upload className="w-10 h-10 mb-2 opacity-60" />
                  Chưa có ảnh
                </div>
              )}

              <label
                htmlFor={`file-${index}`}
                className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition"
              >
                📁 Chọn ảnh
              </label>
              <input
                type="file"
                id={`file-${index}`}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </div>

            <div className="flex-1 space-y-4">
              <input
                type="text"
                className="border border-gray-300 w-full rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-black focus:border-black outline-none"
                placeholder="Nhập tiêu đề..."
                value={slide.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />

              <textarea
                className="border border-gray-300 w-full rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-black focus:border-black outline-none"
                rows={3}
                placeholder="Nhập mô tả..."
                value={slide.desc}
                onChange={(e) => handleChange(index, "desc", e.target.value)}
              />

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
    </div>
  );
}
