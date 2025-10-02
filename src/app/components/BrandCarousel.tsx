// components/BrandsSection.tsx
export default function BrandsSection() {
  const brands = [
    "https://static.vecteezy.com/system/resources/previews/023/870/369/non_2x/levis-logo-brand-symbol-black-design-clothes-fashion-illustration-free-vector.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/L%27Oreal_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/23/Casio_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Etisalat_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0d/Sony_VAIO_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Cisco_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Gillette_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/54/Sprint_Nextel_logo.svg",
  ];

  return (
    <section className="w-full bg-[#1c1917] py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Tiêu đề */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
          THƯƠNG HIỆU
        </h2>
        <div className="w-20 h-[2px] bg-gray-500 mx-auto my-4"></div>
        <p className="text-gray-400 italic text-sm md:text-base">
          Dưới đây là một số thương hiệu chúng tôi đã có cơ hội đồng hành
        </p>

        {/* Logo */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-10">
          {brands.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Brand ${idx}`}
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
