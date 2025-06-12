import { useEffect, useState } from "react";

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function update() {
      const data = localStorage.getItem("cart");
      if (data) {
        const cart = JSON.parse(data);
        const total = cart.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCount(total);
      } else {
        setCount(0);
      }
    }
    update();
    window.addEventListener("storage", update);
    // Ajoute un event custom pour quand le panier change localement
    window.addEventListener("cartUpdated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cartUpdated", update);
    };
  }, []);
  return count;
}
