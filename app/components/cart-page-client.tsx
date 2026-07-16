"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { CartItem, clearCart, getCartCount, readCart, removeFromCart, updateCartQuantity } from "./cart-actions";
import { Button } from "./ui/button";

function CartLine({ item, onChange }: { item: CartItem; onChange: () => void }) {
  const decrease = () => {
    updateCartQuantity(item.slug, item.quantity - 1);
    onChange();
  };
  const increase = () => {
    updateCartQuantity(item.slug, item.quantity + 1);
    onChange();
  };
  const remove = () => {
    removeFromCart(item.slug);
    onChange();
  };

  return (
    <article className="cart-line">
      <div className="cart-line-media" style={{ "--cart-accent": item.accent } as CSSProperties}>
        <Image src={item.image} alt={item.name} width={160} height={160} />
      </div>
      <div className="cart-line-copy">
        <Link href={`/products/${item.slug}`}>{item.name}</Link>
        <p>{item.shortName}</p>
      </div>
      <div className="cart-qty" aria-label={`Quantity for ${item.name}`}>
        <button type="button" onClick={decrease} aria-label={`Decrease ${item.name}`}><Minus size={15} /></button>
        <span>{item.quantity}</span>
        <button type="button" onClick={increase} aria-label={`Increase ${item.name}`}><Plus size={15} /></button>
      </div>
      <button className="cart-remove" type="button" onClick={remove} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
    </article>
  );
}

function EmptyCart() {
  return (
    <div className="cart-empty">
      <ShoppingBasket size={42} />
      <h2>Your cart is empty.</h2>
      <p>Add your favorite Natures Dates products, then come back here to review the basket.</p>
      <Button asChild><Link href="/products">Browse products <ArrowRight size={17} /></Link></Button>
    </div>
  );
}

export function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const totalItems = useMemo(() => getCartCount(items), [items]);
  const sync = () => setItems(readCart());

  useEffect(() => {
    const timer = window.setTimeout(sync, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const empty = () => {
    clearCart();
    setItems([]);
  };

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <div className="catalog-shell">
          <p className="catalog-eyebrow">Your basket</p>
          <h1>Review your cart.</h1>
          <p>{totalItems === 0 ? "No products selected yet." : `${totalItems} product${totalItems > 1 ? "s" : ""} selected for your quote request.`}</p>
        </div>
      </section>
      <section className="cart-shell catalog-shell">
        {items.length === 0 ? <EmptyCart /> : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => <CartLine item={item} key={item.slug} onChange={sync} />)}
            </div>
            <aside className="cart-summary">
              <h2>Cart summary</h2>
              <p>{totalItems} item{totalItems > 1 ? "s" : ""} ready.</p>
              <div className="cart-summary-row"><span>Products</span><strong>{items.length}</strong></div>
              <div className="cart-summary-row"><span>Total quantity</span><strong>{totalItems}</strong></div>
              <p className="cart-summary-note">Prices, shipping and availability are confirmed after checkout request.</p>
              <Button asChild size="lg"><Link href="/checkout">Go to checkout <ArrowRight size={17} /></Link></Button>
              <Button type="button" variant="outline" onClick={empty}>Clear cart</Button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export function CheckoutPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const totalItems = useMemo(() => getCartCount(items), [items]);

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(readCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const order = {
      id: `ND-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: Object.fromEntries(formData.entries()),
      items,
    };
    const previous = JSON.parse(window.localStorage.getItem("naturesdates-orders") || "[]");
    const orders = Array.isArray(previous) ? previous : [];
    window.localStorage.setItem("naturesdates-orders", JSON.stringify([order, ...orders]));
    clearCart();
    setItems([]);
    setSubmitted(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  };

  if (submitted) {
    return (
      <main className="cart-page">
        <section className="cart-hero checkout-success-hero">
          <div className="catalog-shell checkout-success-card">
            <CheckCircle2 size={54} />
            <p className="catalog-eyebrow">Request sent</p>
            <h1>Checkout request saved.</h1>
            <p>Your checkout request is ready. For live delivery, send us the order details at <a href="mailto:contact@naturesdates.com">contact@naturesdates.com</a>.</p>
            <Button asChild><Link href="/products">Continue shopping <ArrowRight size={17} /></Link></Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <div className="catalog-shell">
          <p className="catalog-eyebrow">Checkout</p>
          <h1>Request your order.</h1>
          <p>Send your cart details and contact info. Natures Dates can confirm pricing, shipping and availability by email.</p>
        </div>
      </section>
      <section className="cart-shell catalog-shell">
        {items.length === 0 ? <EmptyCart /> : (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={submitOrder}>
              <div className="checkout-grid">
                <label>Full name<input name="name" required placeholder="Your name" /></label>
                <label>Email<input name="email" required type="email" placeholder="you@email.com" /></label>
                <label>Phone<input name="phone" placeholder="Phone / WhatsApp" /></label>
                <label>City<input name="city" placeholder="City" /></label>
              </div>
              <label>Delivery address<textarea name="address" rows={3} placeholder="Address, state, ZIP" /></label>
              <label>Notes<textarea name="notes" rows={4} placeholder="Quantity notes, business request, delivery preference..." /></label>
              <Button type="submit" size="lg">Submit request <ArrowRight size={17} /></Button>
            </form>
            <aside className="cart-summary checkout-summary">
              <h2>Order summary</h2>
              <p>{totalItems} item{totalItems > 1 ? "s" : ""} in the basket.</p>
              <div className="checkout-items">
                {items.map((item) => (
                  <div className="checkout-mini-line" key={item.slug}>
                    <span>{item.name}</span>
                    <strong>×{item.quantity}</strong>
                  </div>
                ))}
              </div>
              <p className="cart-summary-note">No online payment is collected here. This is a quote/order request flow.</p>
              <Button asChild variant="outline"><Link href="/cart">Back to cart</Link></Button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
