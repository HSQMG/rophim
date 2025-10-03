import ScrollReveal from "@/app/components/ScrollReveal";
import Introduce from "./components/Intro";
import CollectionSection from "./components/CollectionSection";
import RiseTogether from "./components/RiseTogether";
import CounterSection from "./components/CounterSection";
import BlogSection from "./components/BlogSection";
export default function Home() {
  return (
    <main>
      <ScrollReveal>
        <Introduce />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <CollectionSection />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <RiseTogether />
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <CounterSection />
      </ScrollReveal>
      <ScrollReveal delay={0.5}>
        <BlogSection />
      </ScrollReveal>
    </main>
  );
}
