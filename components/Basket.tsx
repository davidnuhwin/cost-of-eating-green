import type { CartLine } from "@/lib/game";
import { itemCount } from "@/lib/game";
import { FoodArt } from "./FoodArt";
export function Basket({ lines }: { lines: CartLine[] }) {
  return (
    <section
      className="physical-cart"
      aria-label={`Shopping cart, ${itemCount(lines)} units`}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="font-serif text-xl">Your cart</h2>
        <p className="text-xs text-ink-soft">{itemCount(lines)} units</p>
      </div>
      <div className="cart-body" data-cart-target>
        {lines.length === 0 ? (
          <p className="col-span-4 self-center text-center text-xs leading-relaxed text-ink-soft">
            An empty cart.
            <br />A week of possibilities.
          </p>
        ) : (
          lines.map(({ item, quantity }) => (
            <div
              key={item.id}
              className="cart-product"
              aria-label={`${item.name}, quantity ${quantity}`}
            >
              <FoodArt id={item.id} bare className="size-full" />
              <span className="cart-badge">×{quantity}</span>
            </div>
          ))
        )}
      </div>
      <div className="cart-chassis" aria-hidden="true">
        <span />
        <span />
      </div>
    </section>
  );
}
