"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Upload } from "lucide-react";

interface FashionItem {
  id: number;
  name: string;
  price: string;
  img: string;
  hoverImg: string;
  isNew: boolean;
}

export default function FashionSectionEditor() {
  const [items, setItems] = useState<FashionItem[]>([]);
  const [saving, setSaving] = useState(false);

  // 🔹 Load dữ liệu từ file JSON qua API
  useEffect(() => {
    fetch("/api/fashion")
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setItems(data) : setItems([])))
      .catch(() => setItems([]));
  }, []);

  // 🔸 Ghi file JSON thật
  const saveToFile = async (updated: FashionItem[]) => {
    setSaving(true);
    setItems(updated);
    await fetch("/api/fashion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  const handleAdd = () => {
    const newItem: FashionItem = {
      id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: "",
      price: "",
      img: "",
      hoverImg: "",
      isNew: false,
    };
    saveToFile([...items, newItem]);
  };

  const handleDelete = (id: number) => {
    saveToFile(items.filter((i) => i.id !== id));
  };

  const handleChange = (id: number, field: keyof FashionItem, value: string | boolean) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, [field]: value } : i
    );
    saveToFile(updated);
  };

  const handleImageUpload = (
    id: number,
    field: "img" | "hoverImg",
    file: File | null
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange(id, field, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-[#fefbf9]">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Thêm/Xóa phần danh mục thời trang
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
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              {/* Hình ảnh chính + hover */}
              <div className="flex gap-4 mb-4">
                {/* Ảnh chính */}
                <div className="flex-1 relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt="main"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 flex items-center justify-center h-full">
                      Ảnh chỉnh khi hiển thị
                    </div>
                  )}
                  <label className="absolute bottom-2 right-2 bg-white text-xs px-3 py-1 rounded-md shadow cursor-pointer hover:bg-gray-100">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(item.id, "img", e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>

                {/* Ảnh hover */}
                <div className="flex-1 relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                  {item.hoverImg ? (
                    <Image
                      src={item.hoverImg}
                      alt="hover"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 flex items-center justify-center h-full">
                      Ảnh sau khi di chuột vào
                    </div>
                  )}
                  <label className="absolute bottom-2 right-2 bg-white text-xs px-3 py-1 rounded-md shadow cursor-pointer hover:bg-gray-100">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(item.id, "hoverImg", e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Thông tin sản phẩm */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, "name", e.target.value)}
                  placeholder="Tên sản phẩm..."
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleChange(item.id, "price", e.target.value)}
                  placeholder="Giá sản phẩm..."
                  className="w-full border p-2 rounded-md"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={item.isNew}
                    onChange={(e) => handleChange(item.id, "isNew", e.target.checked)}
                  />
                  Sản phẩm mới (NEW!)
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full shadow-md hover:scale-105 transition"
          >
            <PlusCircle size={20} />
            Thêm sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
}
