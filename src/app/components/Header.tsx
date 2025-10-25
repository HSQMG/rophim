"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, ChevronDown } from "lucide-react";

interface Category {
  name: string;
  slug: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // ✅ Fetch JSON danh mục trong public/product.json
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi tải danh mục:", err));
  }, []);

  // Xử lý hover menu
  const handleEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setShowShopMenu(true);
  };

  const handleLeave = () => {
    const timeout = setTimeout(() => setShowShopMenu(false), 150);
    setHoverTimeout(timeout);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 relative">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/image/logo/logo UNID.png"
            alt="UNID"
            className="h-10 w-auto"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex space-x-8 text-[15px] font-medium text-[#3e2c1c] relative">
          <Link href="/" className="hover:text-[#6d4c2f] transition-colors">
            Trang chủ
          </Link>
          <Link href="/gioi-thieu" className="hover:text-[#6d4c2f] transition">
            Giới thiệu
          </Link>

          {/* DROPDOWN CỬA HÀNG */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <button className="flex items-center space-x-1 hover:text-[#6d4c2f] transition">
              <span>Cửa hàng</span>
              <ChevronDown size={16} />
            </button>

            {showShopMenu && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[750px] bg-white rounded-2xl shadow-xl mt-3 border border-gray-100 animate-fadeIn">
                <div className="grid grid-cols-2 gap-8 p-10">
                  {/* DANH MỤC SẢN PHẨM */}
                  <div>
                    <h4 className="font-semibold text-[#3e2c1c] mb-5 text-lg border-l-4 border-[#c7a17a] pl-3">
                      Danh mục sản phẩm
                    </h4>

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

                  {/* ẢNH KHUYẾN MÃI */}
                  <div className="relative rounded-xl overflow-hidden group shadow-md">
                    <Image
                      src="https://millamona.monamedia.net/wp-content/uploads/2024/02/big-sale-discounts-products-e1706775560195.jpg"
                      alt="Khuyến mãi"
                      fill
                      priority
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-center py-3 text-lg font-medium tracking-wide">
                      Up to 70% Off
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-[#6d4c2f] transition">
            Xu hướng
          </Link>
          <Link href="/lien-he" className="hover:text-[#6d4c2f] transition">
            Liên hệ
          </Link>
        </nav>

        {/* ICONS */}
        <div className="flex items-center space-x-5">
          <button className="cursor-pointer hover:text-[#6d4c2f] transition">
            <Search size={22} />
          </button>
          <button className="cursor-pointer hover:text-[#6d4c2f] transition">
            <User size={22} />
          </button>
          <button className="relative cursor-pointer hover:text-[#6d4c2f] transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-[#6d4c2f] text-white text-xs rounded-full px-1">
              0
            </span>
          </button>

          {/* MENU MOBILE */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t animate-fadeIn">
          <nav className="flex flex-col space-y-2 p-4 text-[#3e2c1c] font-medium">
            <Link href="/">Trang chủ</Link>
            <Link href="/gioi-thieu">Giới thiệu</Link>
            <Link href="/cua-hang">Cửa hàng</Link>
            <Link href="/blog">Xu hướng</Link>
            <Link href="/lien-he">Liên hệ</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
