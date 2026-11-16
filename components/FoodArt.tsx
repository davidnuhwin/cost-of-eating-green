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
  "chicken-breast": (
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
  "firm-tofu": (
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
  "organic-eggs": (
    <>
      <g>
        <circle cx="98" cy="26" r="14" fill="#fbf7ea" stroke="#a8bfa3" strokeWidth="3" />
        <path d="M91 30c0-8 6-12 14-12 0 8-4 14-12 14z" fill="#7fa37c" />
        <path d="M92 31l10-10" stroke="#fbf7ea" strokeWidth="1.8" strokeLinecap="round" />
      </g>
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
  "local-tomatoes": <Tomatoes />,
  "single-tomato": (
    <>
      <ellipse cx="60" cy="96" rx="30" ry="5" fill="#00000012" />
      <circle cx="60" cy="62" r="32" fill="#d6553d" />
      <ellipse cx="48" cy="50" rx="7" ry="11" transform="rotate(20 48 50)" fill="#ffffff" opacity="0.32" />
      <path d="M60 32l-12 7 12-1-3 10 9-8 9 8-3-10 12 1-12-7-5-9z" fill="#5f8b4f" />
    </>
  ),
  avocado: (
    <>
      <ellipse cx="60" cy="100" rx="30" ry="5" fill="#00000012" />
      <path d="M60 14c-14 0-20 16-22 30-2 12-12 18-12 34 0 14 14 22 34 22s34-8 34-22c0-16-10-22-12-34-2-14-8-30-22-30z" fill="#4d6b3c" />
      <path d="M60 22c-10 0-15 12-17 24-2 11-11 17-11 31 0 11 12 18 28 18s28-7 28-18c0-14-9-20-11-31-2-12-7-24-17-24z" fill="#b9d17a" />
      <path d="M60 30c-7 0-11 9-12 18-1 8-8 13-8 24 0 9 9 14 20 14s20-5 20-14c0-11-7-16-8-24-1-9-5-18-12-18z" fill="#dbe8a0" />
      <circle cx="60" cy="76" r="14" fill="#8a5a36" />
      <ellipse cx="55" cy="71" rx="4" ry="5" transform="rotate(30 55 71)" fill="#fff" opacity="0.3" />
    </>
  ),
  "canned-tuna": (
    <>
      <ellipse cx="60" cy="98" rx="38" ry="5" fill="#00000012" />
      <path d="M22 44v40c0 8 17 14 38 14s38-6 38-14V44z" fill="#d7dbd8" />
      <path d="M22 54h76v22H22z" fill="#3f6f94" />
      <path d="M22 54h76v4H22zM22 72h76v4H22z" fill="#2d5675" />
      <ellipse cx="60" cy="44" rx="38" ry="12" fill="#eceeed" />
      <ellipse cx="60" cy="44" rx="30" ry="8" fill="#c4c9c6" />
      <circle cx="82" cy="42" r="5" fill="none" stroke="#9aa09c" strokeWidth="2.5" />
      <path d="M34 64c6-6 14-6 20 0-6 6-14 6-20 0zm20 0l8-5v10z" fill="#f4e7d0" />
    </>
  ),
  "madras-lentils": (
    <>
      <ellipse cx="60" cy="100" rx="36" ry="5" fill="#00000012" />
      <path d="M26 24h68l6 70c0 4-3 6-6 6H26c-3 0-6-2-6-6z" fill="#d98a3d" />
      <path d="M26 24h68l-2 12H28z" fill="#c4742b" />
      <path d="M26 20h68v8H26z" fill="#e8ad63" />
      <g stroke="#fff" strokeWidth="2" strokeDasharray="2 3" opacity="0.55"><path d="M30 30h60" /></g>
      <circle cx="60" cy="64" r="24" fill="#fbf1d6" />
      <g fill="#9a5a2b">
        <ellipse cx="50" cy="60" rx="5" ry="3.5" />
        <ellipse cx="64" cy="55" rx="5" ry="3.5" />
        <ellipse cx="68" cy="68" rx="5" ry="3.5" />
        <ellipse cx="54" cy="72" rx="5" ry="3.5" />
      </g>
      <g fill="#c94a35"><circle cx="60" cy="63" r="3" /><circle cx="46" cy="68" r="2.4" /></g>
    </>
  ),
  "green-beans": (
    <>
      <ellipse cx="60" cy="100" rx="34" ry="5" fill="#00000012" />
      <path d="M26 36v52c0 6 15 10 34 10s34-4 34-10V36z" fill="#d7dbd8" />
      <path d="M26 46h68v34H26z" fill="#5f9b4a" />
      <path d="M26 46h68v4H26zM26 76h68v4H26z" fill="#477a37" />
      <ellipse cx="60" cy="36" rx="34" ry="10" fill="#eceeed" />
      <ellipse cx="60" cy="36" rx="27" ry="6.5" fill="#c4c9c6" />
      <g stroke="#a9d08a" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M38 66c6-6 10-6 16-2" />
        <path d="M54 72c6-5 12-4 18 0" />
        <path d="M70 62c4-4 8-4 12-1" />
      </g>
    </>
  ),
  ramen: (
    <>
      <ellipse cx="60" cy="100" rx="38" ry="5" fill="#00000012" />
      <path d="M22 50h76l-8 46c-1 4-4 6-8 6H38c-4 0-7-2-8-6z" fill="#e5463b" />
      <path d="M22 50h76l-1.5 8h-73z" fill="#c9352b" />
      <rect x="18" y="42" width="84" height="10" rx="5" fill="#f6efdc" />
      <g stroke="#f2c14e" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M32 42c6-10 14-10 20 0" />
        <path d="M48 42c6-12 14-12 20 0" />
        <path d="M64 42c6-10 14-10 20 0" />
      </g>
      <rect x="42" y="64" width="36" height="24" rx="5" fill="#fbf1d6" />
      <path d="M48 76h24M48 82h16" stroke="#e5463b" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  sourdough: (
    <>
      <ellipse cx="60" cy="98" rx="42" ry="5" fill="#00000012" />
      <path d="M14 72c-2-26 20-44 46-44s48 18 46 44c-1 12-10 22-46 22S15 84 14 72z" fill="#c98b4a" />
      <path d="M22 66c0-18 16-30 38-30s38 12 38 30c0 10-10 18-38 18S22 76 22 66z" fill="#dba966" />
      <g stroke="#f5e3bf" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M42 48l12 20" />
        <path d="M58 44l12 22" />
        <path d="M74 48l10 18" />
      </g>
      <g fill="#fff" opacity="0.5"><circle cx="34" cy="62" r="1.8" /><circle cx="88" cy="60" r="1.8" /><circle cx="60" cy="78" r="1.8" /></g>
    </>
  ),
  "hot-fries": (
    <>
      <ellipse cx="60" cy="102" rx="32" ry="5" fill="#00000012" />
      <g fill="#e0a03a" stroke="#b9791f" strokeWidth="1.5">
        <rect x="34" y="14" width="10" height="42" rx="4" transform="rotate(-14 39 35)" />
        <rect x="52" y="8" width="10" height="46" rx="4" transform="rotate(4 57 31)" />
        <rect x="70" y="14" width="10" height="42" rx="4" transform="rotate(16 75 35)" />
        <rect x="46" y="12" width="9" height="40" rx="4" transform="rotate(-4 50 32)" />
      </g>
      <path d="M26 46h68l-5 52c-.5 4-3 6-7 6H38c-4 0-6.500-2-7-6z" fill="#d83a2b" />
      <path d="M26 46h68l-1 10H27z" fill="#a82619" />
      <path d="M26 46h68" stroke="#f3a58f" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="60" cy="76" r="15" fill="#f8d56a" />
      <path d="M60 66c4 6 8 8 6 14-1 4-5 6-8 4-4-2-5-7-2-11 1.500-2 3-4 4-7z" fill="#e5463b" />
    </>
  ),
  "white-rice": (
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
  potato: (
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
  banana: (
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

function Tomatoes() {
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
