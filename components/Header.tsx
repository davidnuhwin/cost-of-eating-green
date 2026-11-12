import { RotateCcw, ShoppingBasket } from "lucide-react";
import { formatMoney } from "@/lib/game";

interface HeaderProps {
  /** When provided, shows the live budget pill (marketplace screen) */
  remainingCents?: number;
  itemCount?: number;
  onHome: () => void;
  onRestart?: () => void;
}

export function Header({ remainingCents, itemCount, onHome, onRestart }: HeaderProps) {
  const showBudget = remainingCents !== undefined;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-10 lg:px-20">
        <button
          type="button"
          onClick={onHome}
          className="group flex items-center gap-2.5 rounded-lg text-left"
          aria-label="The Cost of Eating Green, back to start"
        >
          <span
            aria-hidden="true"
            className="hidden size-9 place-items-center rounded-full bg-forest text-cream transition-transform duration-300 group-hover:rotate-12 sm:grid"
          >
            <ShoppingBasket size={18} strokeWidth={2} />
          </span>
          <span className="font-serif text-[19px] leading-[1.1] tracking-tight text-forest md:text-2xl">
            The Cost of Eating Green
          </span>
        </button>

        <nav aria-label="Game" className="flex items-center gap-2 md:gap-4">
          {showBudget && (
            <div
              className="flex items-baseline gap-2 rounded-full border border-line bg-white py-1.5 pr-4 pl-4"
              aria-label={`Budget remaining ${formatMoney(remainingCents)}`}
            >
              <span className="hidden text-xs font-semibold tracking-wider text-ink-soft uppercase sm:inline">
                Left to spend
              </span>
              <span
                className={`tnum text-lg font-bold transition-colors duration-300 ${
                  remainingCents < 300 ? "text-terracotta-deep" : "text-forest"
                }`}
              >
                {formatMoney(remainingCents)}
              </span>
              {itemCount !== undefined && <span className="sr-only">{itemCount} items in basket</span>}
            </div>
          )}
          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-forest transition-colors hover:bg-sage-soft"
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Start over</span>
              <span className="sr-only sm:hidden">Start over</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
