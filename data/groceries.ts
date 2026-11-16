/**
 * THE COST OF EATING GREEN — grocery dataset
 * ------------------------------------------------------------------
 * This is the single file to edit if you want to change products,
 * prices, package sizes, or emissions assumptions.
 *
 * PRICES were observed at UCSD campus markets (collection date not
 * recorded; prices may have changed). They are not live prices.
 *
 * EMISSIONS = estimated package weight (kg) x emissions factor
 * (kg CO2e per kg of food). Most factors come from Our World in Data's
 * "Greenhouse gas emissions per kilogram of food product"
 * (Poore & Nemecek 2018). Where no factor exists for the exact product,
 * a closest-match proxy is used and marked "proxy" below. An item with
 * no `estimate` is shown as "Not estimated"; it is never counted as zero.
 * ------------------------------------------------------------------
 */

export type Category = "protein" | "vegetable" | "staple" | "fruit" | "snack";

export const CATEGORY_LABELS: Record<Category, string> = {
  protein: "Protein",
  vegetable: "Vegetable",
  staple: "Staple",
  fruit: "Fruit",
  snack: "Snack",
};

export type SourceId = "owid" | "wwf-tuna";

export interface EmissionsFactor {
  /** What the factor represents */
  commodity: string;
  /** kg CO2e per kg of food product */
  kgCO2ePerKg: number;
  source: SourceId;
  note?: string;
}

export const EMISSIONS: Record<string, EmissionsFactor> = {
  // --- Our World in Data / Poore & Nemecek (2018); values checked against the OWID dataset ---
  beef: { commodity: "Beef (beef herd)", kgCO2ePerKg: 99.48, source: "owid" },
  poultry: { commodity: "Poultry meat", kgCO2ePerKg: 9.87, source: "owid" },
  eggs: { commodity: "Eggs", kgCO2ePerKg: 4.67, source: "owid" },
  rice: { commodity: "Rice", kgCO2ePerKg: 4.45, source: "owid" },
  tofu: { commodity: "Tofu", kgCO2ePerKg: 3.16, source: "owid" },
  tomatoes: { commodity: "Tomatoes", kgCO2ePerKg: 2.09, source: "owid" },
  bananas: { commodity: "Bananas", kgCO2ePerKg: 0.86, source: "owid" },
  potatoes: { commodity: "Potatoes", kgCO2ePerKg: 0.46, source: "owid" },
  // closest-match categories from the same dataset
  otherPulses: { commodity: "Other pulses", kgCO2ePerKg: 1.79, source: "owid" },
  otherFruit: { commodity: "Other fruit", kgCO2ePerKg: 1.05, source: "owid" },
  otherVegetables: { commodity: "Other vegetables", kgCO2ePerKg: 0.53, source: "owid" },
  wheatRye: { commodity: "Wheat & rye", kgCO2ePerKg: 1.57, source: "owid" },
  maize: { commodity: "Maize (corn)", kgCO2ePerKg: 1.7, source: "owid" },
  // --- WWF Markets Institute brief on tuna (whole supply chain) ---
  tuna: {
    commodity: "Tuna, whole supply chain",
    kgCO2ePerKg: 8.5,
    source: "wwf-tuna",
    note: "Midpoint of WWF's “about 8–9” typical value. The brief's full range is roughly 2 to 16+.",
  },
};

export interface Estimate {
  /** Weight (kg) used for the emissions estimate */
  weightKg: number;
  /** Where that weight comes from, shown in Sources & Assumptions */
  weightNote: string;
  /** Key into EMISSIONS */
  factorKey: keyof typeof EMISSIONS;
  /** "direct" = same food in the dataset; "proxy" = closest-match category */
  match: "direct" | "proxy";
}

export interface GroceryItem {
  id: string;
  name: string;
  category: Category;
  /** Package size as shown on the card. Only what was actually recorded. */
  packageLabel: string;
  /** Observed price in cents (integers avoid floating-point errors) */
  priceCents: number;
  /** Leave out to show "Not estimated" (never treated as zero) */
  estimate?: Estimate;
}

const NOT_LISTED = "Size not listed";

