"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Upload } from "lucide-react";

interface Post {
  id: number;
  category: string;
  date: string;
  title: string;
  img: string;
  script?: string;
}

export default function BlogSectionEditor() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [saving, setSaving] = useState(false);

  // 🟢 Đọc dữ liệu từ file thật
  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
        else setPosts([]);
      })
      .catch(() => setPosts([]));
  }, []);

  // 💾 Ghi dữ liệu vào file thật
  const saveToFile = async (updated: Post[]) => {
    setPosts(updated);
    setSaving(true);
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      category: "",
      date: "",
      title: "",
      img: "",
      script: "",
    };
    saveToFile([...posts, newPost]);
  };

  const handleRemovePost = (id: number) => {
    saveToFile(posts.filter((p) => p.id !== id));
  };

  const handleChange = (id: number, field: keyof Post, value: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    saveToFile(updated);
  };

  const handleImageUpload = (id: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange(id, "img", e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-[#fefbf9]">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Thêm/Xóa phần thời trang và xu hướng
        </h2>

        {saving && (
          <p className="text-center text-green-600 mb-4 animate-pulse">
            Đang lưu thay đổi...
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fdfbf9] rounded-xl shadow-md p-6 relative"
            >
              <button
                onClick={() => handleRemovePost(post.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {post.img ? (
                  <Image
                    src={post.img}
                    alt={post.title}
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
                      handleImageUpload(post.id, e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) =>
                    handleChange(post.id, "title", e.target.value)
                  }
                  placeholder="Tiêu đề bài viết..."
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="text"
                  value={post.category}
                  onChange={(e) =>
                    handleChange(post.id, "category", e.target.value)
                  }
                  placeholder="Danh mục (VD: FASHION)"
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="text"
                  value={post.date}
                  onChange={(e) =>
                    handleChange(post.id, "date", e.target.value)
                  }
                  placeholder="Ngày đăng (VD: 17 THÁNG CHÍN, 2022)"
                  className="w-full border p-2 rounded-md"
                />
                <textarea
                  value={post.script}
                  onChange={(e) =>
                    handleChange(post.id, "script", e.target.value)
                  }
                  placeholder="Thêm mô tả blog"
                  className="w-full border p-2 rounded-md h-24 resize-none"
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleAddPost}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full shadow-md hover:scale-105 transition"
          >
            <PlusCircle size={20} />
            Thêm bài viết
          </button>
        </div>
      </div>
    </section>
  );
}
