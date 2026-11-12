// Run with: npm test   (uses Node's built-in test runner)
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  EMISSIONS,
  GROCERIES,
  REQUIRED_CATEGORIES,
  STARTING_BUDGET_CENTS,
} from "../data/groceries.ts";
import {
  canAfford,
  canCheckout,
  formatMoney,
  itemEmissionsKg,
  missingCategories,
  remainingCents,
  sumCents,
  totalEmissionsKg,
} from "../lib/game.ts";

const byId = (id: string) => {
  const item = GROCERIES.find((g) => g.id === id);
  assert.ok(item, `missing item ${id}`);
  return item;
};

test("starts with exactly $25.00", () => {
  assert.equal(STARTING_BUDGET_CENTS, 2500);
  assert.equal(formatMoney(remainingCents(STARTING_BUDGET_CENTS, [])), "$25.00");
});

test("dataset has 10-12 items with unique ids and valid emissions keys", () => {
  assert.ok(GROCERIES.length >= 10 && GROCERIES.length <= 12);
  assert.equal(new Set(GROCERIES.map((g) => g.id)).size, GROCERIES.length);
  for (const g of GROCERIES) {
    assert.ok(EMISSIONS[g.emissionsKey], `bad emissions key on ${g.id}`);
    assert.ok(g.weightKg > 0 && g.priceCents > 0);
  }
});

test("every required category has at least one product", () => {
  for (const category of REQUIRED_CATEGORIES) {
    assert.ok(GROCERIES.some((g) => g.category === category), category);
  }
});

test("budget updates when items are added", () => {
  const basket = [byId("tofu"), byId("rice")]; // 2.29 + 3.49
  assert.equal(sumCents(basket), 578);
  assert.equal(remainingCents(STARTING_BUDGET_CENTS, basket), 1922);
});

test("budget limit blocks purchases that do not fit", () => {
  const basket = [
    byId("ground-beef"), // 6.99
    byId("cheese"), // 4.99
    byId("nuts"), // 5.99
    byId("chicken"), // 4.49  -> 22.46 spent, $2.54 left
  ];
  assert.equal(remainingCents(STARTING_BUDGET_CENTS, basket), 254);
  assert.equal(canAfford(STARTING_BUDGET_CENTS, basket, byId("potatoes")), false); // 4.49 > 2.54
});

test("exact-budget purchase is allowed, one cent over is not", () => {
  const basket = [byId("ground-beef"), byId("cheese"), byId("nuts"), byId("chicken")]; // 2246
  assert.equal(canAfford(STARTING_BUDGET_CENTS, basket, byId("tomatoes-conventional")), true); // 249 <= 254
  assert.equal(canAfford(STARTING_BUDGET_CENTS, basket, byId("rice")), false); // 349 > 254
  const tight = [...basket, byId("tomatoes-conventional")]; // 2495
  assert.equal(canAfford(STARTING_BUDGET_CENTS, tight, byId("bananas")), false); // 129 > 5
});

test("checkout requires protein + vegetable + staple", () => {
  assert.equal(canCheckout(REQUIRED_CATEGORIES, []), false);
  assert.equal(canCheckout(REQUIRED_CATEGORIES, [byId("tofu"), byId("rice")]), false);
  assert.deepEqual(missingCategories(REQUIRED_CATEGORIES, [byId("tofu"), byId("rice")]), [
    "vegetable",
  ]);
  assert.equal(
    canCheckout(REQUIRED_CATEGORIES, [byId("tofu"), byId("rice"), byId("tomatoes-organic")]),
    true,
  );
  // fruit alone never satisfies a requirement
  assert.equal(canCheckout(REQUIRED_CATEGORIES, [byId("bananas")]), false);
});

test("emissions = package weight x factor (project example: 0.4 kg tofu)", () => {
  const tofu = { ...byId("tofu"), weightKg: 0.4 };
  assert.ok(Math.abs(itemEmissionsKg(tofu, EMISSIONS) - 1.264) < 1e-9);
});

test("total emissions sums item emissions", () => {
  const basket = [byId("ground-beef"), byId("potatoes")];
  const expected = 0.454 * 99.48 + 2.268 * 0.46;
  assert.ok(Math.abs(totalEmissionsKg(basket, EMISSIONS) - expected) < 1e-9);
});

test("organic and conventional tomatoes share one factor but differ in price", () => {
  const conventional = byId("tomatoes-conventional");
  const organic = byId("tomatoes-organic");
  assert.equal(itemEmissionsKg(conventional, EMISSIONS), itemEmissionsKg(organic, EMISSIONS));
  assert.ok(organic.priceCents > conventional.priceCents);
});

test("price/emissions mix illustrates all four relationships", () => {
  // cheap + low: split peas, potatoes. pricey + low: nuts. cheap-ish + high: chicken. pricey + high: beef, cheese.
  const per = (id: string) => itemEmissionsKg(byId(id), EMISSIONS);
  assert.ok(byId("split-peas").priceCents < 250 && per("split-peas") < 1);
  assert.ok(byId("nuts").priceCents >= 500 && per("nuts") < 1);
  assert.ok(byId("chicken").priceCents < 500 && per("chicken") > 4);
  assert.ok(byId("ground-beef").priceCents >= 600 && per("ground-beef") > 40);
});
