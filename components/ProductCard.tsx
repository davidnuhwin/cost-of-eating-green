import { CATEGORY_LABELS, type GroceryItem } from "@/data/groceries";
import { FoodArt, tileBackground } from "./FoodArt";
import { QuantityControl } from "./QuantityControl";
interface Props {
  item: GroceryItem;
  index: number;
  quantity: number;
  onChange: (id: string, delta: number) => void;
}
export function ProductCard({ item, index, quantity, onChange }: Props) {
  return (
    <li className={`product-card ${quantity > 0 ? "is-selected" : ""}`}>
      <div
        data-product-art={item.id}
        className="relative overflow-hidden rounded-t-2xl"
      >
        <FoodArt
          id={item.id}
          background={tileBackground(index)}
          className="aspect-[6/5] w-full transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
          {CATEGORY_LABELS[item.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h2 className="text-sm font-bold leading-snug sm:text-base">
          {item.name}
        </h2>
        <p className="mt-1 text-xs text-ink-soft">{item.packageLabel}</p>
        <div className="mt-auto pt-4">
          <QuantityControl
            name={item.name}
            quantity={quantity}
            onChange={(delta) => onChange(item.id, delta)}
          />
        </div>
        <p className="mt-1 min-h-4 text-center text-[10px] text-ink-soft">
          {quantity === 10 ? "Maximum 10 per product" : ""}
        </p>
      </div>
    </li>
  );
}
