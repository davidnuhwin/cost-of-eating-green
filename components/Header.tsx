import { RotateCcw, ShoppingBasket } from "lucide-react";
interface HeaderProps {
  onHome: () => void;
  onRestart?: () => void;
}
export function Header({ onHome, onRestart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-5 md:px-10">
        <button
          onClick={onHome}
          className="flex items-center gap-3 text-left text-forest"
          aria-label="The Cost of Eating Green, back to introduction"
        >
          <ShoppingBasket
            className="hidden sm:block"
            aria-hidden="true"
            size={23}
          />
          <span className="font-serif text-lg sm:text-2xl">
            The Cost of Eating Green
          </span>
        </button>
        {onRestart && (
          <button
            onClick={onRestart}
            className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-forest hover:bg-sage-soft"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Start over
          </button>
        )}
      </div>
    </header>
  );
}