export const GROCERIES: GroceryItem[] = [
  {
    id: "ground-beef",
    name: "Blue River Meats Ground Beef",
    category: "protein",
    packageLabel: "16 oz",
    priceCents: 995,
    estimate: {
      weightKg: 0.4536,
      weightNote: "16 oz, as listed",
      factorKey: "beef",
      match: "direct",
    },
  },
  {
    id: "chicken-breast",
    name: "Smart Chix Chicken Breast",
    category: "protein",
    packageLabel: "2-pack",
    priceCents: 1395,
    estimate: {
      weightKg: 0.567,
      weightNote:
        "Assumed 1.25 lb: the midpoint of the 0.75–1.75 lb pack range on a Smart Chicken breast listing",
      factorKey: "poultry",
      match: "direct",
    },
  },
  {
    id: "firm-tofu",
    name: "Firm Tofu",
    category: "protein",
    packageLabel: NOT_LISTED,
    priceCents: 295,
    estimate: {
      weightKg: 0.397,
      weightNote: "Assumed a typical 14 oz block (not sourced)",
      factorKey: "tofu",
      match: "direct",
    },
  },
  {
    id: "organic-eggs",
    name: "Chino Valley Organic Brown Eggs",
    category: "protein",
    packageLabel: "6 large eggs",
    priceCents: 450,
    estimate: {
      weightKg: 0.34,
      weightNote: "6 large eggs × the USDA minimum for Large (24 oz per dozen) = 12 oz, in shell",
      factorKey: "eggs",
      match: "direct",
    },
  },
  {
    id: "canned-tuna",
    name: "Canned Tuna",
    category: "protein",
    packageLabel: NOT_LISTED,
    priceCents: 450,
    estimate: {
      weightKg: 0.113,
      weightNote:
        "Assumed a 5 oz can; 4 oz (113 g) drained fish used (from a Bumble Bee chunk light listing)",
      factorKey: "tuna",
      match: "proxy",
    },
  },
  {
    id: "madras-lentils",
    name: "Madras Lentils Pouch",
    category: "protein",
    packageLabel: NOT_LISTED,
    priceCents: 595,
    estimate: {
      weightKg: 0.283,
      weightNote: "Assumed a 10 oz pouch (from Tasty Bite Madras Lentils listings)",
      factorKey: "otherPulses",
      match: "proxy",
    },
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruit",
    packageLabel: "1 banana",
    priceCents: 75,
    estimate: {
      weightKg: 0.126,
      weightNote: "126 g, the FDA “medium banana” edible portion",
      factorKey: "bananas",
      match: "direct",
    },
  },
  {
    id: "potato",
    name: "Potato",
    category: "vegetable",
    packageLabel: "1 potato",
    priceCents: 150,
    estimate: {
      weightKg: 0.148,
      weightNote: "148 g, the FDA “medium potato” edible portion",
      factorKey: "potatoes",
      match: "direct",
    },
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "fruit",
    packageLabel: "1 avocado",
    priceCents: 150,
    estimate: {
      weightKg: 0.15,
      weightNote: "150 g, derived from the FDA figure of 30 g for one-fifth of a medium avocado",
      factorKey: "otherFruit",
      match: "proxy",
    },
  },
  {
    id: "local-tomatoes",
    name: "Locally Raised Tomatoes",
    category: "vegetable",
    packageLabel: "4-pack",
    priceCents: 595,
    estimate: {
      weightKg: 0.592,
      weightNote: "4 × 148 g, the FDA “medium tomato” edible portion",
      factorKey: "tomatoes",
      match: "direct",
    },
  },
  {
    id: "single-tomato",
    name: "Tomato",
    category: "vegetable",
    packageLabel: "1 tomato",
    priceCents: 150,
    estimate: {
      weightKg: 0.148,
      weightNote: "148 g, the FDA “medium tomato” edible portion",
      factorKey: "tomatoes",
      match: "direct",
    },
  },
  {
    id: "green-beans",
    name: "Canned Green Beans",
    category: "vegetable",
    packageLabel: NOT_LISTED,
    priceCents: 285,
    estimate: {
      weightKg: 0.411,
      weightNote:
        "Assumed a 14.5 oz can, liquid included, so this likely overstates the beans (not sourced)",
      factorKey: "otherVegetables",
      match: "proxy",
    },
  },
  {
    id: "white-rice",
    name: "White Rice",
    category: "staple",
    packageLabel: "2 lb",
    priceCents: 460,
    estimate: {
      weightKg: 0.9072,
      weightNote: "2 lb, as listed",
      factorKey: "rice",
      match: "direct",
    },
  },
  {
    id: "ramen",
    name: "Maruchan Ramen Noodle Soup",
    category: "staple",
    packageLabel: NOT_LISTED,
    priceCents: 95,
    estimate: {
      weightKg: 0.085,
      weightNote: "Assumed a 3 oz (85 g) package, as in Maruchan retail listings",
      factorKey: "wheatRye",
      match: "proxy",
    },
  },
  {
    id: "sourdough",
    name: "Sourdough Bread",
    category: "staple",
    packageLabel: NOT_LISTED,
    priceCents: 795,
    estimate: {
      weightKg: 0.454,
      weightNote: "Assumed a 1 lb loaf (not sourced)",
      factorKey: "wheatRye",
      match: "proxy",
    },
  },
  {
    id: "hot-fries",
    name: "Mini Bag Hot Fries",
    category: "snack",
    packageLabel: NOT_LISTED,
    priceCents: 325,
    estimate: {
      weightKg: 0.0283,
      weightNote: "Assumed a 1 oz bag, as in a Chester's Flamin' Hot Fries 1 oz listing",
      factorKey: "maize",
      match: "proxy",
    },
  },
];

