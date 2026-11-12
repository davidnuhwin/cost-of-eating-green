import { ChevronDown, RotateCcw } from "lucide-react";
import type { CSSProperties } from "react";
import {
  ASSUMPTIONS,
  CATEGORY_LABELS,
  EMISSIONS,
  SOURCES,
  type GroceryItem,
} from "@/data/groceries";
import { formatKg, formatMoney, itemEmissionsKg, totalEmissionsKg } from "@/lib/game";
import { Button } from "./Button";
import { FoodArt } from "./FoodArt";

interface ResultsProps {
  items: GroceryItem[];
  budgetCents: number;
  spentCents: number;
  remainingCents: number;
  onPlayAgain: () => void;
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Results({ items, budgetCents, spentCents, remainingCents, onPlayAgain }: ResultsProps) {
  const rows = items.map((item) => ({ item, kg: itemEmissionsKg(item, EMISSIONS) }));
  const total = totalEmissionsKg(items, EMISSIONS);
  const byEmissions = [...rows].sort((a, b) => b.kg - a.kg);
  const maxKg = Math.max(...rows.map((r) => r.kg), 0.0001);
  const highest = byEmissions[0];
  const lowest = byEmissions[byEmissions.length - 1];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pt-8 pb-20 md:px-10 md:pt-12 lg:px-20">
      <div className="animate-rise max-w-3xl">
        <p className="mb-3 text-xs font-bold tracking-wider text-ink-soft uppercase">Your results</p>
        <h1
          data-screen-heading
          tabIndex={-1}
          className="font-serif text-4xl leading-tight text-forest md:text-6xl"
        >
          Here’s what your basket adds up to
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
          There’s no right or wrong basket. These numbers are a starting point for talking about
          what shaped your choices.
        </p>
      </div>

      {/* Headline numbers */}
      <section aria-label="Summary" className="mt-10 grid gap-4 md:grid-cols-3">
        <Stat label="Total spent" value={formatMoney(spentCents)} sub={`of ${formatMoney(budgetCents)}`} d={100} />
        <Stat label="Money remaining" value={formatMoney(remainingCents)} sub="left in your budget" d={200} />
        <Stat
          label="Estimated carbon footprint"
          value={formatKg(total)}
          unit="kg CO₂e"
          sub="for these packages"
          d={300}
          dark
        />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Breakdown */}
        <section
          aria-labelledby="breakdown-h"
          className="animate-rise rounded-[28px] border border-line bg-white p-6 md:p-8"
          style={delay(400)}
        >
          <h2 id="breakdown-h" className="font-serif text-2xl text-forest md:text-3xl">
            Grocery breakdown
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">Selected items with price and estimated emissions</caption>
              <thead>
                <tr className="border-b border-line text-xs tracking-wider text-ink-soft uppercase">
                  <th scope="col" className="pb-2 font-semibold">Item</th>
                  <th scope="col" className="pb-2 text-right font-semibold">Price</th>
                  <th scope="col" className="pb-2 text-right font-semibold">Est. kg CO₂e</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ item, kg }) => (
                  <tr key={item.id} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="py-3 pr-3 font-normal">
                      <div className="flex items-center gap-3">
                        <FoodArt id={item.id} className="size-11 shrink-0 rounded-xl" background="#efe6cf" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-ink-soft">
                            {CATEGORY_LABELS[item.category]} · {item.packageLabel}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="tnum py-3 text-right font-semibold">{formatMoney(item.priceCents)}</td>
                    <td className="tnum py-3 text-right font-semibold">{formatKg(kg)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-forest">
                  <th scope="row" className="pt-3 text-base font-bold">Total</th>
                  <td className="tnum pt-3 text-right text-base font-bold">{formatMoney(spentCents)}</td>
                  <td className="tnum pt-3 text-right text-base font-bold">{formatKg(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Chart */}
        <section
          aria-labelledby="chart-h"
          className="animate-rise rounded-[28px] border border-line bg-white p-6 md:p-8"
          style={delay(500)}
        >
          <h2 id="chart-h" className="font-serif text-2xl text-forest md:text-3xl">
            Emissions by item
          </h2>
          <p className="mt-1 text-sm text-ink-soft">Estimated kg CO₂e for each package you chose.</p>

          <ul className="mt-6 flex flex-col gap-4">
            {byEmissions.map(({ item, kg }, i) => (
              <li key={item.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="tnum text-ink-soft">
                    <strong className="text-charcoal">{formatKg(kg)}</strong> kg
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-cream-deep" aria-hidden="true">
                  <div
                    className="animate-bar-grow h-full rounded-full bg-forest"
                    style={{ "--w": `${Math.max(2, (kg / maxKg) * 100)}%`, "--delay": `${700 + i * 120}ms` } as CSSProperties}
                  />
                </div>
              </li>
            ))}
          </ul>

          {rows.length > 1 && (
            <p className="mt-6 rounded-2xl bg-cream p-4 text-sm leading-relaxed">
              Highest in your basket: <strong>{highest.item.name}</strong> ({formatKg(highest.kg)} kg
              CO₂e, {formatMoney(highest.item.priceCents)}). Lowest: <strong>{lowest.item.name}</strong>{" "}
              ({formatKg(lowest.kg)} kg CO₂e, {formatMoney(lowest.item.priceCents)}).
            </p>
          )}
        </section>
      </div>

      {/* Reflection */}
      <section
        aria-labelledby="reflect-h"
        className="animate-rise mt-6 rounded-[28px] bg-forest p-6 text-cream md:p-10"
        style={delay(600)}
      >
        <div className="on-dark grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <h2 id="reflect-h" className="font-serif text-3xl md:text-4xl">
              What do these choices tell us?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/90 md:text-lg">
              Some lower-emissions foods are inexpensive, while others cost more. But access to
              sustainable food isn’t determined by price alone. Income, transportation, time, and
              institutional resources also influence students’ choices.
            </p>
          </div>
          <ol className="flex flex-col gap-4">
            <li className="rounded-2xl bg-white/10 p-5 md:p-6">
              <p className="text-xs font-bold tracking-wider text-sage uppercase">Discussion question 1</p>
              <p className="mt-2 text-lg leading-snug md:text-xl">
                How did your $25 budget influence the foods you chose? Would your decisions have
                changed if you had more or less money?
              </p>
            </li>
            <li className="rounded-2xl bg-white/10 p-5 md:p-6">
              <p className="text-xs font-bold tracking-wider text-sage uppercase">Discussion question 2</p>
              <p className="mt-2 text-lg leading-snug md:text-xl">
                What could universities do to make affordable, sustainable food more accessible to
                students experiencing food insecurity?
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Play again */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <Button size="lg" onClick={onPlayAgain}>
          <RotateCcw size={20} aria-hidden="true" />
          Play Again
        </Button>
        <p className="text-sm text-ink-soft">Try a different basket and compare what changes.</p>
      </div>

      {/* Sources */}
      <details className="group mx-auto mt-10 max-w-3xl rounded-2xl border border-line bg-white">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 font-semibold text-forest marker:content-none [&::-webkit-details-marker]:hidden">
          Sources &amp; Assumptions
          <ChevronDown
            size={20}
            aria-hidden="true"
            className="transition-transform duration-300 group-open:rotate-180"
          />
        </summary>
        <div className="border-t border-line px-5 py-5 text-sm leading-relaxed">
          <h3 className="font-bold">Sources</h3>
          <ul className="mt-2 flex flex-col gap-3">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-forest underline underline-offset-2 hover:text-forest-deep"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className="text-ink-soft">{s.detail}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-5 font-bold">Assumptions &amp; limits</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-ink-soft marker:text-sage">
            {ASSUMPTIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3 className="mt-5 font-bold">Emissions factors used</h3>
          <ul className="tnum mt-2 grid gap-x-6 gap-y-1 text-ink-soft sm:grid-cols-2">
            {Object.values(EMISSIONS).map((f) => (
              <li key={f.commodity} className="flex justify-between border-b border-line/60 py-1">
                <span>{f.commodity}</span>
                <span>{f.kgCO2ePerKg} kg CO₂e/kg</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  sub,
  d,
  dark = false,
}: {
  label: string;
  value: string;
  unit?: string;
  sub: string;
  d: number;
  dark?: boolean;
}) {
  return (
    <div
      className={`animate-rise rounded-[28px] p-6 md:p-7 ${
        dark ? "bg-sage text-forest-deep" : "border border-line bg-white"
      }`}
      style={delay(d)}
    >
      <p className={`text-xs font-bold tracking-wider uppercase ${dark ? "text-forest-deep" : "text-ink-soft"}`}>
        {label}
      </p>
      <p className="tnum mt-2 font-serif text-5xl leading-none text-forest md:text-6xl">
        {value}
        {unit && <span className="ml-2 font-sans text-base font-bold tracking-normal">{unit}</span>}
      </p>
      <p className={`mt-2 text-sm ${dark ? "text-forest-deep" : "text-ink-soft"}`}>{sub}</p>
    </div>
  );
}
