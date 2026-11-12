import { Check, X } from "lucide-react";
import type { Category, GroceryItem } from "@/data/groceries";
import { CATEGORY_LABELS } from "@/data/groceries";
import { formatMoney } from "@/lib/game";
import { BudgetTracker } from "./BudgetTracker";
import { Button } from "./Button";
import { FoodArt } from "./FoodArt";

interface BasketProps {
  budgetCents: number;
  items: GroceryItem[];
  spentCents: number;
  required: Category[];
  missing: Category[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function Basket({
  budgetCents,
  items,
  spentCents,
  required,
  missing,
  onRemove,
  onCheckout,
}: BasketProps) {
  const ready = items.length > 0 && missing.length === 0;
  const missingText = missing.map((c) => CATEGORY_LABELS[c].toLowerCase()).join(", ");

  return (
    <div className="flex flex-col gap-6">
      <BudgetTracker budgetCents={budgetCents} spentCents={spentCents} />

      <div>
        <h2 className="mb-3 text-xs font-semibold tracking-wider text-ink-soft uppercase">
          Your basket {items.length > 0 && <span className="tnum">({items.length})</span>}
        </h2>

        {items.length === 0 ? (
          <p className="rounded-2xl border-2 border-dashed border-line px-4 py-6 text-center text-sm text-ink-soft">
            Nothing here yet. Add something from the shelves.
          </p>
        ) : (
          <ul className="flex max-h-[28vh] flex-col gap-2 overflow-y-auto pr-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="animate-pop flex items-center gap-3 rounded-2xl bg-cream p-2 pr-3"
              >
                <FoodArt
                  id={item.id}
                  className="size-11 shrink-0 rounded-xl"
                  background="#efe6cf"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm leading-tight font-semibold">{item.name}</p>
                  <p className="truncate text-xs text-ink-soft">{item.packageLabel}</p>
                </div>
                <p className="tnum text-sm font-bold">{formatMoney(item.priceCents)}</p>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name} from basket`}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-forest"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="font-semibold">Subtotal</span>
          <span className="tnum text-xl font-bold">{formatMoney(spentCents)}</span>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs font-semibold tracking-wider text-ink-soft uppercase">
          Basket requirements
        </h2>
        <ul className="flex flex-col gap-1.5">
          {required.map((category) => {
            const done = !missing.includes(category);
            return (
              <li key={category} className="flex items-center gap-2.5 text-sm">
                <span
                  aria-hidden="true"
                  className={`grid size-5 place-items-center rounded-full transition-colors duration-300 ${
                    done ? "bg-forest text-white" : "border-2 border-sage bg-white"
                  }`}
                >
                  {done && <Check size={12} strokeWidth={3} />}
                </span>
                <span className={done ? "font-semibold" : "text-ink-soft"}>
                  At least one {CATEGORY_LABELS[category].toLowerCase()}
                </span>
                <span className="sr-only">{done ? "(done)" : "(still needed)"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <Button size="lg" fullWidth disabled={!ready} onClick={onCheckout}>
          Check out
        </Button>
        <p className="mt-2 min-h-5 text-center text-sm text-ink-soft" aria-live="polite">
          {ready
            ? "Ready when you are. You can still change your basket."
            : items.length === 0
              ? "Add a protein, a vegetable, and a staple to check out."
              : `Still needed: ${missingText}.`}
        </p>
      </div>
    </div>
  );
}
