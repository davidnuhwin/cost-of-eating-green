// Run with: npm test   (uses Node's built-in test runner)
import { test } from "node:test";
import assert from "node:assert/strict";

import { EMISSIONS, GROCERIES, type GroceryItem } from "../data/groceries.ts";
import {
  canCheckout,
  cartLines,
  changeQuantity,
  itemCount,
  type Cart,
  itemEmissionsKg,
  sumCents,
  totalEmissions,
} from "../lib/game.ts";

const byId = (id: string) => {
  const item = GROCERIES.find((g) => g.id === id);
  assert.ok(item, `missing item ${id}`);
  return item;
};
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;

// Observed UCSD campus-market prices, in cents (from the project's price table)
const EXPECTED_PRICES: Record<string, number> = {
  "ground-beef": 995,
  "chicken-breast": 1395,
  "firm-tofu": 295,
  "organic-eggs": 450,
  "canned-tuna": 450,
  "madras-lentils": 595,
  banana: 75,
  potato: 150,
  avocado: 150,
  "local-tomatoes": 595,
  "single-tomato": 150,
  "green-beans": 285,
  "white-rice": 460,
  ramen: 95,
  sourdough: 795,
  "hot-fries": 325,
};

test("16 products with unique ids and the exact observed prices", () => {
  assert.equal(GROCERIES.length, 16);
  assert.equal(new Set(GROCERIES.map((g) => g.id)).size, 16);
  for (const [id, cents] of Object.entries(EXPECTED_PRICES)) {
    assert.equal(byId(id).priceCents, cents, `${id} price`);
  }
});

test("categories follow the rules: snack, fruit, and vegetable are kept separate", () => {
  assert.equal(byId("hot-fries").category, "snack");
  assert.equal(byId("banana").category, "fruit");
  assert.equal(byId("avocado").category, "fruit");
  for (const id of [
    "potato",
    "local-tomatoes",
    "single-tomato",
    "green-beans",
  ]) {
    assert.equal(byId(id).category, "vegetable", id);
  }
  for (const id of ["white-rice", "ramen", "sourdough"]) {
    assert.equal(byId(id).category, "staple", id);
  }
});

test("quantity bounds, final removal, and rapid functional updates", () => {
  let cart: Cart = {};
  for (let i = 0; i < 25; i++) cart = changeQuantity(cart, "banana", 1);
  assert.equal(cart.banana, 10);
  for (let i = 0; i < 11; i++) cart = changeQuantity(cart, "banana", -1);
  assert.deepEqual(cart, {});
  assert.deepEqual(changeQuantity(cart, "banana", NaN), {});
  assert.deepEqual(changeQuantity(cart, "banana", 0.5), {});
});

test("any nonempty category can check out, with no spending cap", () => {
  assert.equal(canCheckout([]), false);
  const lines = cartLines({ "ground-beef": 10, banana: 3 }, GROCERIES);
  assert.equal(canCheckout(lines), true);
  assert.equal(canCheckout(cartLines({ banana: 1 }, GROCERIES)), true);
  assert.equal(sumCents(lines), 10175);
  assert.equal(itemCount(lines), 13);
});

test("all 16 products can hold ten units, retaining inventory and line order", () => {
  let cart: Cart = {};
  for (const item of GROCERIES) cart = changeQuantity(cart, item.id, 10);
  const lines = cartLines(cart, GROCERIES);
  assert.equal(lines.length, 16);
  assert.equal(itemCount(lines), 160);
  assert.equal(
    sumCents(lines),
    GROCERIES.reduce((sum, item) => sum + item.priceCents * 10, 0),
  );
  assert.deepEqual(
    lines.map(({ item }) => item.id),
    GROCERIES.map((item) => item.id),
  );
  assert.equal(cartLines({ unknown: 3, banana: 0 }, GROCERIES).length, 0);
});

test("every estimate references a real factor and has a positive weight", () => {
  for (const g of GROCERIES) {
    assert.ok(g.estimate, `${g.id} has no estimate`);
    assert.ok(EMISSIONS[g.estimate.factorKey], `bad factor key on ${g.id}`);
    assert.ok(g.estimate.weightKg > 0, `${g.id} weight`);
    assert.ok(g.estimate.weightNote.length > 0, `${g.id} weight note`);
  }
});

