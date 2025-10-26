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
  image: string;
  items: CategoryItem[];
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi tải danh mục:", err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/image/logo/logo UNID.png"
            alt="UNID"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* -------- NAV DESKTOP -------- */}
        <nav className="hidden md:flex space-x-10 text-[15px] font-medium text-[#3e2c1c]">
          <Link href="/" className="hover:text-[#c7a17a] transition">
            Trang chủ
          </Link>
          <Link href="/gioi-thieu" className="hover:text-[#c7a17a] transition">
            Giới thiệu
          </Link>

          {/* Dropdown desktop */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-[#c7a17a] transition">
              <span>Cửa hàng</span>
              <ChevronDown size={16} />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white rounded-2xl shadow-2xl mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-3 transition-all duration-300 ease-out border border-gray-100">
              <div className="relative flex">
                <div className="bg-[#faf8f6] py-8 px-6 w-[280px] border-r border-gray-200">
                  <h4 className="font-semibold text-[#3e2c1c] mb-5 text-lg border-l-4 border-[#c7a17a] pl-3">
                    Danh mục
                  </h4>

                  {categories.map((group, i) => (
                    <div
                      key={i}
                      className="relative"
                      onMouseEnter={() => setActiveGroup(i)}
                      onMouseLeave={() => setActiveGroup(null)}
                    >
                      <div
                        className={`flex items-center justify-between text-[15px] cursor-pointer px-3 py-2 rounded-lg transition-all ${
                          activeGroup === i
                            ? "bg-[#f3ebe3] text-[#c7a17a]"
                            : "hover:bg-[#f9f6f4]"
                        }`}
                      >
                        <span>{group.group}</span>
                        <ChevronRight size={14} />
                      </div>
                      {activeGroup === i && (
                        <div
                          className="absolute left-full top-0 bg-white border border-gray-100 shadow-xl rounded-xl w-[600px] py-8 px-8 transition-all duration-300"
                          onMouseEnter={() => setActiveGroup(i)}
                          onMouseLeave={() => setActiveGroup(null)}
                        >
                          <div className="flex gap-8">
                            <div className="flex-1">
                              <h5 className="font-semibold text-[#3e2c1c] mb-4 uppercase border-b border-gray-200 pb-2">
                                {group.group}
                              </h5>
                              <ul className="grid grid-cols-2 gap-y-3 gap-x-8 text-gray-700">
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
                            <div className="w-[200px] h-[260px] relative rounded-xl overflow-hidden shadow-md">
                              <Image
                                src={group.image}
                                alt={group.group}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                              />
                            </div>
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

        {/* -------- ICONS -------- */}
        <div className="flex items-center space-x-5">
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

          {/* Nút mở menu mobile */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* -------- MENU MOBILE -------- */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 animate-slideDown">
          <ul className="space-y-4 text-[#3e2c1c] font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" onClick={() => setMenuOpen(false)}>
                Giới thiệu
              </Link>
            </li>

            {/* Accordion cho danh mục */}
            <li>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => setActiveGroup(activeGroup === -1 ? null : -1)}
              >
                <span>Cửa hàng</span>
                <ChevronDown
                  className={`transform transition-transform ${
                    activeGroup === -1 ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeGroup === -1 && (
                <div className="mt-2 pl-4 space-y-3">
                  {categories.map((group, i) => (
                    <div key={i}>
                      <button
                        className="flex items-center justify-between w-full text-sm"
                        onClick={() =>
                          setActiveGroup(activeGroup === i ? -1 : i)
                        }
                      >
                        <span>{group.group}</span>
                        <ChevronRight
                          className={`transition-transform ${
                            activeGroup === i ? "rotate-90 text-[#c7a17a]" : ""
                          }`}
                          size={16}
                        />
                      </button>
                      {activeGroup === i && (
                        <ul className="pl-4 mt-2 space-y-2 text-gray-600 text-sm">
                          {group.items.map((item, j) => (
                            <li key={j}>
                              <Link
                                href={`/cua-hang/${item.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="block hover:text-[#c7a17a] transition"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/lien-he" onClick={() => setMenuOpen(false)}>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
