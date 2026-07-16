"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ShoppingBasket, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export type CartProduct = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  accent: string;
};

export type CartItem = CartProduct & { quantity: number };

export const CART_KEY = "naturesdates-cart";
export const CART_EVENT = "naturesdates-cart-updated";
const MAX_QUANTITY = 99;

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
    const existing = deduped.get(item.slug);
    const quantity = normalizeQuantity(item.quantity);
    const cleanItem: CartItem = {
      slug: item.slug,
      name: item.name,
      shortName: item.shortName,
      image: item.image,
      accent: item.accent,
      quantity,
    };

    if (existing) {
      deduped.set(item.slug, { ...existing, quantity: normalizeQuantity(existing.quantity + quantity) });
    } else {
      deduped.set(item.slug, cleanItem);
    }
  }

  return Array.from(deduped.values());
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    const cart = normalizeCart(parsed);

    if (JSON.stringify(cart) !== stored) {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
  if (typeof window === "undefined") return;
  const cart = normalizeCart(items);
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
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

export function AddToCartButton({ product, size = "default", className }: { product: CartProduct; size?: "default" | "sm" | "lg"; className?: string }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <Button type="button" size={size} className={className} onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
      {justAdded ? <Check size={17} /> : <ShoppingBasket size={17} />}
      {justAdded ? "Added" : "Add to cart"}
    </Button>
  );
}

export function CartStatus() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncCart = () => setCart(readCart());
    syncCart();
    window.addEventListener(CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    window.addEventListener("pageshow", syncCart);
    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("pageshow", syncCart);
    };
  }, []);

  const count = useMemo(() => getCartCount(cart), [cart]);

  return (
    <Link className="cart-status" href="/cart" aria-label={`${count} items in cart`}>
      <ShoppingCart size={17} />
      Cart
      <span>{count}</span>
    </Link>
  );
}
