"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function ProductEditor() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    sale: false,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🧠 Load từ file thật qua API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch(() => setProducts([]));
  }, []);

  // 💾 Lưu lại file JSON thật
  const saveToFile = async (updated: any[]) => {
    setProducts(updated);
    setSaving(true);
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  // 🔢 Định dạng giá
  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted + "đ";
  };

  // 🖼 Upload ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm({ ...form, image: base64 });
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  // ➕ Thêm hoặc cập nhật
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.image)
      return alert("Vui lòng nhập đầy đủ thông tin!");

    const cleanForm = {
      ...form,
      price: form.price.replace(/\D/g, ""),
      oldPrice: form.oldPrice.replace(/\D/g, ""),
    };

    let updated;
    if (editingId) {
      updated = products.map((p) =>
        p.id === editingId ? { ...p, ...cleanForm } : p
      );
      setEditingId(null);
    } else {
      updated = [...products, { ...cleanForm, id: Date.now() }];
    }

    await saveToFile(updated);

    // Reset form
    setForm({ name: "", price: "", oldPrice: "", image: "", sale: false });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✏️ Sửa
  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      ...product,
      price: formatPrice(product.price),
      oldPrice: formatPrice(product.oldPrice || ""),
    });
    setPreview(product.image);
  };

  // 🗑 Xóa
  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      const updated = products.filter((p) => p.id !== id);
      await saveToFile(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛍 Quản lý sản phẩm</h1>

      {saving && (
        <p className="text-green-600 mb-3 text-center animate-pulse">
          💾 Đang lưu dữ liệu vào file...
        </p>
      )}

      {/* FORM */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-10">
        <h2 className="font-semibold mb-4 text-lg">
          {editingId ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Giá sản phẩm (đã sale)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: formatPrice(e.target.value) })
            }
            className="border px-3 py-2 rounded"
            inputMode="numeric"
          />

          <input
            placeholder="Giá cũ (trước khi sale)"
            value={form.oldPrice}
            onChange={(e) =>
              setForm({ ...form, oldPrice: formatPrice(e.target.value) })
            }
            className="border px-3 py-2 rounded"
            inputMode="numeric"
          />

          <div className="col-span-1 md:col-span-1">
            <label className="block font-medium mb-1">Hình ảnh</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border px-3 py-2 rounded w-full"
            />
            {preview && (
              <div className="relative w-full h-40 mt-2">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.sale}
              onChange={(e) => setForm({ ...form, sale: e.target.checked })}
            />
            <span>Sale</span>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-[#7B3F00] text-white py-2 px-4 rounded hover:bg-[#5c2e00] transition"
          >
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(products) && products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="relative w-full h-64 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-red-600 font-medium">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-sm">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            {product.sale && (
              <span className="text-xs bg-yellow-200 px-2 py-1 rounded">SALE</span>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
