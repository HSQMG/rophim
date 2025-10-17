"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  category: string;
  date: string;
  title: string;
  img: string;
  script?: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("blogPosts");
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  if (!posts.length) {
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Chưa có bài viết nào.
      </p>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          THỜI TRANG & XU HƯỚNG
        </h2>
        <div className="w-20 h-[2px] bg-gray-400 mx-auto my-4"></div>
        <p className="text-gray-500 italic">
          Thông tin thời trang & xu hướng mới nhất, được cập nhật mỗi ngày
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post.id}
              className="text-center bg-[#fefbf9] rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="w-[280px] h-[280px] mx-auto overflow-hidden rounded-full">
                {post.img && (
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={280}
                    height={280}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <p className="text-xs uppercase text-gray-500 mt-4">
                <span className="font-semibold text-gray-700">
                  {post.category}
                </span>{" "}
                / {post.date}
              </p>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {post.title}
              </h3>

              {post.script && (
                <div
                  className="mt-4 text-left"
                  dangerouslySetInnerHTML={{ __html: post.script }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
