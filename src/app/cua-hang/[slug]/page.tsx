"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
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
  /** Load sản phẩm */
  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  /** Load danh mục từ product.json */
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data: CategoryGroup[]) => setCategories(data))
      .catch((err) => console.error("Lỗi tải danh mục:", err));
  }, []);

  /** Lọc sản phẩm theo slug */
  useEffect(() => {
    if (!slug || products.length === 0 || categories.length === 0) return;

    let filteredList: Product[] = [];

    // Tìm xem slug này thuộc nhóm nào hoặc là item con
    const foundGroup = categories.find((g) =>
      g.items.some((item) => item.slug === slug)
    );
    const foundItem = foundGroup?.items.find((i) => i.slug === slug);

    // Nếu slug trùng group (vd: "ao", "quan", ...)
    const isGroupSlug = categories.some(
      (g) => g.group.toLowerCase().replace(/\s/g, "-") === slug
    );

    if (isGroupSlug) {
      // Lấy toàn bộ sản phẩm có prefix theo các items con
      const group = categories.find(
        (g) => g.group.toLowerCase().replace(/\s/g, "-") === slug
      );
      if (group) {
        const itemSlugs = group.items.map((i) => i.slug);
        filteredList = products.filter((p) =>
          itemSlugs.some((slug) => p.category.startsWith(slug))
        );
        setCategoryName(group.group);
      }
    } else if (foundItem) {
      // Nếu là item con cụ thể
      filteredList = products.filter((p) => p.category === foundItem.slug);
      setCategoryName(foundItem.name);
    } else {
      // fallback
      filteredList = products.filter((p) =>
        p.category.includes(slug.toString())
      );
      setCategoryName(slug.toString());
    }

    setFiltered(filteredList);
  }, [slug, products, categories]);

  /** UI hiển thị */
  return (
    <main className="bg-white text-[#2b2b2b]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2 flex-wrap">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/cua-hang" className="hover:text-black">
            Cửa hàng
          </Link>
          <ChevronRight size={14} />
          <span className="capitalize">{categoryName || "..."}</span>
        </div>
      </div>

      {/* Tiêu đề */}
      <section className="border-t border-gray-200 py-8 text-center">
        <h1
          className={`${playfair.className} text-4xl font-bold text-[#2b2b2b] uppercase tracking-wide`}
        >
          {categoryName || "Đang tải..."}
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Bộ lọc + chế độ xem */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 border-b border-gray-200 pb-4 mb-10">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-[#2b2b2b]">
              DANH MỤC SẢN PHẨM
            </h3>
          </div>
          <div className="lg:col-span-3 flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="text-gray-600 mb-4 lg:mb-0">
              Hiển thị {filtered.length} kết quả
            </div>
            <div className="flex flex-wrap items-center space-x-4 lg:space-x-6 text-gray-700">
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
              <span className="hidden lg:inline-block border-l h-4 border-gray-300" />
              <button className="text-gray-700 hover:text-black">
                Mới nhất
              </button>
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
        </div>

        {/* Nội dung */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="space-y-10 lg:col-span-1">
            <div>
              <ul className="space-y-2 text-gray-700">
                {categories.map((group, i) => (
                  <li key={i} className="border-b border-gray-200 pb-2">
                    <button
                      onClick={() =>
                        setActiveGroup(activeGroup === i ? null : i)
                      }
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
            </div>

            {/* Bộ lọc giá */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4 tracking-wide text-[#2b2b2b]">
                GIÁ
              </h4>
              <div className="text-sm text-gray-600 italic">
                (Bộ lọc giá sẽ đặt ở đây)
              </div>
            </div>
          </aside>

          {/* DANH SÁCH SẢN PHẨM */}
          <section className="lg:col-span-3">
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
                  <Link
                    key={item.id}
                    href={`/cua-hang/${slug}/${item.id}`}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition block"
                  >
                    {/* Hình ảnh */}
                    <div
                      className={`relative ${
                        viewMode === "grid" ? "h-[360px]" : "h-[200px]"
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
                      <div className="absolute top-3 left-3 bg-[#5a3d2b] text-white text-xs font-medium px-3 py-1 rounded-md">
                        NEW !
                      </div>
                    </div>

                    {/* Thông tin */}
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
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
