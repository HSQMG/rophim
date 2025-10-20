"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Upload } from "lucide-react";

interface HighlightItem {
  id: number;
  category: string;
  date: string;
  month: string; // chỉ chứa số
  title: string;
  img: string;
}

export default function ProductHighlightEditor() {
  const [items, setItems] = useState<HighlightItem[]>([]);
  const [saving, setSaving] = useState(false);

  // 🔹 Đọc dữ liệu từ file JSON thật qua API
  useEffect(() => {
    fetch("/api/highlight")
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setItems(data) : setItems([])))
      .catch(() => setItems([]));
  }, []);

  // 🔹 Lưu dữ liệu về file JSON
  const saveToFile = async (updated: HighlightItem[]) => {
    setSaving(true);
    setItems(updated);
    await fetch("/api/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  // ➕ Thêm highlight mới
  const handleAdd = () => {
    const newItem: HighlightItem = {
      id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      category: "",
      date: "",
      month: "",
      title: "",
      img: "",
    };
    saveToFile([...items, newItem]);
  };

  // 🗑 Xóa
  const handleDelete = (id: number) => {
    saveToFile(items.filter((i) => i.id !== id));
  };

  // ✏️ Sửa text
  const handleChange = (
    id: number,
    field: keyof HighlightItem,
    value: string
  ) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, [field]: value } : i
    );
    saveToFile(updated);
  };

  // 🖼 Upload ảnh
  const handleImageUpload = (id: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange(id, "img", e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Chỉ cho phép nhập số (1–12) ở ô tháng
  const handleMonthChange = (id: number, value: string) => {
    // chỉ giữ ký tự số
    const numericValue = value.replace(/\D/g, "");
    // nếu số vượt quá 12 thì cắt
    if (Number(numericValue) > 12) return;
    handleChange(id, "month", numericValue);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-[#fefbf9]">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Thêm / Xóa sản phẩm nổi bật
        </h2>

        {saving && (
          <p className="text-center text-green-600 mb-4 animate-pulse">
            💾 Đang lưu thay đổi...
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#fdfbf9] rounded-xl shadow-md p-6 relative"
            >
              {/* Nút xóa */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              {/* Ảnh */}
              <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 flex items-center justify-center h-full">
                    Chưa có hình ảnh
                  </div>
                )}
                <label className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-lg shadow-md text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(item.id, e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              {/* Input fields */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) =>
                    handleChange(item.id, "category", e.target.value)
                  }
                  placeholder="Loại sản phẩm"
                  className="w-full border p-2 rounded-md"
                />

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) =>
                      handleChange(item.id, "date", e.target.value)
                    }
                    placeholder="Ngày (VD: 30)"
                    className="w-1/2 border p-2 rounded-md"
                    inputMode="numeric"
                  />
                  <input
                    type="text"
                    value={item.month}
                    onChange={(e) =>
                      handleMonthChange(item.id, e.target.value)
                    }
                    placeholder="Tháng (VD: 10)"
                    className="w-1/2 border p-2 rounded-md"
                    inputMode="numeric"
                  />
                </div>

                <textarea
                  value={item.title}
                  onChange={(e) =>
                    handleChange(item.id, "title", e.target.value)
                  }
                  placeholder="Tiêu đề..."
                  className="w-full border p-2 rounded-md h-20 resize-none"
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        {/* Nút thêm mới */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full shadow-md hover:scale-105 transition"
          >
            <PlusCircle size={20} />
            Thêm Highlight
          </button>
        </div>
      </div>
    </section>
  );
}
