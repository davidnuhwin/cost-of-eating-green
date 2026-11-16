import type { DragEvent } from "react";
import { CATEGORY_LABELS, type GroceryItem } from "@/data/groceries";
import { MAX_QUANTITY } from "@/lib/game";
import { FoodArt } from "./FoodArt";
import { QuantityControl } from "./QuantityControl";

interface Props {
  item: GroceryItem;
  quantity: number;
  onChange: (id: string, delta: number) => void;
  onDragStart: (id: string, event: DragEvent<HTMLButtonElement>) => void;
  onDragEnd: () => void;
}

/** The illustration is the pick-up control, with a label on the shelf rail. */
export function ProductCard({
  item,
  quantity,
  onChange,
  onDragStart,
  onDragEnd,
}: Props) {
  const atLimit = quantity === MAX_QUANTITY;
  return (
    <li className={`shelf-product ${quantity > 0 ? "is-selected" : ""}`}>
      <div className="shelf-display">
        <button
          type="button"
          className="shelf-pickup"
          data-product-art={item.id}
          disabled={atLimit}
          draggable={!atLimit}
          onDragStart={(event) => onDragStart(item.id, event)}
          onDragEnd={onDragEnd}
          onClick={() => onChange(item.id, 1)}
          aria-label={`Add ${item.name} to cart`}
          aria-describedby={`shelf-label-${item.id}`}
        >
          <FoodArt id={item.id} bare className="shelf-food" />
        </button>
        {quantity > 0 && (
          <span className="shelf-selected" aria-hidden="true">
            ×{quantity}
          </span>
        )}
      </div>
      <div className="shelf-label" id={`shelf-label-${item.id}`}>
        <p className="shelf-category">{CATEGORY_LABELS[item.category]}</p>
        <h2>{item.name}</h2>
        <p className="shelf-package">{item.packageLabel}</p>
        <QuantityControl
          name={item.name}
          quantity={quantity}
          onChange={(delta) => onChange(item.id, delta)}
        />
        <p className="shelf-limit">{atLimit ? "Maximum 10 per product" : ""}</p>
      </div>
    </li>
  );
}
