interface FoodArtProps {
  id: string;
  className?: string;
  bare?: boolean;
  background?: string;
}

/** Keep the shared SVG viewport so shelf clones and cart motion use identical geometry.
 * The original transparent PNG retains its proportions within that viewport.
 * Accessible names are supplied by the surrounding product controls or cart entries.
 */
export function FoodArt({
  id,
  className = "",
  bare = false,
  background,
}: FoodArtProps) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      style={bare ? undefined : { background: background ?? "#efe6cf" }}
      aria-hidden="true"
      focusable="false"
    >
      <image
        href={`/images/groceries/${id}.png`}
        width="640"
        height="640"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
