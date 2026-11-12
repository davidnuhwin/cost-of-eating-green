import type { ReactNode } from "react";

/**
 * Hand-built flat SVG illustrations, one per product id.
 * Using inline SVG means no image requests that could fail on a phone.
 */

const art: Record<string, ReactNode> = {
  "ground-beef": (
    <>
      <ellipse cx="60" cy="86" rx="42" ry="9" fill="#d9d2bd" />
      <rect x="18" y="62" width="84" height="24" rx="10" fill="#f3efe2" stroke="#d9d2bd" strokeWidth="2" />
      <path d="M26 64c2-20 18-30 34-30s32 10 34 30c-10 6-58 6-68 0z" fill="#b5503c" />
      <path d="M32 62c4-14 16-22 28-22s24 8 28 22c-8 4-48 4-56 0z" fill="#c9644d" />
      <g fill="#8f3a2b">
        <circle cx="46" cy="54" r="2.5" />
        <circle cx="60" cy="48" r="2.5" />
        <circle cx="72" cy="55" r="2.5" />
        <circle cx="54" cy="60" r="2" />
        <circle cx="66" cy="61" r="2" />
        <circle cx="80" cy="60" r="2" />
        <circle cx="40" cy="60" r="2" />
      </g>
      <path d="M44 46c6-6 14-8 22-6" stroke="#e08a72" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  chicken: (
    <>
      <ellipse cx="60" cy="98" rx="30" ry="5" fill="#00000012" />
      <path d="M78 30c14 6 20 24 8 38-8 10-22 14-32 10-10-4-14-14-8-24 6-10 14-12 20-20 4-5 8-7 12-4z" fill="#e5a35d" />
      <path d="M74 36c8 4 12 16 4 26-6 8-16 10-22 8" stroke="#c9843f" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="30" y="68" width="30" height="8" rx="4" transform="rotate(-38 45 72)" fill="#f6efdc" />
      <circle cx="31" cy="82" r="7" fill="#f6efdc" />
      <circle cx="24" cy="76" r="6" fill="#f6efdc" />
      <path d="M62 40c4-2 8 0 10 4" stroke="#f4c78d" strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  tofu: (
    <>
      <ellipse cx="60" cy="94" rx="38" ry="6" fill="#00000012" />
      <path d="M22 58l38-18 38 18-38 20z" fill="#fbf6e6" />
      <path d="M22 58v20l38 20V78z" fill="#efe6cb" />
      <path d="M98 58v20L60 98V78z" fill="#e2d7b7" />
      <g fill="#e0d4b0">
        <circle cx="46" cy="56" r="2" />
        <circle cx="62" cy="52" r="2.4" />
        <circle cx="76" cy="60" r="2" />
        <circle cx="58" cy="64" r="1.8" />
        <circle cx="38" cy="62" r="1.6" />
      </g>
      <path d="M86 28c10-2 16 4 16 4s-4 8-14 8c-8 0-10-6-2-12z" fill="#7fa37c" />
      <path d="M88 36c4-3 8-4 12-4" stroke="#5f865c" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  eggs: (
    <>
      <path d="M12 66h96l-8 26H20z" fill="#cdb99a" />
      <path d="M12 66h96l-3 10H15z" fill="#bba685" />
      <g>
        <ellipse cx="36" cy="54" rx="15" ry="19" fill="#fbf4e4" />
        <ellipse cx="60" cy="54" rx="15" ry="19" fill="#e9c9a0" />
        <ellipse cx="84" cy="54" rx="15" ry="19" fill="#fbf4e4" />
      </g>
      <g fill="#ffffff" opacity="0.7">
        <ellipse cx="30" cy="46" rx="4" ry="7" />
        <ellipse cx="54" cy="46" rx="4" ry="7" />
        <ellipse cx="78" cy="46" rx="4" ry="7" />
      </g>
      <path d="M18 70h84v6H18z" fill="#cdb99a" />
    </>
  ),
  cheese: (
    <>
      <ellipse cx="60" cy="96" rx="40" ry="6" fill="#00000012" />
      <path d="M16 60L88 36c6-2 12 2 14 8l2 22z" fill="#f4c64f" />
      <path d="M16 60h88v30c0 4-3 6-6 6H22c-3 0-6-2-6-6z" fill="#e8b034" />
      <path d="M16 60l72-24" stroke="#f9da7d" strokeWidth="3" strokeLinecap="round" />
      <g fill="#cf9520">
        <ellipse cx="38" cy="76" rx="7" ry="5" />
        <ellipse cx="66" cy="82" rx="5" ry="4" />
        <ellipse cx="86" cy="74" rx="6" ry="5" />
      </g>
      <g fill="#d9a22a">
        <circle cx="52" cy="50" r="3" />
        <circle cx="78" cy="46" r="2.4" />
      </g>
    </>
  ),
  "split-peas": (
    <>
      <path d="M24 38h72l6 56c0 4-3 6-6 6H24c-3 0-6-2-6-6z" fill="#f1ead4" stroke="#d9d0b2" strokeWidth="2" />
      <path d="M22 38h76l-4-10H26z" fill="#e3dabb" />
      <g fill="#8fb174">
        <circle cx="42" cy="60" r="7" />
        <circle cx="60" cy="56" r="7" />
        <circle cx="78" cy="60" r="7" />
        <circle cx="50" cy="74" r="7" />
        <circle cx="70" cy="74" r="7" />
        <circle cx="60" cy="88" r="7" />
        <circle cx="38" cy="82" r="6" />
        <circle cx="82" cy="82" r="6" />
      </g>
      <g fill="#b9d29f">
        <circle cx="40" cy="57" r="2.2" />
        <circle cx="58" cy="53" r="2.2" />
        <circle cx="76" cy="57" r="2.2" />
        <circle cx="48" cy="71" r="2.2" />
        <circle cx="68" cy="71" r="2.2" />
        <circle cx="58" cy="85" r="2.2" />
      </g>
    </>
  ),
  nuts: (
    <>
      <ellipse cx="60" cy="96" rx="40" ry="6" fill="#00000012" />
      <g>
        <path d="M24 74c-4-14 4-28 14-26 10 2 12 18 6 28-4 6-18 8-20-2z" fill="#b98355" />
        <path d="M50 66c-3-16 6-30 17-28 11 2 12 20 5 31-5 8-19 8-22-3z" fill="#c8915f" />
        <path d="M78 76c-2-14 6-26 16-24 10 2 10 18 4 28-5 8-18 8-20-4z" fill="#a8744a" />
        <path d="M40 92c-6-10-2-22 8-22 10 0 14 12 8 22-4 6-12 6-16 0z" fill="#d2a06c" />
        <path d="M68 94c-5-10-1-20 8-20 9 0 12 10 7 19-4 6-11 7-15 1z" fill="#b98355" />
      </g>
      <g stroke="#8f5f38" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M34 54c2 6 3 12 3 18" />
        <path d="M62 46c2 6 3 12 2 20" />
        <path d="M90 58c1 6 1 12 0 18" />
        <path d="M48 76c1 4 1 8 0 12" />
      </g>
    </>
  ),
  "tomatoes-conventional": <Tomatoes />,
  "tomatoes-organic": <Tomatoes organic />,
  rice: (
    <>
      <ellipse cx="60" cy="98" rx="34" ry="5" fill="#00000012" />
      <path d="M18 62h84c0 22-14 36-42 36S18 84 18 62z" fill="#d2874f" />
      <path d="M18 62h84c0 4-1 8-3 12H21c-2-4-3-8-3-12z" fill="#bd7440" />
      <path d="M26 62c2-22 16-34 34-34s32 12 34 34z" fill="#fffdf6" />
      <g stroke="#e4ddc7" strokeWidth="2.4" strokeLinecap="round">
        <path d="M42 56l4-4" />
        <path d="M54 48l4-4" />
        <path d="M68 52l-4-4" />
        <path d="M76 58l-4-3" />
        <path d="M50 60l4-3" />
        <path d="M62 60l4-3" />
        <path d="M36 62l4-3" />
        <path d="M84 62l-4-3" />
      </g>
      <path d="M82 34l18-14" stroke="#9a6a3a" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 38l18-14" stroke="#b07c46" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  potatoes: (
    <>
      <ellipse cx="60" cy="96" rx="40" ry="6" fill="#00000012" />
      <path d="M18 66c-2-16 12-28 28-26 12 2 18 12 14 26-4 14-20 22-32 16-6-3-9-8-10-16z" fill="#c9a06b" />
      <path d="M58 58c2-14 16-22 30-18 12 4 18 18 12 30-6 12-22 16-32 8-6-4-11-12-10-20z" fill="#b98c55" />
      <path d="M34 92c-6-8-2-20 10-22 12-2 24 4 24 14 0 10-14 14-26 12-3 0-6-1-8-4z" fill="#d1ac78" />
      <g fill="#8f6a3a">
        <circle cx="38" cy="58" r="2.4" />
        <circle cx="50" cy="66" r="2" />
        <circle cx="78" cy="52" r="2.4" />
        <circle cx="90" cy="64" r="2" />
        <circle cx="52" cy="86" r="2.2" />
        <circle cx="62" cy="80" r="1.8" />
      </g>
    </>
  ),
  bananas: (
    <>
      <ellipse cx="60" cy="98" rx="36" ry="5" fill="#00000012" />
      <path d="M26 30c-4 34 10 62 52 62 14 0 24-6 28-14-26 6-56-4-60-40-1-4-2-8-4-10z" fill="#f2cd45" />
      <path d="M40 28c-4 30 10 54 44 56 8 0 14-2 18-4-24 2-48-12-52-44-2-4-6-6-10-8z" fill="#f8de6b" />
      <path d="M26 30c-2-8 0-14 4-16l6 2c-2 4-4 8-4 14z" fill="#7b6a3a" />
      <path d="M104 78c4-2 6-5 6-8l-6 2z" fill="#7b6a3a" />
      <path d="M32 40c2 24 14 42 36 48" stroke="#d9b02e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
};

function Tomatoes({ organic = false }: { organic?: boolean }) {
  return (
    <>
      <ellipse cx="60" cy="98" rx="38" ry="5" fill="#00000012" />
      <circle cx="42" cy="68" r="24" fill="#d6553d" />
      <circle cx="80" cy="72" r="20" fill="#e0654a" />
      <circle cx="62" cy="52" r="19" fill="#c94a35" />
      <g fill="#ffffff" opacity="0.35">
        <ellipse cx="33" cy="60" rx="5" ry="8" transform="rotate(20 33 60)" />
        <ellipse cx="74" cy="65" rx="4" ry="6" transform="rotate(20 74 65)" />
        <ellipse cx="55" cy="44" rx="4" ry="6" transform="rotate(20 55 44)" />
      </g>
      <g fill="#5f8b4f">
        <path d="M42 46l-8 5 8-1-2 8 6-6 6 6-2-8 8 1-8-5-4-6z" />
        <path d="M62 33l-6 4 6 0-1 6 5-5 5 5-1-6 6 0-6-4-3-5z" />
      </g>
      {organic && (
        <g>
          <circle cx="96" cy="26" r="14" fill="#fbf7ea" stroke="#a8bfa3" strokeWidth="3" />
          <path d="M89 30c0-8 6-12 14-12 0 8-4 14-12 14z" fill="#7fa37c" />
          <path d="M90 31l10-10" stroke="#fbf7ea" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
    </>
  );
}

const TILE_BG = ["#efe6cf", "#e4ebdb", "#f4e2d6", "#ece7d6", "#e9e2cf", "#e6ecdf"];

export function tileBackground(index: number): string {
  return TILE_BG[index % TILE_BG.length];
}

interface FoodArtProps {
  id: string;
  className?: string;
  /** Hide the tile background (for use inside other shapes) */
  bare?: boolean;
  background?: string;
}

export function FoodArt({ id, className = "", bare = false, background }: FoodArtProps) {
  const drawing = art[id];
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={bare ? undefined : { background: background ?? "#efe6cf" }}
      aria-hidden="true"
      focusable="false"
    >
      {drawing ?? <circle cx="60" cy="60" r="30" fill="#a8bfa3" />}
    </svg>
  );
}
