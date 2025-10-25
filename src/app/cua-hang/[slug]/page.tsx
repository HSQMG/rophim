"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid, List } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage?: string;
}
interface Category {
  slug: string;
  name: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCount, setShowCount] = useState(12);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((err) => console.error("Lỗi tải categories:", err));
  }, []);

  useEffect(() => {
    if (slug && products.length > 0) {
      const result = products.filter((p) => p.category === slug);
      setFiltered(result);
    }
    if (categories.length > 0 && slug) {
      const cat = categories.find((c) => c.slug === slug);
      setCategoryName(cat ? cat.name : slug.toString());
    }
  }, [slug, products]);

  return (
    <main className="bg-white text-[#2b2b2b]">
      {/* 🔹 Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/cua-hang" className="hover:text-black">
            Cửa hàng
          </Link>
          <ChevronRight size={14} />
          <span className="capitalize">{categoryName}</span>
        </div>
      </div>

      <section className="border-t border-gray-200 py-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#2b2b2b] uppercase tracking-wide">
          {categoryName}
        </h1>
      </section>
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="space-y-10">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 tracking-wide">
              DANH MỤC SẢN PHẨM
            </h3>
            <ul className="space-y-3 text-gray-700">
              {categories.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-center text-[15px] hover:text-[#6d4c2f] transition-all duration-200 cursor-pointer"
                >
                  <span className="text-[#c7a17a] mr-2 group-hover:translate-x-1 transition-transform duration-300">
                    ›
                  </span>
                  <Link
                    href={`/cua-hang/${item.slug}`}
                    className="group-hover:underline underline-offset-4"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-8 border-b pb-3">
            <span>Hiển thị kết quả duy nhất</span>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Show</span>
                {[12, 15, 30].map((n) => (
                  <button
                    key={n}
                    onClick={() => setShowCount(n)}
                    className={`pb-[2px] ${
                      showCount === n
                        ? "border-b border-black text-black font-medium"
                        : "hover:border-b hover:border-gray-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <span className="border-l h-4 border-gray-300"></span>
              <div className="text-gray-700 cursor-pointer hover:text-black">
                Mới nhất
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`${
                    viewMode === "grid" ? "text-black" : "hover:text-black"
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`${
                    viewMode === "list" ? "text-black" : "hover:text-black"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="text-gray-500 italic text-center py-20">
              Không có sản phẩm trong danh mục này.
            </p>
          ) : (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  : "grid-cols-1 gap-4"
              }`}
            >
              {filtered.slice(0, showCount).map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div
                    className={`relative ${
                      viewMode === "grid" ? "h-[360px]" : "h-[200px]"
                    } w-full overflow-hidden cursor-pointer`}
                  >
                    {/* Ảnh chính */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                    />

                    {/* Ảnh hover */}
                    {item.hoverImage && (
                      <Image
                        src={item.hoverImage}
                        alt={item.name + " hover"}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    )}

                    {/* Tag NEW */}
                    <div className="absolute top-3 left-3 bg-[#5a3d2b] text-white text-xs font-medium px-3 py-1 rounded-md">
                      NEW!
                    </div>
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div
                    className={`p-4 ${
                      viewMode === "list"
                        ? "flex items-center justify-between"
                        : "text-center"
                    }`}
                  >
                    <h3 className="font-medium text-[#2b2b2b] mb-1 group-hover:underline underline-offset-4 transition cursor-pointer">
                      {item.name}
                    </h3>
                    <p className="text-[#5a3d2b] font-semibold">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
