"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface CategoryItem {
  name: string;
  slug: string;
}

interface CategoryGroup {
  group: string;
  image?: string;
  items: CategoryItem[];
}

export default function Header() {
  const [activeGroupDesktop, setActiveGroupDesktop] = useState<number | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [openGroupIdx, setOpenGroupIdx] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi tải danh mục:", err));
  }, []);

  const toggleGroup = (idx: number) => {
    setOpenGroupIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0f0f0f]/90 text-[#3e2c1c] dark:text-white backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/image/logo/logo UNID.png"
            alt="UNID"
            width={120}
            height={40}
            priority
            className="dark:bg-white/10 rounded-lg px-2 py-1"
          />
        </Link>
        <nav className="hidden md:flex space-x-10 text-[15px] font-medium">
          <Link href="/" className="hover:text-[#c7a17a] transition">
            Trang chủ
          </Link>

          <Link href="/gioi-thieu" className="hover:text-[#c7a17a] transition">
            Giới thiệu
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-[#c7a17a] transition">
              <span>Cửa hàng</span>
              <ChevronDown size={16} />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-3 transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700">
              <div className="relative flex">
                <div className="bg-[#faf8f6] dark:bg-[#1e1e1e] py-8 px-6 w-[280px] border-r border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-5 text-lg border-l-4 border-[#c7a17a] pl-3">
                    Danh mục
                  </h4>

                  {categories.map((group, i) => (
                    <div
                      key={i}
                      className="relative"
                      onMouseEnter={() => setActiveGroupDesktop(i)}
                      onMouseLeave={() => setActiveGroupDesktop(null)}
                    >
                      <div
                        className={`flex items-center justify-between text-[15px] cursor-pointer px-3 py-2 rounded-lg transition-all ${
                          activeGroupDesktop === i
                            ? "bg-[#f3ebe3] dark:bg-[#2a2a2a] text-[#c7a17a]"
                            : "hover:bg-[#f9f6f4] dark:hover:bg-[#252525]"
                        }`}
                      >
                        <span>{group.group}</span>
                        <ChevronRight size={14} />
                      </div>

                      {activeGroupDesktop === i && (
                        <div
                          className="absolute left-full top-0 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl w-[600px] py-8 px-8 transition-all duration-300"
                          onMouseEnter={() => setActiveGroupDesktop(i)}
                          onMouseLeave={() => setActiveGroupDesktop(null)}
                        >
                          <div className="flex gap-8">
                            <div className="flex-1">
                              <h5 className="font-semibold mb-4 uppercase border-b border-gray-200 dark:border-gray-700 pb-2">
                                {group.group}
                              </h5>

                              <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
                                {group.items.map((item, j) => (
                                  <li
                                    key={j}
                                    className="group/item flex items-center hover:text-[#c7a17a] text-[15px] transition-all"
                                  >
                                    <span className="text-[#c7a17a] mr-2 group-hover/item:translate-x-1 transition-transform duration-300">
                                      ›
                                    </span>

                                    <Link
                                      href={`/cua-hang/${item.slug}`}
                                      className="group-hover/item:underline underline-offset-4"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {group.image && (
                              <div className="w-[200px] h-[260px] relative rounded-xl overflow-hidden shadow-md">
                                <Image
                                  src={group.image}
                                  alt={group.group}
                                  fill
                                  className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/lien-he" className="hover:text-[#c7a17a] transition">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-5 text-[#3e2c1c] dark:text-white">
          <button className="cursor-pointer hover:text-[#c7a17a] transition">
            <Search size={22} />
          </button>

          <button className="cursor-pointer hover:text-[#c7a17a] transition">
            <User size={22} />
          </button>

          <button className="relative cursor-pointer hover:text-[#c7a17a] transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-[#c7a17a] text-white text-xs rounded-full px-1">
              0
            </span>
          </button>

          <button
            className="md:hidden cursor-pointer hover:text-[#c7a17a] transition"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setShowShop(false);
              setOpenGroupIdx(null);
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-700 shadow-lg px-6 py-4 animate-slideDown">
          <ul className="space-y-4 font-medium">
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/gioi-thieu">Giới thiệu</Link>
            </li>
            <li>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => {
                  setShowShop((prev) => !prev);
                  if (!showShop) setOpenGroupIdx(null);
                }}
              >
                <span>Cửa hàng</span>
                <ChevronDown
                  className={`transform transition-transform duration-300 ${
                    showShop ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  showShop ? "max-h-[1000px] mt-2" : "max-h-0"
                }`}
              >
                <div className="pl-4 space-y-3">
                  {categories.map((group, i) => (
                    <div key={i}>
                      <button
                        className="flex items-center justify-between w-full text-sm"
                        onClick={() => toggleGroup(i)}
                      >
                        <span>{group.group}</span>
                        <ChevronRight
                          className={`transition-transform duration-300 ${
                            openGroupIdx === i ? "rotate-90 text-[#c7a17a]" : ""
                          }`}
                          size={16}
                        />
                      </button>

                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          openGroupIdx === i ? "max-h-[600px] mt-2" : "max-h-0"
                        }`}
                      >
                        <ul className="pl-4 space-y-2 text-sm">
                          {group.items.map((item, j) => (
                            <li key={j}>
                              <Link
                                href={`/cua-hang/${item.slug}`}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setShowShop(false);
                                  setOpenGroupIdx(null);
                                }}
                                className="block hover:text-[#c7a17a] transition"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link href="/lien-he">Liên hệ</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
