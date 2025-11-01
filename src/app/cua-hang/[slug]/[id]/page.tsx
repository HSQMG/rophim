"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, Ruler, ShieldCheck, Repeat } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, ArrowLeft } from "lucide-react";
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
  images?: string[];
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
  const [showCommitment, setShowCommitment] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
      <main className="max-w-5xl mx-auto py-20 text-center text-gray-500 dark:text-gray-400 italic">
        Đang tải sản phẩm...
      </main>
    );

  const allImages =
    product.images && product.images.length > 0
      ? [product.image, ...product.images]
      : [product.image];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-[#2b2b2b] dark:text-gray-100 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row gap-10 sm:gap-12">
        <div className="w-full lg:w-1/2">
          <div
            className="
              grid grid-cols-2 gap-4
              rounded-xl bg-gray-50 dark:bg-[#1a1a1a] shadow-sm p-3
              overflow-hidden
              max-h-[640px]
            "
          >
            {allImages.map((img, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center rounded-lg overflow-hidden 
             bg-white dark:bg-[#111] transition-all cursor-pointer"
                style={{ height: "300px" }}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-300"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1
              className={`${playfair.className} text-2xl sm:text-3xl font-serif font-bold mb-3 uppercase tracking-wide text-[#2b2b2b] dark:text-white`}
            >
              {product.name}
            </h1>
            <p className="text-[#6d4c2f] dark:text-[#d9a97c] text-xl sm:text-2xl font-semibold">
              {product.price.toLocaleString("vi-VN")}₫
            </p>
          </div>
          {product.description && (
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-base font-semibold text-[#2b2b2b] dark:text-white mb-3 uppercase tracking-wide">
                Mô tả sản phẩm
              </h2>

              <div className="relative text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">
                <div
                  className={`transition-all duration-500 ${
                    showMore ? "max-h-full" : "max-h-32 overflow-hidden"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
                {!showMore && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0f0f0f] to-transparent pointer-events-none" />
                )}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 text-sm font-medium text-[#6d4c2f] dark:text-[#d9a97c] hover:underline cursor-pointer"
                >
                  {showMore ? "Thu gọn ▲" : "Xem thêm ▼"}
                </button>
              </div>
            </div>
          )}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
            <GuideItem
              icon={<Ruler size={18} />}
              label="Hướng dẫn chọn kích thước"
              onClick={() => setShowSizeGuide(true)}
            />
            <GuideItem
              icon={<Truck size={18} />}
              label="Hướng dẫn bảo quản và giặt"
              onClick={() => setShowCareGuide(true)}
            />
            <GuideItem
              icon={<ShieldCheck size={18} />}
              label="Cam kết từ thương hiệu"
              onClick={() => setShowCommitment(true)}
            />
            <GuideItem
              icon={<Repeat size={18} />}
              label="Chính sách đổi trả"
              onClick={() => setShowReturnPolicy(true)}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 pt-4">
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">
                Chất liệu:
              </span>{" "}
              {product.material || "Đang cập nhật"}
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">
                Màu sắc:
              </span>{" "}
              {product.color || "Đang cập nhật"}
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">
                Kích cỡ:
              </span>{" "}
              {product.size ? product.size.join(", ") : "Đang cập nhật"}
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
            <span className="font-semibold text-gray-700 dark:text-white">
              Danh mục:
            </span>{" "}
            <Link
              href={`/cua-hang/${slug}`}
              className="hover:text-[#6d4c2f] dark:hover:text-[#d9a97c] underline-offset-2"
            >
              {product.category}
            </Link>
          </div>
        </div>
      </div>
      {showSizeGuide && (
        <Popup onClose={() => setShowSizeGuide(false)}>
          {product.imgsize ? (
            <Image
              src={product.imgsize}
              alt={`Bảng size cho ${product.name}`}
              width={600}
              height={600}
              className="mx-auto rounded-md"
            />
          ) : (
            <p className="text-sm italic text-gray-500 dark:text-gray-300 text-center py-8">
              Đang cập nhật hướng dẫn kích thước...
            </p>
          )}
        </Popup>
      )}

      {showCareGuide && (
        <Popup onClose={() => setShowCareGuide(false)}>
          <Image
            src="/image/size/bao-quan.jpg"
            alt="Hướng dẫn bảo quản và giặt"
            width={600}
            height={600}
            className="mx-auto rounded-md"
          />
        </Popup>
      )}

      {showCommitment && (
        <Popup onClose={() => setShowCommitment(false)}>
          <Image
            src="/image/size/cam-ket.jpg"
            alt="Cam kết từ thương hiệu"
            width={600}
            height={600}
            className="mx-auto rounded-md"
          />
        </Popup>
      )}

      {showReturnPolicy && (
        <Popup onClose={() => setShowReturnPolicy(false)}>
          <Image
            src="/image/size/doi-tra.jpg"
            alt="Chính sách đổi trả"
            width={600}
            height={600}
            className="mx-auto rounded-md"
          />
        </Popup>
      )}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)} // click ra ngoài là đóng
        >
          <div
            className="relative max-w-5xl w-[90%] h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // tránh đóng khi click vào ảnh
          >
            <Image
              src={allImages[selectedIndex]}
              alt={`Ảnh ${selectedIndex + 1}`}
              fill
              className="object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-pointer"
            />
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 
                     p-2 sm:p-3 rounded-full bg-white/70 dark:bg-[#222]/70
                     text-[#2b2b2b] dark:text-gray-100
                     hover:bg-white hover:scale-110 transition-all duration-200
                     cursor-pointer backdrop-blur-md"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {selectedIndex < allImages.length - 1 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 
                     p-2 sm:p-3 rounded-full bg-white/70 dark:bg-[#222]/70
                     text-[#2b2b2b] dark:text-gray-100
                     hover:bg-white hover:scale-110 transition-all duration-200
                     cursor-pointer backdrop-blur-md"
              >
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Popup({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 rounded-lg shadow-lg relative w-[90%] sm:max-w-[600px] max-h-[85%] overflow-auto transition-colors duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-lg font-bold cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function GuideItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between py-3 cursor-pointer hover:text-[#6d4c2f] dark:hover:text-[#d9a97c] transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">▼</span>
    </div>
  );
}
