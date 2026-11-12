# The Cost of Eating Green

An interactive classroom game for **UCSD SYN 2 — Climate, Sustainability, and Justice**.

> How do food insecurity and income inequality affect California college students' access to sustainable food options, and what responsibility do universities and institutions have to make sustainable eating affordable and accessible?

Students get **$25** to build a grocery basket (at least one protein, one vegetable, one staple), then check out to see the estimated climate impact of their choices and discuss what shaped them. There is no score and no "right" basket.

Three screens: **Landing → Grocery Marketplace → Results & Reflection**. Everything runs client-side: no backend, database, accounts, or external API calls while playing.

## Run it locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm test           # unit tests for budget / checkout / emissions logic
```

To try it on your phone while developing, open `http://<your-computer's-LAN-IP>:3000` (same Wi-Fi).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. No environment variables or special settings are needed; Vercel detects Next.js automatically.
3. Copy the deployed URL into any QR-code generator for class.

(Or from the terminal: `npx vercel` and follow the prompts.)

Fonts (DM Serif Display, DM Sans) are self-hosted in `app/fonts/`, so builds and gameplay never need to reach Google.

## Editing the groceries, prices, and emissions

**Everything lives in one file: [`data/groceries.ts`](data/groceries.ts).**

- `STARTING_BUDGET_CENTS`: the budget, in cents (2500 = $25.00).
- `GROCERIES`: each product's name, category, package label, `weightKg`, `priceCents`, and an `emissionsKey`.
- `EMISSIONS`: kg CO₂e per kg of food (Our World in Data / Poore & Nemecek 2018).
- `SOURCES` and `ASSUMPTIONS`: the text in the results screen's "Sources & Assumptions" panel.

Estimated emissions for a package = `weightKg × kgCO2ePerKg`. Prices are in cents to avoid floating-point errors.

If you add a product, also add an illustration for its `id` in `components/FoodArt.tsx` (otherwise it shows a plain placeholder circle). Keep the list around 10–12 items so the grid stays clean.

## Project structure

```
app/            layout, global styles, fonts, the single page
components/     Game (state + screen flow), Landing, Marketplace, Results,
                ProductCard, Basket, BudgetTracker, Header, Button, FoodArt (SVGs)
data/           groceries.ts: the editable dataset
lib/            game.ts: pure budget, checkout, and emissions functions
scripts/        verify.test.ts: unit tests for lib/ and the dataset
```

## Honest notes and limitations

- **Prices are illustrative classroom prices**, not live or verified California retail prices. The UI says so on the marketplace, in the footer, and in Sources & Assumptions.
- **Conventional and organic tomatoes share one commodity-average emissions factor**, so the estimate can't show production-specific differences. This is stated in the results panel. The point is to challenge the assumption that "organic" automatically means lower emissions, not to claim it doesn't.
- A **plant-based burger was left out** because the provided reference data has no defensible emissions factor for it.
- Eggs use an approximate dozen weight (~0.6 kg); dried split peas use the generic "peas" factor.
- Emissions are **one environmental indicator**, not a full measure of sustainability. The protein/vegetable/staple rule is a gameplay constraint, not a nutrition standard.
