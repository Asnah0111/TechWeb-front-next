import Link from "next/link";
import styles from "../app/Header.module.css";
import { useCartCount } from "@/app/utils/useCartCount";

export default function Header() {
  const cartCount = useCartCount();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.deco}>
        <div className={styles.left}>
          <img
            src="/img/Vector.svg"
            alt="Sun Co. logo"
            className={styles.logo}
          />

          <span className={styles.brand}>SUN CO.</span>
        </div>
      </Link>
      <Link href="/bag" className={styles.deco}>
        <button className={styles.cartBtn}>
          <img
            src="/img/cart.svg"
            alt="cart icon"
            className={styles.cartIcon}
          />
          View Cart
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </Link>
    </header>
  );
}
