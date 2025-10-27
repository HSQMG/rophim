import ProductEditor from "../components/ProductEditor";
// import HeroEditor from "../components/HeroEditor";
import FeaturedCategoriesEditor from "../components/FeaturedCategoriesEditor";
import FashionSectionEditor from "../components/FashionSectionEditor";
import ProductHighlightEditor from "../components/ProductHighlightEditor";
export default function EditProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* <HeroEditor /> */}
      <FeaturedCategoriesEditor />
      <ProductEditor />
      <FashionSectionEditor />
      <ProductHighlightEditor />
    </main>
  );
}
