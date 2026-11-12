/**
 * THE COST OF EATING GREEN — grocery dataset
 * ------------------------------------------------------------------
 * This is the single file to edit if you want to change products,
 * prices, package sizes, or emissions assumptions.
 *
 * Prices are ILLUSTRATIVE CLASSROOM PRICES. They are not live or
 * verified California retail prices. Edit them freely.
 *
 * Emissions (kg CO2e per kg of food) come from Our World in Data's
 * food greenhouse gas emissions comparison, which draws on
 * Poore & Nemecek (2018). Estimated emissions for a package =
 *     weightKg x emissionsFactor
 * ------------------------------------------------------------------
 */

export const STARTING_BUDGET_CENTS = 2500; // $25.00

export type Category = "protein" | "vegetable" | "staple" | "fruit";

/** The three categories a basket must include before checkout. */
export const REQUIRED_CATEGORIES: Category[] = ["protein", "vegetable", "staple"];

export const CATEGORY_LABELS: Record<Category, string> = {
  protein: "Protein",
  vegetable: "Vegetable",
  staple: "Staple",
  fruit: "Fruit",
};

export interface EmissionsFactor {
  /** Name of the commodity in the Our World in Data chart */
  commodity: string;
  /** kg CO2e per kg of food product */
  kgCO2ePerKg: number;
}

/** Reference values: Our World in Data / Poore & Nemecek (2018). */
export const EMISSIONS: Record<string, EmissionsFactor> = {
  beef: { commodity: "Beef (beef herd)", kgCO2ePerKg: 99.48 },
  poultry: { commodity: "Chicken / poultry", kgCO2ePerKg: 9.87 },
  cheese: { commodity: "Cheese", kgCO2ePerKg: 23.88 },
  eggs: { commodity: "Eggs", kgCO2ePerKg: 4.67 },
  rice: { commodity: "Rice", kgCO2ePerKg: 4.45 },
  tofu: { commodity: "Tofu", kgCO2ePerKg: 3.16 },
  tomatoes: { commodity: "Tomatoes", kgCO2ePerKg: 2.09 },
  peas: { commodity: "Peas", kgCO2ePerKg: 0.98 },
  bananas: { commodity: "Bananas", kgCO2ePerKg: 0.86 },
  potatoes: { commodity: "Potatoes", kgCO2ePerKg: 0.46 },
  nuts: { commodity: "Nuts", kgCO2ePerKg: 0.43 },
};

export interface GroceryItem {
  id: string;
  name: string;
  category: Category;
  /** Human-readable package size shown on the card */
  packageLabel: string;
  /** Package weight in kilograms, used for the emissions estimate */
  weightKg: number;
  /** Illustrative price in cents (integers avoid floating-point errors) */
  priceCents: number;
  /** Key into EMISSIONS */
  emissionsKey: keyof typeof EMISSIONS;
  /** Optional note shown on the results screen */
  note?: string;
}

export const GROCERIES: GroceryItem[] = [
  {
    id: "ground-beef",
    name: "Ground Beef",
    category: "protein",
    packageLabel: "1 lb pack",
    weightKg: 0.454,
    priceCents: 699,
    emissionsKey: "beef",
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    category: "protein",
    packageLabel: "1 lb pack",
    weightKg: 0.454,
    priceCents: 449,
    emissionsKey: "poultry",
  },
  {
    id: "tofu",
    name: "Firm Tofu",
    category: "protein",
    packageLabel: "14 oz block",
    weightKg: 0.397,
    priceCents: 229,
    emissionsKey: "tofu",
  },
  {
    id: "eggs",
    name: "Eggs",
    category: "protein",
    packageLabel: "12 large eggs (~0.6 kg)",
    weightKg: 0.6,
    priceCents: 429,
    emissionsKey: "eggs",
    note: "Weight is approximate for a dozen large eggs.",
  },
  {
    id: "cheese",
    name: "Cheddar Cheese",
    category: "protein",
    packageLabel: "8 oz block",
    weightKg: 0.227,
    priceCents: 499,
    emissionsKey: "cheese",
  },
  {
    id: "split-peas",
    name: "Dried Split Peas",
    category: "protein",
    packageLabel: "1 lb bag",
    weightKg: 0.454,
    priceCents: 199,
    emissionsKey: "peas",
    note: "Uses the generic 'peas' factor, applied here to dried peas.",
  },
  {
    id: "nuts",
    name: "Mixed Nuts",
    category: "protein",
    packageLabel: "8 oz bag",
    weightKg: 0.227,
    priceCents: 599,
    emissionsKey: "nuts",
  },
  {
    id: "tomatoes-conventional",
    name: "Tomatoes (Conventional)",
    category: "vegetable",
    packageLabel: "1 lb",
    weightKg: 0.454,
    priceCents: 249,
    emissionsKey: "tomatoes",
    note: "Same commodity-average factor as the organic tomatoes.",
  },
  {
    id: "tomatoes-organic",
    name: "Tomatoes (Organic)",
    category: "vegetable",
    packageLabel: "1 lb",
    weightKg: 0.454,
    priceCents: 399,
    emissionsKey: "tomatoes",
    note: "Same commodity-average factor as the conventional tomatoes.",
  },
  {
    id: "rice",
    name: "White Rice",
    category: "staple",
    packageLabel: "2 lb bag",
    weightKg: 0.907,
    priceCents: 349,
    emissionsKey: "rice",
  },
  {
    id: "potatoes",
    name: "Potatoes",
    category: "staple",
    packageLabel: "5 lb bag",
    weightKg: 2.268,
    priceCents: 449,
    emissionsKey: "potatoes",
  },
  {
    id: "bananas",
    name: "Bananas",
    category: "fruit",
    packageLabel: "2 lb bunch",
    weightKg: 0.907,
    priceCents: 129,
    emissionsKey: "bananas",
  },
];

/** Shown in the "Sources & Assumptions" panel on the results screen. */
export const SOURCES = [
  {
    label: "Our World in Data — Food: greenhouse gas emissions across the supply chain",
    url: "https://ourworldindata.org/grapher/food-emissions-supply-chain",
    detail:
      "Emissions factors in kg CO₂e per kg of food product, as provided for this project.",
  },
  {
    label: "Poore, J. & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392).",
    url: "https://doi.org/10.1126/science.aaq0216",
    detail: "The underlying study behind the Our World in Data figures.",
  },
];

export const ASSUMPTIONS: string[] = [
  "Prices are illustrative classroom prices, not live or verified California grocery prices. They are editable in data/groceries.ts.",
  "Emissions are estimated as package weight (kg) × a commodity-average emissions factor (kg CO₂e per kg of food). They are not per meal, per serving, or per gram of protein.",
  "Conventional and organic tomatoes use the same commodity-average factor, so the estimate does not capture production-specific differences between them. Organic does not automatically mean lower emissions, and these numbers cannot show whether it does.",
  "Eggs use an approximate package weight for a dozen large eggs. Dried split peas use the generic 'peas' factor.",
  "A plant-based burger was left out because no defensible emissions factor was included in the reference data.",
  "Greenhouse gas emissions are one environmental indicator. They are not a complete measure of sustainability (water use, land use, biodiversity, labor, and more also matter).",
  "The protein / vegetable / staple requirement is only a gameplay rule. It is not a nutritionally complete meal or a validated diet.",
];
