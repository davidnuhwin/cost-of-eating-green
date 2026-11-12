import { Check, Minus, Plus } from "lucide-react";
import type { GroceryItem } from "@/data/groceries";
import { CATEGORY_LABELS } from "@/data/groceries";
import { formatMoney } from "@/lib/game";
import { FoodArt, tileBackground } from "./FoodArt";

interface ProductCardProps {
  item: GroceryItem;
  index: number;
  selected: boolean;
  affordable: boolean;
  onToggle: (id: string) => void;
}

export function ProductCard({ item, index, selected, affordable, onToggle }: ProductCardProps) {
  const blocked = !selected && !affordable;
  const descId = `desc-${item.id}`;

  return (
    <li
      className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white transition-all duration-300 ${
        selected
          ? "border-forest shadow-lg shadow-forest/10"
          : blocked
            ? "border-line opacity-80"
            : "border-line hover:-translate-y-1 hover:border-sage hover:shadow-xl hover:shadow-forest/10"
      }`}
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <FoodArt
          id={item.id}
          background={tileBackground(index)}
          className={`size-full transition-transform duration-500 ${
            blocked ? "grayscale-[0.5]" : "group-hover:scale-105"
          }`}
        />
        <span className="absolute top-3 left-3 rounded-full bg-sage px-3 py-1 text-xs font-bold tracking-wide text-forest-deep">
          {CATEGORY_LABELS[item.category]}
        </span>
        {selected && (
          <span
            className="animate-pop absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-forest text-white shadow-md"
            aria-hidden="true"
          >
            <Check size={18} strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-[17px] leading-snug font-bold">{item.name}</h3>
        <p className="mt-0.5 text-sm text-ink-soft">{item.packageLabel}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="tnum font-serif text-3xl leading-none text-forest">
            {formatMoney(item.priceCents)}
          </p>
          {blocked && (
            <p id={descId} className="text-right text-xs font-semibold text-terracotta-deep">
              Over your budget
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggle(item.id)}
          disabled={blocked}
          aria-pressed={selected}
          aria-describedby={blocked ? descId : undefined}
          aria-label={
            selected
              ? `Remove ${item.name} from basket`
              : blocked
                ? `${item.name} costs more than your remaining budget`
                : `Add ${item.name}, ${formatMoney(item.priceCents)}, to basket`
          }
          className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full text-sm font-semibold md:gap-2 md:text-[15px] transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed ${
            selected
              ? "border-2 border-forest bg-white text-forest hover:bg-sage-soft"
              : "bg-forest text-white hover:bg-forest-deep disabled:bg-cream-deep disabled:text-ink-soft"
          }`}
        >
          {selected ? (
            <>
              <Minus size={16} aria-hidden="true" /> Remove
            </>
          ) : (
            <>
              <Plus size={16} aria-hidden="true" /> {blocked ? "Can’t afford" : "Add to basket"}
            </>
          )}
        </button>
      </div>
    </li>
  );
}
