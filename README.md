# The Cost of Eating Green

An interactive classroom game for **UCSD SYN 2 — Climate, Sustainability, and Justice**.

> How do food insecurity and income inequality affect California college students' access to sustainable food options, and what responsibility do universities and institutions have to make sustainable eating affordable and accessible?

Choose a weekly grocery basket based on your own idea of sustainability. Add 0–10 of each of the 16 original campus-market products, then check out to reveal prices and estimated emissions. Any nonempty basket can check out.

Three screens: **Introduction → Grocery Marketplace → Receipt & Reflection**. Everything runs client-side. Cart quantities persist while moving between screens during a session. Refreshing clears the cart. Returning from results preserves it, and Start over clears it.

The live receipt hides all prices until checkout. Results include historical EAT–Lancet affordability findings from Hirvonen et al. (2020), using 2011 data, with source links and methodological context. The player’s basket is assessed independently of the reference diet.

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
npm test           # unit tests for quantities / checkout / emissions logic
```

To try it on your phone while developing, open `http://<your-computer's-LAN-IP>:3000` (same Wi-Fi).

## Deploy to Vercel

Review `git diff` and try the local preview before publishing. This project can continue using its existing GitHub repository and Vercel project. After approving the changes, commit the reviewed files and push to the branch connected to that Vercel project. Review the resulting Vercel preview before promoting it to production, or use your existing production-branch workflow.

No environment changes are required for this redesign.

Fonts (DM Serif Display, DM Sans) are self-hosted in `app/fonts/`, so builds and gameplay never need to reach Google.

## Editing the groceries, prices, and emissions

**Everything lives in one file: [`data/groceries.ts`](data/groceries.ts).**

- `GROCERIES`: 16 UCSD campus-market products with their observed prices (in cents). Each has an optional `estimate` (weight used, where that weight came from, which factor, and whether it is a `direct` or closest-match `proxy`).
- `EMISSIONS`: kg CO₂e per kg of food. Most come from Our World in Data (Poore & Nemecek 2018). Tuna comes from a WWF brief.
- `SOURCES` and `ASSUMPTIONS`: the text in the results screen's "Sources & Assumptions" panel.

Estimated emissions for a package = `weightKg × kgCO2ePerKg`. **If you delete an item's `estimate`, the game shows "Not estimated" for it and counts the basket total as partial. It never treats unknown as zero.**

If you add a product, also add an illustration for its `id` in `components/FoodArt.tsx`.

## Project structure

```
app/            layout, global styles, fonts, the single page
components/     Game (quantity state + screen flow), Landing, Marketplace, Results,
                ProductCard, QuantityControl, Basket (cart illustration), Receipt,
                Header, Button, FoodArt (SVGs)
data/           groceries.ts: the editable dataset
lib/            game.ts: pure quantity, checkout, and emissions functions
scripts/        verify.test.ts: unit tests for lib/ and the dataset
```

## Honest notes and limitations

- **Prices** were observed at UCSD campus markets. The date was not recorded, so they may have changed.
- **Package sizes** were not recorded for 7 products (the cards say "Size not listed"). Emissions use typical or sourced weights, each explained in the results screen's audit table.
- **≈ estimates** (tuna, lentil pouch, avocado, canned green beans, ramen, sourdough, hot fries) use the closest available factor, not a measurement of that exact product. Processed, multi-ingredient foods are the least certain.
- Tuna's factor covers a wider supply chain than the others, with a large range (about 2 to 16+), so it is not like-for-like with produce.
- Organic eggs and local tomatoes use generic factors, so the estimates cannot show organic or local differences.
- Emissions are **one environmental indicator**, not a full measure of sustainability. The basket is a personal selection, with no category requirements or nutritional assessment.
