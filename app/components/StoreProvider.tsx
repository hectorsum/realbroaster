"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface CartLine {
  id: number;
  name: string;
  img: string;
  opts: string;
  note: string;
  qty: number;
  unit: number;
}

export interface Loc {
  modo: "delivery" | "retiro";
  label: string;
  dir: string;
  zona: string;
  coords: [number, number];
  exacta: boolean;
}

interface Store {
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addLine: (line: Omit<CartLine, "id">) => void;
  setQty: (id: number, qty: number) => void;
  removeLine: (id: number) => void;
  clearCart: () => void;
  loc: Loc | null;
  setLoc: (loc: Loc) => void;
  modeOpen: boolean;
  setModeOpen: (open: boolean) => void;
  product: { ci: number; ii: number } | null;
  openProduct: (ci: number, ii: number) => void;
  closeProduct: () => void;
  checkoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/** Locks page scroll while a full-screen layer is open. */
export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

export function scrollToId(id: string, offset: number) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loc, setLoc] = useState<Loc | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const [product, setProduct] = useState<Store["product"]>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const nextId = useRef(1);

  const addLine = useCallback((line: Omit<CartLine, "id">) => {
    setCart((c) => [...c, { ...line, id: nextId.current++ }]);
  }, []);
  const setQty = useCallback((id: number, qty: number) => {
    setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: Math.min(20, Math.max(1, qty)) } : l)));
  }, []);
  const removeLine = useCallback((id: number) => setCart((c) => c.filter((l) => l.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const openProduct = useCallback((ci: number, ii: number) => setProduct({ ci, ii }), []);
  const closeProduct = useCallback(() => setProduct(null), []);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const value = useMemo<Store>(
    () => ({
      cart,
      cartCount: cart.reduce((a, l) => a + l.qty, 0),
      subtotal: cart.reduce((a, l) => a + l.unit * l.qty, 0),
      addLine, setQty, removeLine, clearCart,
      loc, setLoc,
      modeOpen, setModeOpen,
      product, openProduct, closeProduct,
      // An emptied cart can't be checked out.
      checkoutOpen: checkoutOpen && cart.length > 0,
      openCheckout, closeCheckout,
    }),
    [cart, loc, modeOpen, product, checkoutOpen, addLine, setQty, removeLine, clearCart, openProduct, closeProduct, openCheckout, closeCheckout],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
