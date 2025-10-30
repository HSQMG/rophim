"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  title: string;
  items: string;
  link: string;
  script?: string;
}

export default function FeaturedCategoriesEditor() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  // 🟢 Load dữ liệu từ file JSON
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  // 💾 Lưu lại vào file JSON
  const saveToFile = async (updated: Category[]) => {
    setCategories(updated);
    setSaving(true);
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  // ➕ Thêm danh mục
  const handleAddCategory = () => {
    const updated = [...categories, { title: "", items: "", link: "" }];
    saveToFile(updated);
  };

  // 🗑 Xóa danh mục
  const handleRemoveCategory = (index: number) => {
    const updated = categories.filter((_, i) => i !== index);
    saveToFile(updated);
  };

  // ✏️ Cập nhật nội dung
  const handleChange = (
    index: number,
    field: keyof Category,
    value: string
  ) => {
    const updated = [...categories];
    updated[index][field] = value;

    // Tạo slug tự động khi sửa tiêu đề
    if (field === "title") {
      const slug = value.trim().toLowerCase().replace(/\s+/g, "-");
      updated[index].link = "/category/" + slug;
    }

    saveToFile(updated);
  };

  // 🔢 Chỉ cho phép số trong ô "items"
  const handleChangeItems = (index: number, value: string) => {
    if (/^\d*$/.test(value)) handleChange(index, "items", value);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-[#fefbf9]">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Thêm / Xóa danh mục sản phẩm
        </h2>

        {saving && (
          <p className="text-center text-green-600 mb-3 animate-pulse">
            💾 Đang lưu thay đổi...
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#fdf9f6] rounded-xl shadow-md p-6 relative"
            >
              {/* 🗑 Nút xóa */}
              <button
                onClick={() => handleRemoveCategory(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              {/* 📝 Form chỉnh sửa */}
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
                  placeholder="Số lượng sản phẩm"
                  className="w-full border p-2 rounded-md"
                />
                <textarea
                  value={cat.script || ""}
                  onChange={(e) =>
                    handleChange(index, "script", e.target.value)
                  }
                  placeholder="Mô tả hiển thị khi click vào danh mục..."
                  className="w-full border p-2 rounded-md h-32 resize-y"
                />
              </div>

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
