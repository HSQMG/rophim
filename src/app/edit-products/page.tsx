import ProductEditor from "../components/ProductEditor";
// import HeroEditor from "../components/HeroEditor";
import FeaturedCategoriesEditor from "../components/FeaturedCategoriesEditor";
import FashionSectionEditor from "../components/FashionSectionEditor";
export default function EditProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <FeaturedCategoriesEditor />
      <ProductEditor />
      <FashionSectionEditor />
    </main>
  );
}
