"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  hoverImg: string;
  isNew: boolean;
}

export default function FashionSection() {
  const [products, setProducts] = useState<Product[]>([]);

  // 🔹 Load dữ liệu thật từ file JSON qua API
  useEffect(() => {
    fetch("/api/fashion")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch(() => setProducts([]));
  }, []);

  if (!products.length) {
    return (
      <p className="text-center py-20 text-gray-500 italic">
        Đang tải sản phẩm thời trang...
      </p>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          THỜI TRANG
        </h2>
        <div className="w-20 h-[2px] bg-gray-400 mx-auto my-4"></div>
        <p className="text-gray-500 italic">
          Sản phẩm của chúng tôi được lựa chọn tỉ mỉ bởi những nhà thiết kế nổi
          tiếng.
        </p>

        {/* Product grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 cursor-pointer">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group border border-gray-200 pb-4 rounded-md overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* NEW label */}
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-[#5a3a28] text-white text-xs font-semibold px-2 py-1 z-20 rounded">
                  NEW!
                </span>
              )}

              {/* Plus button */}
              <button className="absolute top-3 right-3 bg-white rounded-full shadow p-1 w-7 h-7 flex items-center justify-center text-gray-700 font-bold z-20">
                +
              </button>

              {/* Product images */}
              <div className="relative w-full h-[380px] overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={product.hoverImg}
                  alt={`${product.name} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Hover buttons */}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex">
                    <button className="w-1/2 flex items-center justify-center gap-2 py-3 text-xs font-medium bg-white border-t border-r border-gray-200 hover:bg-gray-100">
                      <ShoppingBag className="w-4 h-4" />
                      LỰA CHỌN CÁC TÙY CHỌN
                    </button>
                    <button className="w-1/2 flex items-center justify-center gap-2 py-3 text-xs font-medium bg-white border-t border-gray-200 hover:bg-gray-100">
                      <Heart className="w-4 h-4" />
                      THÊM VÀO YÊU THÍCH
                    </button>
                  </div>
                </div>
              </div>

              {/* Product name + price */}
              <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-gray-900 uppercase px-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
