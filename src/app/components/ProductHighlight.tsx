"use client";

import { useEffect, useState } from "react";

interface HighlightItem {
  id: number;
  category: string;
  date: string;
  month: string;
  title: string;
  img: string;
}

export default function ProductHighlight() {
  const [items, setItems] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/highlight")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Đang tải dữ liệu...
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Chưa có sản phẩm nổi bật nào.
      </p>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-serif text-gray-900 mb-10">#Millamona</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category */}
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
                {/* Date */}
                <div className="absolute bottom-4 left-4 bg-[#5c4029] text-white rounded-full w-14 h-14 flex flex-col justify-center items-center text-sm font-bold">
                  <span>{item.date}</span>
                  <span className="text-[10px] font-normal">{item.month}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-800">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
