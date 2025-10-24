"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/image/logo/logo UNID.png"
            alt="Millamona"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex space-x-6 font-medium">
          <Link href="/">Trang chủ</Link>
          <Link href="/gioi-thieu">Giới thiệu</Link>
          <Link href="/cua-hang">Cửa hàng</Link>
          <Link href="/blog">Xu hướng</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="cursor-pointer">
            <Search size={22} />
          </button>
          <button className="cursor-pointer">
            <User size={22} />
          </button>
          <button className="relative cursor-pointer">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1">
              0
            </span>
          </button>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <nav className="flex flex-col space-y-2 p-4">
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
