import ProductEditor from "../components/ProductEditor";
import HeroEditor from "../components/HeroEditor";
import FeaturedCategoriesEditor from "../components/FeaturedCategoriesEditor";
export default function EditProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <HeroEditor />
      <FeaturedCategoriesEditor />
      <ProductEditor />
    </main>
  );
}
