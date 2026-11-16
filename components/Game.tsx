"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GROCERIES } from "@/data/groceries";
import {
  cartLines,
  changeQuantity,
  canCheckout,
  itemCount,
  type Cart,
} from "@/lib/game";
import { Header } from "./Header";
import { Landing } from "./Landing";
import { Marketplace } from "./Marketplace";
import { Results } from "./Results";

type Screen = "intro" | "shop" | "results";
export function Game() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [cart, setCart] = useState<Cart>({});
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const lines = useMemo(() => cartLines(cart, GROCERIES), [cart]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    mainRef.current
      ?.querySelector<HTMLElement>("[data-screen-heading]")
      ?.focus({ preventScroll: true });
  }, [screen]);
  const reset = () => {
    setCart({});
    setScreen("shop");
  };
  return (
    <>
      <Header
        onHome={() => setScreen("intro")}
        onRestart={screen === "intro" ? undefined : reset}
      />
      <main ref={mainRef} key={screen} className="animate-screen-in">
        {screen === "intro" && <Landing onStart={() => setScreen("shop")} />}
        {screen === "shop" && (
          <Marketplace
            groceries={GROCERIES}
            lines={lines}
            onChange={(id, delta) =>
              setCart((current) => changeQuantity(current, id, delta))
            }
            onCheckout={() => {
              if (canCheckout(lines)) setScreen("results");
            }}
          />
        )}
        {screen === "results" && (
          <Results
            lines={lines}
            onBack={() => setScreen("shop")}
            onPlayAgain={reset}
          />
        )}
      </main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs leading-relaxed text-ink-soft">
        <p>
          The Cost of Eating Green · UC San Diego SYN 2 · Climate,
          Sustainability &amp; Justice
        </p>
        <p className="mt-2">
          A classroom exploration of food, choice, and access.
        </p>
      </footer>
      <span className="sr-only" role="status" aria-live="polite">
        {screen === "shop"
          ? `${itemCount(lines)} units in your cart. ${lines.map(({ item, quantity }) => `${item.name}, ${quantity}`).join(". ")}`
          : ""}
      </span>
    </>
  );
}
