import React from "react";
import styles from "../app/Home.module.css";
import Link from "next/link";
export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroDiscount}>25% OFF</div>
        <div className={styles.heroTitle}>Summer Sale</div>
        <p>Discover our summer styles with discount!</p>
        <button className={styles.shopBtn}>Shop Now</button>
      </div>
      <img
        src="/img/greenSho.png"
        alt="Summer Shoe"
        className={styles.heroImage}
      />
    </section>
  );
}
