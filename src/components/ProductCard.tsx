/*import React from "react";
import styles from "../app/Home.module.css";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img
          src={"/img/" + product.brand + ".png"}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productBrand}>{product.brand}</p>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
}*/

import Link from "next/link";
import styles from "../app/Home.module.css";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={{
        pathname: `/product/${product.id}`,
      }}
      className={styles.productCard}
    >
      <div className={styles.productImageContainer}>
        <img
          src={"/img/" + product.brand + ".png"}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productBrand}>{product.brand}</p>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </Link>
  );
}
