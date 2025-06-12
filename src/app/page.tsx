/*"use client";
import styles from "./Home.module.css";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import HeroBanner from "@/components/HeroBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3001/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const visibleProducts = isMobile
    ? [products[currentIndex]]
    : products.slice(0, 4);
  /* const visibleProducts = products;

  const handlePrev = () => setCurrentIndex((idx) => Math.max(idx - 1, 0));
  const handleNext = () =>
    setCurrentIndex((idx) => Math.min(idx + 1, products.length - 1));
  return (
    <main>
      <Header />
      <HeroBanner />

      <section className="px-4 py-8">
        <div className={styles.exploreTitle}>Explore our latest drops</div>
        {products.length === 0 ? (
          <div className="text-red-500">No products available</div>
        ) : (
          <div className={styles.explorer}>
            <div
              className={isMobile ? styles.carouselMobile : styles.productGrid}
            >
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {isMobile && (
              <div className={styles.carouselNav}>
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === products.length - 1}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}*/

"use client";
import styles from "./Home.module.css";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import HeroBanner from "@/components/HeroBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3001/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  // Ne montre que 4 produits à la fois
  const visibleProducts = products.slice(startIndex, startIndex + 4);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, products.length - 4));
  };

  return (
    <main>
      <Header />
      <HeroBanner />

      <section className="px-4 py-8">
        <div className={styles.exploreTitle}>Explore our latest drops</div>
        {products.length === 0 ? (
          <div className="text-red-500">No products available</div>
        ) : (
          <div className={styles.explorer}>
            <button
              className={styles.arrow}
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              &#60;
            </button>
            <div className={styles.galleryRow}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <button
              className={styles.arrow}
              onClick={handleNext}
              disabled={startIndex >= products.length - 4}
            >
              &#62;
            </button>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
