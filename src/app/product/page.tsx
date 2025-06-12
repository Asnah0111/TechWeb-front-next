"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./ProductPage.module.css";

const product = {
  brand: "adidas",
  name: "DAILY 3.0 SHOES",
  price: 98.99,
  images: ["./img/Vans.png", "./img/converse.png", "./img/Puma.png"],
  otherImage: "./img/Vans.png",
  description: `Energize your look with a fresh take on heritage adidas style. The adidas Daily 3.0 Shoes cut a classic profile with a modern suede upper. Your walk across campus or commute across town has never looked or felt this good.`,
  features: [
    "Regular fit",
    "Lace closure",
    "Rubber outsole with vulcanized look",
    "Imported",
  ],
};

export default function ProductPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQtyChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
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
                src={product.images[currentImage]}
                alt={`${product.brand} ${product.name}`}
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
              {product.images.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${
                    i === currentImage ? styles.active : ""
                  }`}
                  onClick={() => setCurrentImage(i)}
                  tabIndex={0}
                  aria-label={`Go to image ${i + 1}`}
                  role="button"
                ></span>
              ))}
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
              <div className={styles.productName}>{product.name}</div>
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
            <button className={styles.addToCart} type="button">
              Add to Cart
            </button>
          </div>
        </section>
        <section className={styles.bottomSection}>
          <div className={styles.descCard}>
            <div className={styles.descTitle}>Description</div>
            <hr className={styles.divider} />
            <div className={styles.descText}>
              {product.description}
              <ul>
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.otherImageCard}>
            <img
              src={product.otherImage}
              alt={`${product.brand} other`}
              className={styles.otherProductImage}
              draggable={false}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
