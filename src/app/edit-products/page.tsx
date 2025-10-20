import ProductEditor from "../components/ProductEditor";
import HeroEditor from "../components/HeroEditor";
import FeaturedCategoriesEditor from "../components/FeaturedCategoriesEditor";
import BlogSectionEditor from "../components/BlogSectionEditor";
import FashionSectionEditor from "../components/FashionSectionEditor";
import ProductHighlightEditor from "../components/ProductHighlightEditor"
export default function EditProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <HeroEditor />
      <FeaturedCategoriesEditor />
      <ProductEditor />
      <FashionSectionEditor/>
      <BlogSectionEditor />
      <ProductHighlightEditor/>
    </main>
  );
}
