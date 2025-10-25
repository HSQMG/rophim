"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Lora } from "next/font/google";
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage?: string;
}

interface SubCategory {
  name: string;
  slug: string;
}

interface CategoryGroup {
  group: string;
  items: SubCategory[];
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCount, setShowCount] = useState(12);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const nameMap: Record<string, string> = {
    ao: "Áo",
    vay: "Váy",
    dam: "Đầm",
    "chan-vay": "Chân váy",
    quan: "Quần",
  };

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data: CategoryGroup[]) => setCategories(data))
      .catch((err) => console.error("Lỗi tải danh mục:", err));
  }, []);

  useEffect(() => {
    if (!slug || products.length === 0 || categories.length === 0) return;

    let filteredList: Product[] = [];

    const foundGroup = categories.find((g) =>
      g.items.some((item) => item.slug === slug)
    );
    const foundItem = foundGroup?.items.find((i) => i.slug === slug);

    const isGroupSlug = categories.some(
      (g) => g.group.toLowerCase().replace(/\s/g, "-") === slug
    );

    if (isGroupSlug) {
      const group = categories.find(
        (g) => g.group.toLowerCase().replace(/\s/g, "-") === slug
      );
      if (group) {
        const itemSlugs = group.items.map((i) => i.slug);
        filteredList = products.filter((p) =>
          itemSlugs.some((subSlug) => p.category.startsWith(subSlug))
        );
        setCategoryName(group.group);
      }
    } else if (foundItem) {
      filteredList = products.filter((p) => p.category === foundItem.slug);
      setCategoryName(foundItem.name);
    } else {
      filteredList = products.filter((p) =>
        p.category.includes(slug.toString())
      );
      setCategoryName(slug.toString());
    }

    setFiltered(filteredList);
  }, [slug, products, categories]);

  const displayName =
    nameMap[categoryName.toLowerCase()] || categoryName || "Đang tải...";

  return (
    <main className={`${lora.className} bg-white text-[#2b2b2b]`}>
      {/* --- Breadcrumb --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2 flex-wrap">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/cua-hang" className="hover:text-black">
            Cửa hàng
          </Link>
          <ChevronRight size={14} />
          <span className="capitalize">{displayName}</span>
        </div>
      </div>

      {/* --- Tiêu đề --- */}
      <section className="border-t border-gray-200 py-6 sm:py-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2b2b2b] uppercase tracking-wide">
          {displayName}
        </h1>
      </section>

      {/* --- Toolbar (Mobile + Desktop) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between text-sm text-gray-600 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(true)}
            className="lg:hidden flex items-center gap-1 text-[#3e2c1c] border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition"
          >
            <SlidersHorizontal size={16} />
            Bộ lọc
          </button>
          <span className="hidden sm:inline-block">
            Hiển thị {filtered.length} kết quả
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-gray-500">Hiển thị:</span>
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

          <div className="flex items-center space-x-2 sm:space-x-3 text-gray-500">
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

      {/* --- Nội dung chính --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Sidebar danh mục (ẩn trên mobile) */}
        <aside
          className={`fixed lg:static top-0 left-0 z-50 lg:z-auto w-3/4 sm:w-1/2 lg:w-auto h-full lg:h-auto bg-white border-r border-gray-200 shadow-lg lg:shadow-none p-5 lg:p-0 overflow-y-auto transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Header mobile */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h3 className="text-lg font-semibold">Bộ lọc sản phẩm</h3>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
          </div>

          {/* Danh mục */}
          <ul className="space-y-2 text-gray-700">
            {categories.map((group, i) => (
              <li key={i} className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => setActiveGroup(activeGroup === i ? null : i)}
                  className={`flex items-center justify-between w-full px-2 py-2 rounded-md cursor-pointer transition-all ${
                    activeGroup === i
                      ? "bg-[#f8f5f2] text-[#b5895b]"
                      : "hover:bg-[#f9f6f4] hover:text-[#b5895b]"
                  }`}
                >
                  <span className="text-[15px]">{group.group}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${
                      activeGroup === i
                        ? "rotate-90 text-[#b5895b]"
                        : "rotate-0"
                    }`}
                  />
                </button>
                <ul
                  className={`pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
                    activeGroup === i
                      ? "max-h-96 opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  }`}
                >
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/cua-hang/${item.slug}`}
                        onClick={() => setShowSidebar(false)}
                        className={`block py-1 pl-2 border-l border-[#d4b48a] text-[14px] transition-all cursor-pointer ${
                          slug === item.slug
                            ? "text-[#3e2c1c]"
                            : "text-gray-600 hover:text-[#b5895b]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        {/* Overlay mobile */}
        {showSidebar && (
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/30 lg:hidden z-40"
          />
        )}

        {/* Danh sách sản phẩm */}
        <section className="lg:col-span-3">
          {filtered.length === 0 ? (
            <p className="text-gray-500 italic text-center py-20">
              Không có sản phẩm trong danh mục này.
            </p>
          ) : (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8"
                  : "grid-cols-1 gap-4"
              }`}
            >
              {filtered.slice(0, showCount).map((item) => (
                <Link
                  key={item.id}
                  href={`/cua-hang/${slug}/${item.id}`}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition block"
                >
                  {/* Hình ảnh */}
                  <div
                    className={`relative ${
                      viewMode === "grid"
                        ? "h-[280px] sm:h-[340px]"
                        : "h-[200px]"
                    } w-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                    />
                    {item.hoverImage && (
                      <Image
                        src={item.hoverImage}
                        alt={item.name + " hover"}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-[#5a3d2b] text-white text-xs font-medium px-2 py-1 rounded-md">
                      NEW !
                    </div>
                  </div>

                  {/* Thông tin */}
                  <div
                    className={`p-3 sm:p-4 ${
                      viewMode === "list"
                        ? "flex items-center justify-between"
                        : "text-center"
                    }`}
                  >
                    <h3 className="font-medium text-sm sm:text-base text-[#2b2b2b] mb-1 group-hover:underline underline-offset-4 transition cursor-pointer">
                      {item.name}
                    </h3>
                    <p className="text-[#5a3d2b] font-semibold text-sm sm:text-base">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
