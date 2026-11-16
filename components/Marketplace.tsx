"use client";
import { useEffect, useRef, useState, type DragEvent } from "react";
import type { GroceryItem } from "@/data/groceries";
import { MAX_QUANTITY, itemCount, type CartLine } from "@/lib/game";
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
  const [draggingId, setDraggingId] = useState<string | null>(null);
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
  const change = (
    id: string,
    delta: number,
    dropPoint?: { x: number; y: number },
  ) => {
    const quantity = lines.find((line) => line.item.id === id)?.quantity ?? 0;
    if (delta > 0 && quantity >= MAX_QUANTITY) return;
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
    const sourceRect = source.getBoundingClientRect();
    const basketRect = target.getBoundingClientRect();
    const from = dropPoint
      ? { x: dropPoint.x - 40, y: dropPoint.y - 40, width: 80, height: 80 }
      : sourceRect;
    const dx = basketRect.x + basketRect.width / 2 - from.x - from.width / 2;
    const dy = basketRect.y - from.y - from.height / 2;
    const scale = Math.min(0.6, basketRect.width / 4 / from.width);
    const flyer = document.createElement("div");
    flyer.className = "flying-product";
    flyer.setAttribute("aria-hidden", "true");
    flyer.style.cssText = `left:${from.x}px;top:${from.y}px;width:${from.width}px;height:${from.height}px`;
    flyer.append(source.cloneNode(true));
    document.body.append(flyer);
    flights.current.add(flyer);
    const animation = flyer.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: "translate(0,-28px) scale(1.12) rotate(-6deg)",
          offset: 0.18,
          opacity: 1,
        },
        {
          transform: `translate(${dx * 0.7}px,${Math.min(dy - 65, -75)}px) scale(.8) rotate(8deg)`,
          offset: 0.6,
          opacity: 1,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(${scale}) rotate(-4deg)`,
          offset: 0.87,
          opacity: 1,
        },
        {
          transform: `translate(${dx}px,${dy - 8}px) scale(${scale * 1.05}) rotate(2deg)`,
          offset: 0.94,
          opacity: 0.9,
        },
        { transform: `translate(${dx}px,${dy}px) scale(${scale})`, opacity: 0 },
      ],
      {
        duration: dropPoint ? 160 : 240,
        easing: "cubic-bezier(.22,.61,.36,1)",
      },
    );
    animation.onfinish = () => {
      flyer.remove();
      flights.current.delete(flyer);
    };
  };

  const startDrag = (id: string, event: DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("application/x-eating-green-product", id);
    event.dataTransfer.effectAllowed = "copy";
    setDraggingId(id);
  };
  const dragOver = (event: DragEvent<HTMLElement>) => {
    if (!draggingId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };
  const drop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("application/x-eating-green-product");
    setDraggingId(null);
    if (!groceries.some((item) => item.id === id)) return;
    change(id, 1, { x: event.clientX, y: event.clientY });
  };
  return (
    <div
      ref={root}
      className="mx-auto max-w-[1760px] px-4 pt-7 pb-28 sm:px-8 md:pt-10"
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
          Pick from the shelves. Prices revealed at checkout.
        </p>
      </div>
      <div className="market-layout">
        <section className="market-products" aria-label="Grocery shelves">
          <ul className="market-shelves">
            {groceries.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                quantity={
                  lines.find((line) => line.item.id === item.id)?.quantity ?? 0
                }
                onChange={change}
                onDragStart={startDrag}
                onDragEnd={() => setDraggingId(null)}
              />
            ))}
          </ul>
        </section>
        <div className="market-cart">
          <Basket
            lines={lines}
            receiving={draggingId !== null}
            onDragOver={dragOver}
            onDrop={drop}
          />
        </div>
        <aside
          id="live-receipt"
          className="market-receipt scroll-mt-[360px] lg:scroll-mt-[440px] min-[1440px]:scroll-mt-24"
        >
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
