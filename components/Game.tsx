"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GROCERIES,
  REQUIRED_CATEGORIES,
  STARTING_BUDGET_CENTS,
  type GroceryItem,
} from "@/data/groceries";
import {
  canAfford,
  canCheckout,
  formatMoney,
  missingCategories,
  remainingCents,
  sumCents,
} from "@/lib/game";
import { Header } from "./Header";
import { Landing } from "./Landing";
import { Marketplace } from "./Marketplace";
import { Results } from "./Results";

type Screen = "intro" | "shop" | "results";

export function Game() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Basket in the order items were added
  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => GROCERIES.find((g) => g.id === id))
        .filter((g): g is GroceryItem => Boolean(g)),
    [selectedIds],
  );

  const spent = sumCents(selected);
  const remaining = remainingCents(STARTING_BUDGET_CENTS, selected);
  const missing = missingCategories(REQUIRED_CATEGORIES, selected);

  // On screen change: scroll to top and move focus to the new screen's heading.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    mainRef.current?.querySelector<HTMLElement>("[data-screen-heading]")?.focus({ preventScroll: true });
  }, [screen]);

  const toggle = useCallback(
    (id: string) => {
      const item = GROCERIES.find((g) => g.id === id);
      if (!item) return;

      if (selectedIds.includes(id)) {
        const next = selectedIds.filter((x) => x !== id);
        const nextRemaining = remainingCents(
          STARTING_BUDGET_CENTS,
          GROCERIES.filter((g) => next.includes(g.id)),
        );
        setSelectedIds(next);
        setAnnouncement(`Removed ${item.name}. ${formatMoney(nextRemaining)} left.`);
        return;
      }

      // Enforce the budget in logic, not just in the UI
      if (!canAfford(STARTING_BUDGET_CENTS, selected, item)) {
        setAnnouncement(`${item.name} costs ${formatMoney(item.priceCents)}, more than the ${formatMoney(remaining)} you have left.`);
        return;
      }
      setSelectedIds([...selectedIds, id]);
      setAnnouncement(`Added ${item.name}. ${formatMoney(remaining - item.priceCents)} left.`);
    },
    [selectedIds, selected, remaining],
  );

  const checkout = useCallback(() => {
    if (!canCheckout(REQUIRED_CATEGORIES, selected)) return;
    setScreen("results");
  }, [selected]);

  const reset = (next: Screen) => {
    setSelectedIds([]);
    setAnnouncement("");
    setScreen(next);
  };

  return (
    <>
      <Header
        remainingCents={screen === "shop" ? remaining : undefined}
        itemCount={screen === "shop" ? selected.length : undefined}
        onHome={() => reset("intro")}
        onRestart={screen === "intro" ? undefined : () => reset("shop")}
      />
      <main ref={mainRef} key={screen} className="animate-screen-in">
        {screen === "intro" && <Landing onStart={() => setScreen("shop")} />}
        {screen === "shop" && (
          <Marketplace
            budgetCents={STARTING_BUDGET_CENTS}
            groceries={GROCERIES}
            selected={selected}
            spentCents={spent}
            remainingCents={remaining}
            required={REQUIRED_CATEGORIES}
            missing={missing}
            announcement={announcement}
            onToggle={toggle}
            onCheckout={checkout}
          />
        )}
        {screen === "results" && (
          <Results
            items={selected}
            budgetCents={STARTING_BUDGET_CENTS}
            spentCents={spent}
            remainingCents={remaining}
            onPlayAgain={() => reset("shop")}
          />
        )}
      </main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs leading-relaxed text-ink-soft">
        <p>
          A classroom activity for UCSD SYN 2. Prices are illustrative. Emissions are estimates from Our
          World in Data / Poore &amp; Nemecek (2018) and are one indicator of sustainability, not a complete measure.
        </p>
      </footer>
    </>
  );
}
