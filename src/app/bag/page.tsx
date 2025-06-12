"use client";
import { useEffect, useState, useRef } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  CartItem,
} from "@/app/utils/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./BagPage.module.css";

// POPUP COMPONENT (TypeScript-friendly)
interface CenterPopupProps {
  open: boolean;
  children: React.ReactNode;
}
function CenterPopup({ open, children }: CenterPopupProps) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "5%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(55, 178, 77, 0.93)",
        color: "#fff",
        padding: "28px 64px",
        borderRadius: "18px",
        fontWeight: 600,
        fontSize: "1.18rem",
        zIndex: 5000,
        boxShadow: "0 4px 28px rgba(0,0,0,0.15)",
        textAlign: "center",
        opacity: 0.98,
        animation: "popup-fadein 0.3s",
      }}
    >
      {children}
      <style>
        {`
        @keyframes popup-fadein {
          from { opacity: 0; transform: translate(-50%, -60%);}
          to   { opacity: 0.98; transform: translate(-50%, -50%);}
        }
        `}
      </style>
    </div>
  );
}

export default function BagPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [popup, setPopup] = useState(false);
  const popupTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pour l'utilisation :
  if (popupTimeout.current) clearTimeout(popupTimeout.current);
  popupTimeout.current = setTimeout(() => setPopup(false), 3000);

  useEffect(() => {
    setCart(getCart());
    return () => {
      if (popupTimeout.current) clearTimeout(popupTimeout.current);
    };
  }, []);

  const handleRemove = (id: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartItem(id, newCart);
    setCart(getCart());
  };

  const handleQty = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    updateCartItem(id, newQty);
    setCart(getCart());
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const tax = 6;
  const discount = 6;
  const total = subtotal + shipping + tax - discount;

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getCart()),
      });
      await res.json();
      setPopup(true);
      if (popupTimeout.current) clearTimeout(popupTimeout.current);
      popupTimeout.current = setTimeout(() => setPopup(false), 3000);
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      // Optionnel: affiche une pop-up d'erreur ici si besoin
    }
  };

  return (
    <div className={styles.pageBg}>
      <CenterPopup open={popup}>Check out done.</CenterPopup>
      <Header />
      <main className={styles.main}>
        <section className={styles.leftSection}>
          <h2 className={styles.bagTitle}>Your Bag</h2>
          <div className={styles.bagList}>
            {cart.length === 0 && <div>Your cart is empty.</div>}
            {cart.map((item, idx) => (
              <div key={item.id}>
                <div className={styles.bagRow}>
                  <img
                    src={item.image}
                    alt={item.nom}
                    className={styles.bagImg}
                  />
                  <div className={styles.bagDetails}>
                    <div className={styles.prodTop}>
                      <div>
                        <span className={styles.prodBrand}>{item.brand}</span>
                        <div className={styles.prodName}>{item.nom}</div>
                      </div>
                      <span className={styles.prodPrice}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.prodControls}>
                      <div className={styles.qtyControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => handleQty(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className={styles.qtyNumber}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => handleQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                {idx < cart.length - 1 && <hr className={styles.divider} />}
              </div>
            ))}
            {cart.length > 0 && (
              <button
                className={styles.removeBtn}
                onClick={() => {
                  clearCart();
                  setCart([]);
                }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </section>
        <section className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryTitle}>Summary</div>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping and delivery</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount</span>
                <span className={styles.discount}>-${discount.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <hr className={styles.divide} />
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total</span>
              <span className={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout &nbsp;→
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
