import type { EmissionsFactor, GroceryItem } from "@/data/groceries";

export const MAX_QUANTITY = 10;
export type Cart = Record<string, number>;
export interface CartLine {
  item: GroceryItem;
  quantity: number;
}

/** Functional updates keep rapid additions synchronized. Zero removes the entry. */
export function changeQuantity(cart: Cart, id: string, delta: number): Cart {
  if (!Number.isInteger(delta)) return cart;
  const quantity = Math.max(0, Math.min(MAX_QUANTITY, (cart[id] ?? 0) + delta));
  const next = { ...cart };
  if (quantity === 0) delete next[id];
  else next[id] = quantity;
  return next;
}

export function cartLines(cart: Cart, groceries: GroceryItem[]): CartLine[] {
  return Object.entries(cart).flatMap(([id, quantity]) => {
    const item = groceries.find((g) => g.id === id);
    return item && quantity > 0 ? [{ item, quantity }] : [];
  });
}

export function itemCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

/** Money stays in integer cents until display. */
export function sumCents(lines: CartLine[]): number {
  return lines.reduce(
    (total, { item, quantity }) => total + item.priceCents * quantity,
    0,
  );
}

export function canCheckout(lines: CartLine[]): boolean {
  return itemCount(lines) > 0;
}

/**
 * Package weight (kg) x emissions factor (kg CO2e per kg) = kg CO2e.
 * Returns null when the item has no estimate. Unknown is never treated as zero.
 */
export function itemEmissionsKg(
  item: GroceryItem,
  factors: Record<string, EmissionsFactor>,
): number | null {
  if (!item.estimate) return null;
  const factor = factors[item.estimate.factorKey];
  if (!factor) {
    throw new Error(
      `No emissions factor found for "${item.estimate.factorKey}"`,
    );
  }
  return item.estimate.weightKg * factor.kgCO2ePerKg;
}

export interface EmissionsTotal {
  /** Sum over items that have an estimate only */
  kg: number;
  /** How many selected units contributed to `kg` */
  estimated: number;
  /** How many units are in the basket */
  total: number;
  /** How many contributing units use a closest-match proxy */
  proxies: number;
  /** True when every item has an estimate */
  complete: boolean;
}

export function totalEmissions(
  items: CartLine[],
  factors: Record<string, EmissionsFactor>,
): EmissionsTotal {
  let kg = 0;
  let estimated = 0;
  let proxies = 0;
  for (const { item, quantity } of items) {
    const value = itemEmissionsKg(item, factors);
    if (value === null) continue;
    kg += value * quantity;
    estimated += quantity;
    if (item.estimate?.match === "proxy") proxies += quantity;
  }
  return {
    kg,
    estimated,
    total: itemCount(items),
    proxies,
    complete: estimated === itemCount(items),
  };
}

export function formatMoney(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function formatKg(kg: number): string {
  if (kg >= 10) return kg.toFixed(1);
  return kg.toFixed(2);
}
