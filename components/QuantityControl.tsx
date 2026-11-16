import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/game";
interface Props {
  name: string;
  quantity: number;
  onChange: (delta: number) => void;
}
export function QuantityControl({ name, quantity, onChange }: Props) {
  return (
    <div className="quantity-control">
      <button
        type="button"
        disabled={quantity === 0}
        onClick={() => onChange(-1)}
        aria-label={`Decrease ${name} quantity`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span
        className="tnum text-center font-semibold"
        aria-label={`${quantity} selected`}
      >
        {quantity}
      </span>
      <button
        type="button"
        disabled={quantity === MAX_QUANTITY}
        onClick={() => onChange(1)}
        aria-label={`Increase ${name} quantity`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
