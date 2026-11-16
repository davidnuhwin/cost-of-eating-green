import { ASSUMPTIONS, EMISSIONS, GROCERIES, SOURCES } from "@/data/groceries";
import { ChevronDown } from "lucide-react";
import {
  formatKg,
  formatMoney,
  sumCents,
  itemEmissionsKg,
  totalEmissions,
  type CartLine,
} from "@/lib/game";
import { Receipt } from "./Receipt";
import { Button } from "./Button";
interface Props {
  lines: CartLine[];
  onBack: () => void;
  onPlayAgain: () => void;
}
export function Results({ lines, onBack, onPlayAgain }: Props) {
  const spent = formatMoney(sumCents(lines));
  const total = totalEmissions(lines, EMISSIONS);
  const rows = lines.map(({ item, quantity }) => ({
    item,
    quantity,
    kg: itemEmissionsKg(item, EMISSIONS),
  }));
  const maxKg = Math.max(
    ...rows.map(({ kg, quantity }) => (kg ?? 0) * quantity),
    0.0001,
  );
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
      <p className="eyebrow">The reveal</p>
      <h1
        data-screen-heading
        tabIndex={-1}
        className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-forest md:text-6xl"
      >
        Your idea of a sustainable week.
        <span className="reveal-total">{spent}</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        You spent {spent} on the groceries you believed would make up a
        sustainable week of food. How would that cost fit into your life?
      </p>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div className="mx-auto w-full max-w-md">
          <Receipt lines={lines} finalized />
          <p className="mt-6 text-xs leading-relaxed text-ink-soft">
            Recorded UCSD campus-market prices. Observation date was not
            recorded, so prices may have changed.
          </p>
        </div>
        <section
          className="rounded-3xl bg-sage-soft p-6 md:p-8"
          aria-labelledby="carbon-heading"
        >
          <h2 id="carbon-heading" className="text-sm font-semibold">
            Estimated basket emissions{!total.complete && " · partial"}
          </h2>
          <p className="mt-3 font-serif text-6xl text-forest">
            {total.estimated ? formatKg(total.kg) : "—"}
            <span className="ml-2 font-sans text-base">kg CO₂e</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Package weight × food emissions factor × quantity. {total.estimated}{" "}
            of {total.total} units estimated.{" "}
            {total.proxies > 0 &&
              `${total.proxies} units use closest-match factors (≈).`}{" "}
            These estimates cover the packages selected, with uncertain weights
            and global-average factors.
          </p>
          <ul className="mt-7 space-y-4">
            {[...rows]
              .sort(
                (a, b) => (b.kg ?? -1) * b.quantity - (a.kg ?? -1) * a.quantity,
              )
              .map(({ item, quantity, kg }) => (
                <li key={item.id}>
                  <div className="mb-1 flex justify-between gap-4 text-xs">
                    <span>
                      {quantity}× {item.name}
                    </span>
                    <span className="shrink-0 font-semibold">
                      {kg === null
                        ? "Not estimated"
                        : `${item.estimate?.match === "proxy" ? "≈ " : ""}${formatKg(kg * quantity)} kg`}
                    </span>
                  </div>
                  {kg !== null && (
                    <div
                      className="h-2 rounded-full bg-white/70"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-forest"
                        style={{ width: `${((kg * quantity) / maxKg) * 100}%` }}
                      />
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-ink-soft">
            Emissions are one environmental indicator. Water, land,
            biodiversity, and labor also matter. Weights, proxies, and source
            boundaries are explained below.
          </p>
        </section>
      </div>
      <section
        className="mt-16 border-y border-line py-10 md:py-14"
        aria-labelledby="research-heading"
      >
        <p className="eyebrow">Beyond your {spent} receipt</p>
        <h2
          id="research-heading"
          className="mt-3 max-w-3xl font-serif text-3xl text-forest md:text-4xl"
        >
          But what does sustainable eating cost around the world?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Your basket cost {spent} at the recorded campus-market prices. Whether
          a cost is affordable depends on where you live and how much income you
          have. Hirvonen and colleagues studied this question using the
          EAT–Lancet reference diet.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-soft">
          Historical estimates using 2011 price and income data, published in
          the January 2020 issue. The study compared the least-cost reference
          diet with average daily household income per person.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            { label: "High-income countries", value: 6.1 },
            { label: "Low-income countries", value: 89.1 },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl bg-white p-6">
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-2 font-serif text-6xl text-forest">{value}%</p>
              <p className="mt-3 text-sm text-ink-soft">
                of average per-capita household income needed for the reference
                diet
              </p>
              <div
                className="mt-5 h-4 rounded-full bg-cream-deep"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-forest"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl font-serif text-2xl text-forest">
          At least 1.58 billion people were estimated to be unable to afford
          this diet.
        </p>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
          The percentages are medians across countries in each income group,
          using each country’s mean per-capita household income. They describe
          the reference diet, and cannot be applied to your basket. Your
          selection has not been assessed for nutritional completeness or
          equivalence to that diet. The figures describe historical conditions
          and vary within income groups.
        </p>
        <p className="mt-4 text-xs leading-relaxed">
          <a
            href="https://doi.org/10.1016/S2214-109X(19)30447-4"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Hirvonen, Bai, Headey &amp; Masters (2020), The Lancet Global
            Health, 8(1), e59–e66
          </a>{" "}
          ·{" "}
          <a
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7024996/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Read the full study
          </a>
        </p>
      </section>
      <section
        className="on-dark mt-10 rounded-3xl bg-forest p-7 text-cream md:p-10"
        aria-labelledby="reflection-heading"
      >
        <h2
          id="reflection-heading"
          className="max-w-3xl font-serif text-3xl md:text-4xl"
        >
          You chose what you believed was sustainable. But what if you couldn’t
          afford those choices?
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed">
          Affordability, income inequality, transportation, and time shape what
          reaches our plates. College students facing food insecurity may have
          to weigh groceries against rent, tuition, and other essentials.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed">
          Universities and food institutions shape access through campus prices,
          meal programs, food assistance, and sourcing decisions. Sustainable
          eating depends on the systems that make choices possible.
        </p>
        <div className="mt-7 grid gap-5 border-t border-white/25 pt-6 sm:grid-cols-2">
          <p className="font-serif text-xl">
            How would knowing the prices first have changed your basket?
          </p>
          <p className="font-serif text-xl">
            What could universities do to make affordable, sustainable food more
            accessible?
          </p>
        </div>
      </section>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button onClick={onBack}>Return to shopping</Button>
        <Button variant="secondary" onClick={onPlayAgain}>
          Try a new basket
        </Button>
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
          <h3 className="mt-5 font-bold">
            Weights and factors behind each estimate
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-xs">
              <caption className="sr-only">
                Weight and emissions factor used for each product
              </caption>
              <thead>
                <tr className="border-b border-line text-ink-soft">
                  <th scope="col" className="pr-3 pb-1.5 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="pr-3 pb-1.5 font-semibold">
                    Weight used
                  </th>
                  <th scope="col" className="pb-1.5 font-semibold">
                    Factor (kg CO₂e per kg)
                  </th>
                </tr>
              </thead>
              <tbody className="align-top text-ink-soft">
                {GROCERIES.filter((g) => g.estimate).map((g) => {
                  const est = g.estimate!;
                  const factor = EMISSIONS[est.factorKey];
                  return (
                    <tr key={g.id} className="border-b border-line/60">
                      <th
                        scope="row"
                        className="py-2 pr-3 font-semibold text-charcoal"
                      >
                        {g.name}
                      </th>
                      <td className="py-2 pr-3">
                        {Math.round(est.weightKg * 1000)} g. {est.weightNote}
                      </td>
                      <td className="tnum py-2">
                        {est.match === "proxy" && (
                          <span title="closest match">≈ </span>
                        )}
                        {factor.kgCO2ePerKg} ({factor.commodity})
                        {factor.note && (
                          <span className="block">{factor.note}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  );
}
