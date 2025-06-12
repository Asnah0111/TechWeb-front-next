export type CartItem = {
  id: number;
  brand: string;
  nom: string;
  price: number;
  image: string;
  quantity: number;
};

// Fonction utilitaire pour déclencher un événement personnalisé à chaque modification du panier
function triggerCartEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
  triggerCartEvent();
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const idx = cart.findIndex((p) => p.id === item.id);
  if (idx >= 0) {
    cart[idx].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateCartItem(id: number, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
