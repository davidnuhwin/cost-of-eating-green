import { ArrowRight } from "lucide-react";
import { STARTING_BUDGET_CENTS } from "@/data/groceries";
import { Button } from "./Button";
import { FoodArt } from "./FoodArt";

interface LandingProps {
  onStart: () => void;
}

const collage = [
  { id: "tomatoes-conventional", bg: "#f4e2d6", pos: "left-[2%] top-[6%] w-[40%]", rot: "-6deg", delay: "0ms" },
  { id: "potatoes", bg: "#ece7d6", pos: "right-[4%] top-[0%] w-[34%]", rot: "5deg", delay: "600ms" },
  { id: "tofu", bg: "#e4ebdb", pos: "left-[30%] top-[34%] w-[38%]", rot: "3deg", delay: "1200ms" },
  { id: "eggs", bg: "#efe6cf", pos: "right-[0%] top-[46%] w-[32%]", rot: "-4deg", delay: "300ms" },
  { id: "bananas", bg: "#e9e2cf", pos: "left-[3%] top-[66%] w-[28%]", rot: "-3deg", delay: "900ms" },
  { id: "split-peas", bg: "#e6ecdf", pos: "left-[40%] top-[72%] w-[28%]", rot: "6deg", delay: "1500ms" },
];

const steps = [
  { n: "1", title: "Shop", text: "Pick from 12 grocery items, each with a fixed price and package size." },
  { n: "2", title: "Stay in budget", text: "Your remaining money updates with every choice. You can’t overspend." },
  { n: "3", title: "Reveal", text: "Check out to see the estimated climate impact of what you chose." },
];

export function Landing({ onStart }: LandingProps) {
  const budget = STARTING_BUDGET_CENTS / 100;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pt-10 pb-16 md:px-10 md:pt-16 lg:px-20 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Copy */}
        <div>
          <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-1.5 text-xs font-bold tracking-wider text-forest uppercase">
            <span className="size-1.5 rounded-full bg-forest" aria-hidden="true" />
            UCSD SYN 2 · Climate, Sustainability &amp; Justice
          </p>

          <h1
            data-screen-heading
            tabIndex={-1}
            className="animate-rise font-serif text-[44px] leading-[1.02] tracking-tight text-forest sm:text-6xl lg:text-[76px]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Can You Afford to Eat Sustainably?
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-charcoal md:text-xl"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            You’re a college student with ${budget} to spend on groceries. Can you build a grocery
            basket while balancing affordability and environmental impact?
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-5"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            <Button size="lg" onClick={onStart} className="group">
              Start Shopping
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <p className="text-sm text-ink-soft">About 2–3 minutes · no sign-up</p>
          </div>
        </div>

        {/* Collage */}
        <div
          className="animate-rise relative mx-auto aspect-square w-full max-w-[400px] lg:max-w-[520px]"
          style={{ "--delay": "200ms" } as React.CSSProperties}
          aria-hidden="true"
        >
          <div className="absolute inset-[6%] rounded-full bg-sage-soft" />
          {collage.map((tile) => (
            <div
              key={tile.id}
              className={`animate-bob absolute aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-xl shadow-forest/10 ${tile.pos}`}
              style={{ "--r": tile.rot, "--delay": tile.delay } as React.CSSProperties}
            >
              <FoodArt id={tile.id} background={tile.bg} className="size-full" />
            </div>
          ))}
          <div className="absolute top-[40%] left-[-1%] z-10 grid size-[25%] -rotate-6 place-items-center rounded-full bg-forest text-cream shadow-xl ring-4 ring-cream">
            <div className="text-center leading-none">
              <p className="font-serif text-[clamp(28px,6vw,48px)]">${budget}</p>
              <p className="mt-1 text-[10px] font-bold tracking-widest uppercase sm:text-xs">budget</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <section
        aria-labelledby="how-it-works"
        className="mt-16 rounded-[32px] border border-line bg-white p-6 md:mt-24 md:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <h2 id="how-it-works" className="font-serif text-3xl text-forest md:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Choose at least one protein, one vegetable, and one staple. Stay within your budget
              and discover the environmental impact of your choices.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              There’s no single right basket. Prices in this game are illustrative classroom prices,
              not live grocery prices.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl bg-cream p-5">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-forest font-serif text-lg text-cream"
                >
                  {step.n}
                </span>
                <p className="mt-4 font-bold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
