import HeroSection from "@/app/components/HeroSection";
import FeaturedCategories from "@/app/components/FeaturedCategories";
import ProductCarousel from "@/app/components/ProductCarousel";
import FashionSection from "./components/FashionSection";
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
      <ScrollReveal delay={0.5}>
        <FashionSection />
      </ScrollReveal>
    </main>
  );
}
