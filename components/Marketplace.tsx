"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, X } from "lucide-react";
import type { Category, GroceryItem } from "@/data/groceries";
import { formatMoney } from "@/lib/game";
import { Basket } from "./Basket";
import { BudgetTracker } from "./BudgetTracker";
import { Button } from "./Button";
import { ProductCard } from "./ProductCard";

interface MarketplaceProps {
  budgetCents: number;
  groceries: GroceryItem[];
  selected: GroceryItem[];
  spentCents: number;
  remainingCents: number;
  required: Category[];
  missing: Category[];
  announcement: string;
  onToggle: (id: string) => void;
  onCheckout: () => void;
}

export function Marketplace({
  budgetCents,
  groceries,
  selected,
  spentCents,
  remainingCents,
  required,
  missing,
  announcement,
  onToggle,
  onCheckout,
}: MarketplaceProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selectedIds = new Set(selected.map((s) => s.id));

  // Mobile basket sheet: focus the close button, close on Escape, lock page scroll.
  useEffect(() => {
    if (!sheetOpen) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [sheetOpen]);

  const basketProps = {
    budgetCents,
    items: selected,
    spentCents,
    required,
    missing,
    onRemove: onToggle,
    onCheckout,
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pt-8 pb-32 md:px-10 md:pt-12 lg:px-20 lg:pb-20">
      <div className="mb-8 max-w-2xl md:mb-10">
        <h1
          data-screen-heading
          tabIndex={-1}
          className="font-serif text-4xl leading-tight text-forest md:text-5xl"
        >
          Build Your Grocery Basket
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">
          You have {formatMoney(budgetCents)}. Choose at least one protein, one vegetable, and one
          staple, and stay within budget. Prices are illustrative classroom prices.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start xl:gap-12">
        <section aria-label="Grocery products">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {groceries.map((item, index) => (
              <ProductCard
                key={item.id}
                item={item}
                index={index}
                selected={selectedIds.has(item.id)}
                affordable={item.priceCents <= remainingCents}
                onToggle={onToggle}
              />
            ))}
          </ul>
        </section>

        {/* Desktop sticky basket */}
        <aside
          aria-label="Shopping basket"
          className="sticky top-24 hidden rounded-[28px] border border-line bg-white p-6 shadow-sm lg:block"
        >
          <Basket {...basketProps} />
        </aside>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* Mobile / tablet: sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(36,41,36,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="tnum text-lg font-bold text-forest">
                {formatMoney(remainingCents)}
                <span className="ml-1 text-xs font-semibold text-ink-soft">left</span>
              </span>
              <span className="tnum text-xs text-ink-soft">
                {selected.length} {selected.length === 1 ? "item" : "items"}
              </span>
            </div>
            <BudgetTracker budgetCents={budgetCents} spentCents={spentCents} compact />
          </div>
          <Button
            ref={openerRef}
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            className="shrink-0"
          >
            Basket
            <ChevronUp size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close basket"
            tabIndex={-1}
            className="absolute inset-0 bg-charcoal/50"
            onClick={() => setSheetOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping basket"
            className="animate-sheet-in absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-white p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-serif text-2xl text-forest">Your basket</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close basket"
                className="grid size-11 place-items-center rounded-full bg-cream text-forest"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <Basket {...basketProps} />
          </div>
        </div>
      )}
    </div>
  );
}
