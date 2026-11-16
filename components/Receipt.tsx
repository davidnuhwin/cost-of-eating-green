import { type CartLine, itemCount, sumCents, formatMoney } from "@/lib/game";
interface Props {
  lines: CartLine[];
  finalized?: boolean;
  preview?: boolean;
}
export function Receipt({ lines, finalized = false, preview = false }: Props) {
  return (
    <section
      className={`receipt ${finalized ? "receipt-final" : ""}`}
      aria-label={finalized ? "Final grocery receipt" : "Live grocery receipt"}
    >
      <div className="receipt-brand">
        The Cost of
        <br />
        Eating Green
      </div>
      <p className="receipt-kicker">UC SAN DIEGO · CAMPUS MARKET</p>
      <div className="receipt-rule" />
      <p className="text-center text-xs tracking-[.12em]">
        YOUR WEEKLY GROCERIES
      </p>
      {preview ? (
        <p className="py-9 text-center text-sm leading-loose">
          Your choices go here.
          <br />
          Their cost comes later.
        </p>
      ) : lines.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-soft">
          Your receipt is waiting.
          <br />
          Add a little of what you believe in.
        </p>
      ) : (
        <ul className="my-5 space-y-3">
          {lines.map(({ item, quantity }) => (
            <li key={item.id} className="receipt-line">
              <div className="flex items-start gap-2">
                <span className="w-7 shrink-0">{quantity}×</span>
                <span className="min-w-0 flex-1 uppercase">{item.name}</span>
                {finalized && (
                  <span className="shrink-0">
                    {formatMoney(item.priceCents * quantity)}
                  </span>
                )}
              </div>
              {finalized && (
                <p className="mt-1 pl-9 text-xs text-ink-soft">
                  {formatMoney(item.priceCents)} each
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="receipt-rule" />
      {!preview && (
        <p className="flex justify-between text-sm">
          <span>ITEMS</span>
          <span>{itemCount(lines)}</span>
        </p>
      )}
      {finalized ? (
        <p className="mt-4 flex items-baseline justify-between gap-2 text-xl font-bold">
          <span>TOTAL</span>
          <span>{formatMoney(sumCents(lines))}</span>
        </p>
      ) : (
        <p className="mt-4 text-center text-xs leading-relaxed">
          TOTAL
          <br />
          <span className="font-bold tracking-wide">REVEALED AT CHECKOUT</span>
        </p>
      )}
      <div className="receipt-barcode" aria-hidden="true" />
      <p className="text-center text-[10px] tracking-widest">
        {finalized
          ? "KEEP THIS RECEIPT. KEEP ASKING QUESTIONS."
          : "CHOICES FIRST. COSTS LATER."}
      </p>
    </section>
  );
}
