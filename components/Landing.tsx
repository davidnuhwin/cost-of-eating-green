import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Receipt } from "./Receipt";
import { FoodArt } from "./FoodArt";
export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-12 md:py-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="eyebrow">Food · Choice · Access</p>
          <h1
            data-screen-heading
            tabIndex={-1}
            className="mt-5 max-w-2xl font-serif text-5xl leading-[1.04] text-forest sm:text-7xl"
          >
            A greener basket.
            <br />
            <span className="italic">At what cost?</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed">
            You’re grocery shopping for the week. Choose the foods you believe
            would make up a sustainable grocery basket.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
            Choose any combination from 16 campus-market groceries. There’s no
            spending limit. Prices and estimated emissions will be revealed
            after checkout.
          </p>
          <div className="mt-8 max-w-xl rounded-xl border border-line bg-paper/70 p-5 sm:p-6">
            <p className="eyebrow">Before You Shop</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              How do you make food choices? Take a quick survey about food
              affordability and sustainability before putting your assumptions
              to the test.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdGiAHJVzmzTOw0M6eNQXjwemQrzQXvPmS9KJG15QvAvNZ7YA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full border border-forest px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sage-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              Take the Pre-Game Survey <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <Button size="lg" onClick={onStart} className="mt-4">
            Start Shopping <ArrowRight size={20} aria-hidden="true" />
          </Button>
          <p className="mt-4 text-xs text-ink-soft">
            A short classroom experience for UC San Diego SYN 2
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm pb-8 pt-4">
          <div className="absolute -inset-5 rounded-full bg-sage-soft/70" />
          <div className="relative rotate-3">
            <Receipt lines={[]} preview />
          </div>
          <FoodArt
            id="banana"
            bare
            className="absolute -bottom-5 -left-4 w-32 -rotate-12"
          />
          <FoodArt
            id="local-tomatoes"
            bare
            className="absolute -right-4 bottom-0 w-32 rotate-12"
          />
        </div>
      </div>
      <ol className="mt-16 grid gap-7 border-t border-line pt-8 sm:grid-cols-3 md:mt-24">
        {[
          [
            "Choose with intention",
            "Build a weekly basket around your own idea of sustainable eating.",
          ],
          [
            "See it come together",
            "Add up to 10 of each product. Watch your cart and receipt fill up.",
          ],
          [
            "Discover the cost",
            "Reveal the prices and climate estimates, then consider who can access those choices.",
          ],
        ].map(([title, text]) => (
          <li key={title}>
            <h2 className="font-serif text-2xl text-forest">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
