import HeroSection from "@/app/components/HeroSection";
import FeaturedCategories from "@/app/components/FeaturedCategories";
import ProductCarousel from "@/app/components/ProductCarousel";
import BrandCarousel from "./components/BrandCarousel";
import FashionSection from "./components/FashionSection";
import BlogSection from "./components/BlogSection";
import ProductHighlight from "./components/ProductHighlight";
import ScrollReveal from "./components/ScrollReveal";

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

      <ScrollReveal delay={0.4}>
        <BrandCarousel />
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
        <FashionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.6}>
        <BlogSection />
      </ScrollReveal>

      <ScrollReveal delay={0.7}>
        <ProductHighlight />
      </ScrollReveal>
    </main>
  );
}
