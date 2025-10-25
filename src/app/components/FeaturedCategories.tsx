"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface Category {
  title: string;
  items: string;
  image: string;
  link: string;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  const rows: Category[][] = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <section className="py-20 bg-[#fdf9f6]">
      {/* --- Tiêu đề --- */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-[#3e2c1c] tracking-wide mb-3">
          DANH MỤC NỔI BẬT
        </h2>
        <div className="w-16 h-[2px] bg-[#c7a17a] mx-auto mb-4"></div>
        <p className="text-gray-500 italic text-sm md:text-base">
          Cập nhật những phong cách mới mỗi tuần
        </p>
      </div>

      {/* --- Danh mục --- */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          const justify =
            isLast && row.length < 3 ? "justify-center" : "justify-between";

          return (
            <div
              key={index}
              className={`flex flex-wrap ${justify} gap-10 transition-all`}
            >
              {row.map((cat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden w-full sm:w-[45%] lg:w-[30%]"
                >
                  {/* Ảnh */}
                  <Link
                    href={`/cua-hang/${slugify(cat.title)}`}
                    className="block relative h-[420px] overflow-hidden rounded-t-2xl"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient nhẹ be để ảnh không quá sáng */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f6]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  </Link>

                  {/* Nội dung chữ */}
                  <div className="p-6 text-center">
                    <h3
                      className={`${playfair.className} text-xl text-[#3e2c1c] mb-1 tracking-wide`}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-4">
                      {cat.items} items
                    </p>
                    <Link
                      href={`/cua-hang/${slugify(cat.title)}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#c7a17a] text-[#3e2c1c] hover:bg-[#6d4c2f] hover:text-white transition-all"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// function slugify(text: string): string {
//   return text
//     .toLowerCase()
//     .replace(/đ/g, "d")
//     .replace(/Đ/g, "d")
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9\s]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// }

// interface Category {
//   title: string;
//   items: string;
//   image: string;
// }

// export default function FeaturedCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data) =>
//         Array.isArray(data) ? setCategories(data) : setCategories([])
//       )
//       .catch(() => setCategories([]));
//   }, []);

//   if (categories.length === 0) return null;

//   return (
//     <section className="py-20 bg-[#fdf9f6]">
//       {/* --- Tiêu đề --- */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl md:text-5xl font-serif text-[#3e2c1c] tracking-wide mb-3">
//           DANH MỤC NỔI BẬT
//         </h2>
//         <div className="w-16 h-[2px] bg-[#c7a17a] mx-auto mb-4"></div>
//         <p className="text-gray-500 italic text-sm md:text-base">
//           Cập nhật những phong cách mới mỗi tuần
//         </p>
//       </div>

//       {/* --- Danh mục --- */}
//       <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-end gap-10">
//         {categories.map((cat, i) => (
//           <div
//             key={i}
//             className="group w-[240px] sm:w-[260px] lg:w-[280px] bg-[#fdf7f2] rounded-t-[140px] overflow-hidden flex flex-col items-center pt-10 pb-12 shadow-sm hover:shadow-md transition-all duration-500"
//           >
//             {/* Tiêu đề */}
//             <div className="text-center mb-5">
//               <h3 className="text-lg font-serif text-[#3e2c1c] uppercase tracking-wide mb-1">
//                 {cat.title}
//               </h3>
//               <p className="text-sm italic text-gray-500">{cat.items} items</p>
//             </div>

//             {/* Ảnh sản phẩm */}
//             <div className="relative w-40 h-56 sm:w-44 sm:h-64 mb-6">
//               <Image
//                 src={cat.image}
//                 alt={cat.title}
//                 fill
//                 className="object-contain transition-transform duration-700 group-hover:scale-105"
//               />
//             </div>

//             {/* Nút tròn */}
//             <Link
//               href={`/cua-hang/${slugify(cat.title)}`}
//               className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3e2c1c] shadow-md hover:bg-[#6d4c2f] hover:text-white transition-all duration-300"
//             >
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