/** Shown in the "Sources & Assumptions" panel on the results screen. */
export const SOURCES = [
  {
    label: "Our World in Data: Greenhouse gas emissions per kilogram of food product",
    url: "https://ourworldindata.org/grapher/ghg-per-kg-poore",
    detail:
      "Emissions factors in kg CO₂e per kg of food product: global averages, data year 2010. Source of every factor except tuna.",
  },
  {
    label:
      "Poore, J. & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987–992.",
    url: "https://doi.org/10.1126/science.aaq0216",
    detail: "The study behind the Our World in Data figures.",
  },
  {
    label: "WWF Markets Institute: Measuring and Mitigating GHGs: Tuna (2022 working draft)",
    url: "https://files.worldwildlife.org/wwfcmsprod/files/Publication/file/4brwfb5e9n_MOBERG_GHG_Brief_TUNA_07_22_v4.pdf",
    detail:
      "Source of the tuna factor: about 8–9 kg CO₂e per kg of tuna product across fishing, processing, transport and packaging (range roughly 2 to 16+).",
  },
  {
    label: "FDA, 21 CFR Part 101 Appendix C: Nutrition Facts for Raw Fruits and Vegetables",
    url: "https://www.govinfo.gov/content/pkg/CFR-2002-title21-vol2/pdf/CFR-2002-title21-vol2-sec101-108-app-id74.pdf",
    detail: "Source of the banana, potato, tomato and avocado weights (edible portion of a medium item).",
  },
  {
    label: "USDA AMS: Shell egg specification guide (size classes)",
    url: "https://ams.prod.usda.gov/sites/default/files/media/S01ShellEggSpecGuideforVolumeBuyers.pdf",
    detail: "Large eggs have a minimum net weight of 24 oz per dozen.",
  },
  {
    label: "DPIRD Western Australia: Avocado Life Cycle Analysis (2023)",
    url: "https://www.dpird.wa.gov.au/contentassets/c49f8d82a1444d68a398bd579adf5945/wa-avocado--life-cycle-analysis-lca.pdf",
    detail:
      "Used only as a cross-check: about 0.46–0.49 kg CO₂e per kg of avocado up to the market gate, for a Western Australian orchard.",
  },
];

export const ASSUMPTIONS: string[] = [
  "Prices are the ones the project author observed at UCSD campus markets. The date was not recorded and prices may have changed, so they are not live prices.",
  "Emissions are estimated as package weight (kg) × an emissions factor (kg CO₂e per kg of food). They are not per meal, per serving, or per gram of protein.",
  "Package sizes were not recorded for many products. The estimates use the weights in the table below: sourced typical sizes where we found them, otherwise clearly labeled assumptions. Real products may differ.",
  "An item marked ≈ has no emissions factor for that exact product, so it uses the closest match (for example, Madras lentils use “other pulses”, and ramen and sourdough use “wheat & rye”). Multi-ingredient or processed foods (lentil pouch, ramen, hot fries, canned beans, bread) are the least certain.",
  "Factors are global averages (data year 2010), not measurements of any specific brand, farm or store.",
  "The tuna factor covers fishing, processing, transport and packaging, a wider boundary than the other factors, and its range is large. Comparing tuna with produce is not like-for-like.",
  "Organic eggs and locally raised tomatoes use the same generic factors as their conventional counterparts. The estimates cannot show whether organic or local foods have lower or higher emissions, and organic or local does not automatically mean lower emissions.",
  "The avocado uses the generic “other fruit” factor. A Western Australian avocado study found a lower figure, so this estimate may be high.",
  "Greenhouse gas emissions are one environmental indicator. They are not a complete measure of sustainability (water use, land use, biodiversity, labor, and more also matter).",
  "The basket is a personal selection for this activity and has not been assessed for nutritional completeness or equivalence to the EAT–Lancet reference diet.",
];
