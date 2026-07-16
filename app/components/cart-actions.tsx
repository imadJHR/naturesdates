"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ShoppingBasket, ShoppingCart } from "lucide-react";
import {
  addToCart,
  CART_EVENT,
  getCartCount,
  readCart,
  type CartItem,
  type CartProduct,
} from "@/app/lib/cart";
import { Button } from "./ui/button";

export type { CartItem, CartProduct } from "@/app/lib/cart";
export {
  addToCart,
  CART_EVENT,
  CART_KEY,
  clearCart,
  getCartCount,
  readCart,
  removeFromCart,
  updateCartQuantity,
  writeCart,
} from "@/app/lib/cart";

export function AddToCartButton({
  product,
  size = "default",
  className,
}: {
  product: CartProduct;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
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
