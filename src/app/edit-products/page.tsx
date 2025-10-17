import ProductEditor from "../components/ProductEditor";
import HeroEditor from "../components/HeroEditor";
import FeaturedCategoriesEditor from "../components/FeaturedCategoriesEditor";
import BlogSectionEditor from "../components/BlogSectionEditor";
export default function EditProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <HeroEditor />
      <FeaturedCategoriesEditor />
      <ProductEditor />
      <BlogSectionEditor />
    </main>
  );
}
