import HeroSection from "@/app/components/HeroSection";
import FeaturedCategories from "@/app/components/FeaturedCategories";

import FashionSection from "./components/FashionSection";
import ScrollReveal from "./components/ScrollReveal";
import dynamic from "next/dynamic";
const ProductCarousel = dynamic(
  () => import("@/app/components/ProductCarousel"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <main>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <FeaturedCategories />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <ProductCarousel />
      </ScrollReveal>
      <ScrollReveal delay={0.5}>
        <FashionSection />
      </ScrollReveal>
    </main>
  );
}