test("emission factors match the verified Our World in Data values", () => {
  const owid: Record<string, number> = {
    beef: 99.48,
    poultry: 9.87,
    eggs: 4.67,
    rice: 4.45,
    tofu: 3.16,
    tomatoes: 2.09,
    bananas: 0.86,
    potatoes: 0.46,
    otherPulses: 1.79,
    otherFruit: 1.05,
    otherVegetables: 0.53,
    wheatRye: 1.57,
    maize: 1.7,
  };
  for (const [key, value] of Object.entries(owid)) {
    assert.equal(EMISSIONS[key].kgCO2ePerKg, value, key);
    assert.equal(EMISSIONS[key].source, "owid", key);
  }
  assert.equal(EMISSIONS.tuna.kgCO2ePerKg, 8.5);
  assert.equal(EMISSIONS.tuna.source, "wwf-tuna");
});

test("emissions = package weight x factor (project example: 0.4 kg tofu)", () => {
  const tofu: GroceryItem = {
    ...byId("firm-tofu"),
    estimate: { ...byId("firm-tofu").estimate!, weightKg: 0.4 },
  };
  assert.ok(close(itemEmissionsKg(tofu, EMISSIONS)!, 1.264));
});

test("ground beef uses the listed 16 oz and the beef factor", () => {
  assert.ok(
    close(itemEmissionsKg(byId("ground-beef"), EMISSIONS)!, 0.4536 * 99.48),
  );
});

test("basket total sums item estimates (tofu + potato + ramen)", () => {
  const t = totalEmissions(
    cartLines({ "firm-tofu": 2, potato: 1, ramen: 3 }, GROCERIES),
    EMISSIONS,
  );
  const expected = 2 * 0.397 * 3.16 + 0.148 * 0.46 + 3 * 0.085 * 1.57;
  assert.ok(close(t.kg, expected));
  assert.equal(t.estimated, 6);
  assert.equal(t.total, 6);
  assert.equal(t.proxies, 3); // ramen is a closest-match proxy
  assert.equal(t.complete, true);
});

test("unknown emissions are never counted as zero", () => {
  const unknown: GroceryItem = { ...byId("ramen"), estimate: undefined };
  assert.equal(itemEmissionsKg(unknown, EMISSIONS), null);

  const partial = totalEmissions(
    [
      { item: byId("firm-tofu"), quantity: 2 },
      { item: unknown, quantity: 3 },
    ],
    EMISSIONS,
  );
  assert.equal(partial.estimated, 2);
  assert.equal(partial.total, 5);
  assert.equal(partial.complete, false);
  assert.ok(close(partial.kg, 2 * 0.397 * 3.16));

  const none = totalEmissions([{ item: unknown, quantity: 2 }], EMISSIONS);
  assert.equal(none.estimated, 0);
  assert.equal(none.complete, false);
});

test("organic eggs and local tomatoes are not assumed to differ from generic factors", () => {
  assert.equal(
    byId("local-tomatoes").estimate!.factorKey,
    byId("single-tomato").estimate!.factorKey,
  );
  assert.equal(byId("organic-eggs").estimate!.factorKey, "eggs");
});

test("price and emissions tell different stories across the shelf", () => {
  const per = (id: string) => itemEmissionsKg(byId(id), EMISSIONS)!;
  // cheap and low: potato, banana. pricey and high: beef. pricey and lower: sourdough, lentils.
  assert.ok(byId("potato").priceCents <= 150 && per("potato") < 0.2);
  assert.ok(byId("ground-beef").priceCents >= 900 && per("ground-beef") > 40);
  assert.ok(byId("sourdough").priceCents >= 700 && per("sourdough") < 1);
  // the highest-emissions package is not the highest-priced one
  const highest = [...GROCERIES].sort((a, b) => per(b.id) - per(a.id))[0];
  const priciest = [...GROCERIES].sort(
    (a, b) => b.priceCents - a.priceCents,
  )[0];
  assert.equal(highest.id, "ground-beef");
  assert.equal(priciest.id, "chicken-breast");
});
