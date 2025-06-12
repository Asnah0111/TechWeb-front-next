"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../ProductPage.module.css";
import { addToCart } from "@/app/utils/cart"; // ← AJOUT
import Toast from "@/components/Toast";

type Product = {
  id: number;
  brand: string;
  nom: string;
  price: number;
  images: string[];
  otherImage: string;
  description: string;
  features: string[];
};

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotif, setShowNotif] = useState(false);

  const id = params.id as string;

  async function getInfoprod(id: string) {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) {
      throw new Error("Produit non trouvé");
    }
    return await res.json();
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getInfoprod(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handlePrev = () =>
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  const handleNext = () =>
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  const handleQtyChange = (delta: number) =>
    setQuantity((q) => Math.max(1, q + delta));

  // ← AJOUT : fonction d'ajout au panier
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      brand: product.brand,
      nom: product.nom,
      price: product.price,
      image: `/img/${product.brand}.png`,
      quantity,
    });
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2200);
  };

  return (
    <div className={styles.pageBg}>
      <Header />
      <main className={styles.main}>
        <section className={styles.topSection}>
          {/* Carousel Card */}
          <div className={styles.carouselCard}>
            <div className={styles.carouselImageBox}>
              <img
                src={".././img/" + product.brand + ".png"}
                alt={`${product.brand} ${product.nom}`}
                className={styles.mainProductImage}
                draggable={false}
              />
            </div>
            <div className={styles.carouselDotsRow}>
              <button
                className={styles.carouselBtn}
                aria-label="Previous"
                onClick={handlePrev}
                tabIndex={0}
              >
                &#60;
              </button>

              <button
                className={styles.carouselBtn}
                aria-label="Next"
                onClick={handleNext}
                tabIndex={0}
              >
                &#62;
              </button>
            </div>
          </div>
          {/* Info Card */}
          <div className={styles.infoCard}>
            <div>
              <div className={styles.productBrand}>{product.brand}</div>
              <div className={styles.productName}>{product.nom}</div>
              <div className={styles.productPrice}>
                ${product.price.toFixed(2)}
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.quantitySection}>
              <label className={styles.qtyLabel} htmlFor="qty-number">
                Quantity
              </label>
              <div className={styles.qtyControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleQtyChange(-1)}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  type="button"
                >
                  −
                </button>
                <span
                  id="qty-number"
                  className={styles.qtyNumber}
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleQtyChange(1)}
                  aria-label="Increase quantity"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={styles.addToCart}
              type="button"
              onClick={handleAddToCart} // ← AJOUT
            >
              Add to Cart
            </button>
          </div>
        </section>
        <section className={styles.bottomSection}>
          <div className={styles.descCard}>
            <div className={styles.descTitle}>Description</div>
            <hr className={styles.divider} />
            <div className={styles.descText}>{product.description}</div>
          </div>
          <div
            className={styles.otherImageCard}
            style={{ position: "relative" }}
          >
            <img
              src={".././img/" + product.brand + ".png"}
              alt={`${product.brand} other`}
              className={styles.otherProductImage}
              draggable={false}
            />
            {showNotif && (
              <div className={styles.toastRight}>
                <Toast
                  message="Article ajouté au panier !"
                  onClose={() => setShowNotif(false)}
                  duration={2200}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
