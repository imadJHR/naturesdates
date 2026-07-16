export type CartProduct = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  accent: string;
};

export type CartItem = CartProduct & { quantity: number };

export type CheckoutOrder = {
  id: string;
  createdAt: string;
  customer: Record<string, FormDataEntryValue>;
  items: CartItem[];
};

export const CART_KEY = "naturesdates-cart";
export const CART_EVENT = "naturesdates-cart-updated";
export const ORDERS_KEY = "naturesdates-orders";

const MAX_QUANTITY = 99;

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function safeParseJson(value: string | null): unknown {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const value = item as Partial<CartItem>;

  return (
    typeof value.slug === "string" &&
    typeof value.name === "string" &&
    typeof value.shortName === "string" &&
    typeof value.image === "string" &&
    typeof value.accent === "string" &&
    typeof value.quantity === "number" &&
    Number.isFinite(value.quantity)
  );
}

function normalizeQuantity(quantity: number) {
  return Math.max(1, Math.min(MAX_QUANTITY, Math.floor(quantity)));
}

function normalizeCart(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];

  const deduped = new Map<string, CartItem>();

  for (const item of items) {
    if (!isCartItem(item)) continue;

    const quantity = normalizeQuantity(item.quantity);
    const existing = deduped.get(item.slug);
    const cleanItem: CartItem = {
      slug: item.slug,
      name: item.name,
      shortName: item.shortName,
      image: item.image,
      accent: item.accent,
      quantity,
    };

    deduped.set(
      item.slug,
      existing ? { ...existing, quantity: normalizeQuantity(existing.quantity + quantity) } : cleanItem,
    );
  }

  return Array.from(deduped.values());
}

function persistCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function readCart(): CartItem[] {
  if (!canUseStorage()) return [];

  try {
    const stored = window.localStorage.getItem(CART_KEY);
    const cart = normalizeCart(safeParseJson(stored));

    if (!stored) return cart;

    const serializedCart = JSON.stringify(cart);
    if (serializedCart !== stored) {
      window.localStorage.setItem(CART_KEY, serializedCart);
    }

    return cart;
  } catch {
    try {
      window.localStorage.removeItem(CART_KEY);
    } catch {
      // Ignore storage cleanup errors.
    }
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (!canUseStorage()) return;

  const cart = normalizeCart(items);

  try {
    persistCart(cart);
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
  } catch {
    // Ignore unavailable storage; cart UI will continue to render safely.
  }
}

export function addToCart(product: CartProduct) {
  const cart = readCart();
  const existing = cart.find((item) => item.slug === product.slug);
  const nextCart = existing
    ? cart.map((item) => (item.slug === product.slug ? { ...item, quantity: normalizeQuantity(item.quantity + 1) } : item))
    : [...cart, { ...product, quantity: 1 }];

  writeCart(nextCart);
  return nextCart;
}

export function updateCartQuantity(slug: string, quantity: number) {
  const cart = readCart();
  const nextCart = quantity <= 0
    ? cart.filter((item) => item.slug !== slug)
    : cart.map((item) => (item.slug === slug ? { ...item, quantity: normalizeQuantity(quantity) } : item));

  writeCart(nextCart);
  return nextCart;
}

export function removeFromCart(slug: string) {
  const nextCart = readCart().filter((item) => item.slug !== slug);
  writeCart(nextCart);
  return nextCart;
}

export function clearCart() {
  writeCart([]);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function saveCheckoutOrder(customer: CheckoutOrder["customer"], items: CartItem[]) {
  if (!canUseStorage()) return null;

  try {
    const previous = safeParseJson(window.localStorage.getItem(ORDERS_KEY));
    const orders = Array.isArray(previous) ? previous : [];
    const order: CheckoutOrder = {
      id: `ND-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items,
    };

    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
    return order;
  } catch {
    return null;
  }
}
