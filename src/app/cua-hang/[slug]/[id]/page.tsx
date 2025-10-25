"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, Ruler } from "lucide-react";
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
  material?: string;
  color?: string;
  size?: string[];
  description?: string;
  imgsize?: string;
}

export default function ProductDetailPage() {
  const { slug, id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCareGuide, setShowCareGuide] = useState(false);

  useEffect(() => {
    fetch("/productss.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id.toString() === id);
        setProduct(found || null);
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, [id]);

  if (!product)
    return (
      <main className="max-w-5xl mx-auto py-20 text-center text-gray-500 italic">
        Đang tải sản phẩm...
      </main>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-[#2b2b2b]">
      {/* --- Layout chia 2 cột --- */}
      <div className="flex flex-col lg:flex-row gap-10 sm:gap-12">
        {/* Ảnh sản phẩm */}
        <div className="relative w-full lg:w-1/2 h-[420px] sm:h-[520px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-50 shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 space-y-6">
          {/* Tên & giá */}
          <div>
            <h1
              className={`${playfair.className} text-2xl sm:text-3xl font-serif font-bold mb-3 uppercase tracking-wide`}
            >
              {product.name}
            </h1>
            <p className="text-[#6d4c2f] text-xl sm:text-2xl font-semibold">
              {product.price.toLocaleString("vi-VN")}₫
            </p>
          </div>

          {/* Mô tả sản phẩm */}
          {product.description && (
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-base font-semibold text-[#2b2b2b] mb-3 uppercase tracking-wide">
                Mô tả sản phẩm
              </h2>

              <div className="relative text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                <div
                  className={`transition-all duration-500 ${
                    showMore ? "max-h-full" : "max-h-32 overflow-hidden"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />

                {!showMore && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 text-sm font-medium text-[#6d4c2f] hover:underline cursor-pointer"
                >
                  {showMore ? "Thu gọn ▲" : "Xem thêm ▼"}
                </button>
              </div>
            </div>
          )}

          {/* Hướng dẫn */}
          <div className="divide-y divide-gray-200 border-t border-b">
            <div
              className="flex items-center justify-between py-3 cursor-pointer hover:text-[#6d4c2f]"
              onClick={() => setShowSizeGuide(true)}
            >
              <div className="flex items-center gap-2 text-sm">
                <Ruler size={18} />
                <span>Hướng dẫn chọn kích thước</span>
              </div>
              <span className="text-xs text-gray-500">▼</span>
            </div>

            <div
              className="flex items-center justify-between py-3 cursor-pointer hover:text-[#6d4c2f]"
              onClick={() => setShowCareGuide(true)}
            >
              <div className="flex items-center gap-2 text-sm">
                <Truck size={18} />
                <span>Hướng dẫn bảo quản và giặt</span>
              </div>
              <span className="text-xs text-gray-500">▼</span>
            </div>
          </div>

          {/* Thông tin thêm */}
          <div className="text-sm text-gray-600 space-y-2 pt-4">
            <p>
              <span className="font-semibold text-gray-800">Chất liệu:</span>{" "}
              {product.material || "Đang cập nhật"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Màu sắc:</span>{" "}
              {product.color || "Đang cập nhật"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Kích cỡ:</span>{" "}
              {product.size ? product.size.join(", ") : "Đang cập nhật"}
            </p>
          </div>

          {/* Danh mục */}
          <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
            <span className="font-semibold text-gray-700">Danh mục:</span>{" "}
            <Link
              href={`/cua-hang/${slug}`}
              className="hover:text-[#6d4c2f] underline-offset-2"
            >
              {product.category}
            </Link>
          </div>
        </div>
      </div>

      {/* --- Popup hướng dẫn size --- */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white p-3 sm:p-4 rounded-lg shadow-lg relative w-[90%] sm:max-w-[600px] max-h-[85%] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {product.imgsize ? (
              <Image
                src={product.imgsize}
                alt={`Bảng size cho ${product.name}`}
                width={600}
                height={600}
                className="mx-auto rounded-md"
              />
            ) : (
              <p className="text-sm italic text-gray-500 text-center py-8">
                Đang cập nhật hướng dẫn kích thước...
              </p>
            )}
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* --- Popup hướng dẫn bảo quản --- */}
      {showCareGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCareGuide(false)}
        >
          <div
            className="bg-white p-3 sm:p-4 rounded-lg shadow-lg relative w-[90%] sm:max-w-[600px] max-h-[85%] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/image/size/bao quan.jpg"
              alt="Hướng dẫn bảo quản và giặt"
              width={600}
              height={600}
              className="mx-auto rounded-md"
            />
            <button
              onClick={() => setShowCareGuide(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
