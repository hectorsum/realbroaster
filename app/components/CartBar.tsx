"use client";

import Image from "next/image";
import { money } from "@/app/lib/menu";
import { useStore } from "./StoreProvider";

export default function CartBar() {
  const { cart, cartCount, subtotal, clearCart, openCheckout, checkoutOpen, product } = useStore();
  if (!cart.length || checkoutOpen || product) return null;
  const last = cart[cart.length - 1];

  return (
    <div className="rb-cartbar">
      <div className="rb-cartbar__inner">
        <div className="rb-cartbar__info">
          <div className="rb-cartbar__thumbwrap">
            <div className="rb-thumb">
              <Image src={last.img} alt="" fill sizes="46px" />
            </div>
            <span className="rb-cartbar__count">{cartCount}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="rb-cartbar__items">{cart.map((l) => `${l.qty}× ${l.name}`).join(" · ")}</div>
            <div className="rb-cartbar__total">
              <span>Total</span>
              <strong>{money(subtotal)}</strong>
            </div>
          </div>
        </div>
        <div className="rb-cartbar__actions">
          <button type="button" className="rb-btn rb-cartbar__clear" onClick={clearCart}>Vaciar</button>
          <button type="button" className="rb-btn rb-btn--red rb-cartbar__go" onClick={openCheckout}>Ver mi pedido</button>
        </div>
      </div>
    </div>
  );
}
