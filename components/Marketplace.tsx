"use client";
import { useEffect, useRef } from "react";
import type { GroceryItem } from "@/data/groceries";
import { itemCount, type CartLine } from "@/lib/game";
import { Basket } from "./Basket";
import { Receipt } from "./Receipt";
import { Button } from "./Button";
import { ProductCard } from "./ProductCard";
interface Props {
  groceries: GroceryItem[];
  lines: CartLine[];
  onChange: (id: string, delta: number) => void;
  onCheckout: () => void;
}
export function Marketplace({ groceries, lines, onChange, onCheckout }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const flights = useRef(new Set<HTMLElement>());
  useEffect(() => {
    const active = flights.current;
    return () => {
      active.forEach((node) => {
        node.getAnimations().forEach((animation) => animation.cancel());
        node.remove();
      });
      active.clear();
    };
  }, []);
  const change = (id: string, delta: number) => {
    onChange(id, delta);
    if (
      delta < 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const source = root.current?.querySelector(
      `[data-product-art="${id}"] svg`,
    );
    const target = root.current?.querySelector("[data-cart-target]");
    if (!source || !target) return;
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const flyer = document.createElement("div");
    flyer.className = "flying-product";
    flyer.setAttribute("aria-hidden", "true");
    flyer.style.cssText = `left:${from.x}px;top:${from.y}px;width:${from.width}px;height:${from.height}px`;
    flyer.append(source.cloneNode(true));
    document.body.append(flyer);
    flights.current.add(flyer);
    const dx = to.x + to.width / 2 - from.x - from.width / 2;
    const dy = to.y + to.height / 2 - from.y - from.height / 2;
    const animation = flyer.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 0.9 },
        {
          transform: `translate(${dx * 0.55}px,${Math.min(dy * 0.55, -90)}px) scale(.65) rotate(-12deg)`,
          offset: 0.5,
          opacity: 1,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(.22) rotate(5deg)`,
          opacity: 0.7,
        },
        { transform: `translate(${dx}px,${dy - 12}px) scale(.25)`, opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(.22,.61,.36,1)" },
    );
    animation.onfinish = () => {
      flyer.remove();
      flights.current.delete(flyer);
    };
  };
  return (
    <div
      ref={root}
      className="mx-auto max-w-[1600px] px-4 pt-7 pb-28 sm:px-8 md:pt-10"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">The weekly shop</p>
          <h1
            data-screen-heading
            tabIndex={-1}
            className="mt-2 font-serif text-4xl text-forest md:text-5xl"
          >
            What goes in your basket?
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Choose what you believe is sustainable.
          <br />
          Any combination. Prices revealed at checkout.
        </p>
      </div>
      <div className="market-layout">
        <section className="market-products" aria-label="Grocery products">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {groceries.map((item, index) => (
              <ProductCard
                key={item.id}
                item={item}
                index={index}
                quantity={
                  lines.find((line) => line.item.id === item.id)?.quantity ?? 0
                }
                onChange={change}
              />
            ))}
          </ul>
        </section>
        <div className="market-cart">
          <Basket lines={lines} />
        </div>
        <aside id="live-receipt" className="market-receipt scroll-mt-72">
          <Receipt lines={lines} />
          <div className="mt-6">
            <Button
              fullWidth
              size="lg"
              disabled={lines.length === 0}
              onClick={onCheckout}
            >
              Check out &amp; reveal
            </Button>
            <p className="mt-2 text-center text-xs text-ink-soft">
              {lines.length
                ? "Ready? Discover what your choices add up to."
                : "Choose at least one item to check out."}
            </p>
          </div>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-cream px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
        <a
          href="#live-receipt"
          className="min-h-11 content-center text-sm font-semibold text-forest underline underline-offset-4"
        >
          Receipt · {itemCount(lines)} units
        </a>
        <Button disabled={lines.length === 0} onClick={onCheckout}>
          Check out &amp; reveal
        </Button>
      </div>
    </div>
  );
}
