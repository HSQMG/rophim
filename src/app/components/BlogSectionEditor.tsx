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
  const [counter, setCounter] = useState(1);

  // Load dữ liệu từ localStorage khi mount
  useEffect(() => {
    const saved = localStorage.getItem("blogPosts");
    if (saved) {
      const data: Post[] = JSON.parse(saved);
      setPosts(data);
      setCounter(data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1);
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi posts thay đổi
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    setPosts([
      ...posts,
      { id: counter, category: "", date: "", title: "", img: "", script: "" },
    ]);
    setCounter(counter + 1);
  };

  const handleRemovePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleChange = (id: number, field: keyof Post, value: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
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
          ✏️ Chỉnh sửa bài viết
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fdfbf9] rounded-xl shadow-md p-6 relative"
            >
              {/* Xóa bài viết */}
              <button
                onClick={() => handleRemovePost(post.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

              {/* Hình ảnh */}
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

              {/* Input */}
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
                  placeholder="Script / Nội dung HTML tuỳ ý..."
                  className="w-full border p-2 rounded-md h-24 resize-none"
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        {/* Thêm bài viết */}
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
