import styles from "./Home.module.css";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import HeroBanner from "@/components/HeroBanner";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3001/products", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <HeroBanner />
      <section className="px-4 py-8">
        <div className="text-2xl font-bold mb-6">Explore our latest drops</div>
        {products.length === 0 ? (
          <div className="text-red-500">No products available</div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
