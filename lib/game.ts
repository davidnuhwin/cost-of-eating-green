import type { Category, EmissionsFactor, GroceryItem } from "@/data/groceries";

/** Money is handled in integer cents to avoid floating-point drift. */

export function sumCents(items: GroceryItem[]): number {
  return items.reduce((total, item) => total + item.priceCents, 0);
}

export function remainingCents(budgetCents: number, items: GroceryItem[]): number {
  return budgetCents - sumCents(items);
}

/** An item can be added if it isn't already selected and still fits the budget. */
export function canAfford(
  budgetCents: number,
  selected: GroceryItem[],
  item: GroceryItem,
): boolean {
  return item.priceCents <= remainingCents(budgetCents, selected);
}

export function missingCategories(
  required: Category[],
  selected: GroceryItem[],
): Category[] {
  const have = new Set(selected.map((item) => item.category));
  return required.filter((category) => !have.has(category));
}

export function canCheckout(required: Category[], selected: GroceryItem[]): boolean {
  return selected.length > 0 && missingCategories(required, selected).length === 0;
}

/** Package weight (kg) x emissions factor (kg CO2e per kg) = kg CO2e. */
export function itemEmissionsKg(
  item: GroceryItem,
  factors: Record<string, EmissionsFactor>,
): number {
  const factor = factors[item.emissionsKey];
  if (!factor) {
    throw new Error(`No emissions factor found for "${item.emissionsKey}"`);
  }
  return item.weightKg * factor.kgCO2ePerKg;
}

export function totalEmissionsKg(
  items: GroceryItem[],
  factors: Record<string, EmissionsFactor>,
): number {
  return items.reduce((total, item) => total + itemEmissionsKg(item, factors), 0);
}

export function formatMoney(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function formatKg(kg: number): string {
  if (kg >= 10) return kg.toFixed(1);
  return kg.toFixed(2);
}
