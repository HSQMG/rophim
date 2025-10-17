"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
  script?: string;
}

export default function FeaturedCategoriesEditor() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("featuredCategories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("featuredCategories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { title: "", items: "", image: "", link: "" },
    ]);
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Category,
    value: string
  ) => {
    const updated = [...categories];
    updated[index][field] = value;
    setCategories(updated);
    // Tự động tạo link từ title
    if (field === "title") {
      const slug = value.trim().toLowerCase().replace(/\s+/g, "-");
      updated[index].link = "/category/" + slug;
    }

    setCategories(updated);
  };

  const handleChangeItems = (index: number, value: string) => {
    // Chỉ cho phép nhập số
    if (/^\d*$/.test(value)) {
      handleChange(index, "items", value);
    }
  };

  const handleChangeScript = (index: number, value: string) => {
    handleChange(index, "script", value);
  };

  const handleImageUpload = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...categories];
      updated[index].image = e.target?.result as string;
      setCategories(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-[#fefbf9]">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          ✏️ Chỉnh sửa danh mục nổi bật
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#fdf9f6] rounded-xl shadow-md p-6 relative"
            >
              {/* Nút xóa */}
              <button
                onClick={() => handleRemoveCategory(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              {/* Hình ảnh */}
              <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Chưa có hình ảnh</div>
                )}
                <label className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-lg shadow-md text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                  <Upload size={16} />
                  Thêm ảnh
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(index, e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={cat.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  placeholder="Tên danh mục..."
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="text"
                  value={cat.items}
                  onChange={(e) => handleChangeItems(index, e.target.value)}
                  placeholder="Số lượng items"
                  className="w-full border p-2 rounded-md"
                />
                <textarea
                  value={cat.script || ""}
                  onChange={(e) =>
                    handleChange(index, "script", e.target.value)
                  }
                  placeholder="Nhập HTML/JS tùy ý, có thể xuống dòng..."
                  className="w-full border p-2 rounded-md h-32 resize-y"
                />
              </div>

              {/* Hiển thị link tự động */}
              {cat.link && (
                <p className="mt-2 text-gray-500 text-sm">
                  Link: <code>{cat.link}</code>
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Nút thêm danh mục */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full shadow-md hover:scale-105 transition"
          >
            <PlusCircle size={20} />
            Thêm danh mục
          </button>
        </div>
      </div>
    </section>
  );
}
