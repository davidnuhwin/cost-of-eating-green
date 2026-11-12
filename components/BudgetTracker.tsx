import { formatMoney } from "@/lib/game";

interface BudgetTrackerProps {
  budgetCents: number;
  spentCents: number;
  compact?: boolean;
}

export function BudgetTracker({ budgetCents, spentCents, compact = false }: BudgetTrackerProps) {
  const remaining = budgetCents - spentCents;
  const pct = Math.min(100, Math.max(0, (spentCents / budgetCents) * 100));
  const tight = remaining < 300;

  return (
    <div>
      {!compact && (
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wider text-ink-soft uppercase">Remaining</p>
            <p
              className={`tnum font-serif text-5xl leading-none transition-colors duration-300 ${
                tight ? "text-terracotta-deep" : "text-forest"
              }`}
            >
              {formatMoney(remaining)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold tracking-wider text-ink-soft uppercase">Spent</p>
            <p className="tnum text-xl font-bold">{formatMoney(spentCents)}</p>
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-label="Budget spent"
        aria-valuemin={0}
        aria-valuemax={budgetCents / 100}
        aria-valuenow={spentCents / 100}
        aria-valuetext={`${formatMoney(spentCents)} spent of ${formatMoney(budgetCents)}`}
        className={`overflow-hidden rounded-full bg-cream-deep ${compact ? "h-2" : "h-3"}`}
      >
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-500 ease-out ${
            tight ? "bg-terracotta" : "bg-forest"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {!compact && (
        <div className="tnum mt-2 flex justify-between text-xs text-ink-soft">
          <span>$0</span>
          <span>{formatMoney(budgetCents)} starting budget</span>
        </div>
      )}
    </div>
  );
}
