import { useLayoutEffect, useRef } from "react";
import type { CartLine } from "@/lib/game";
import { FoodArt } from "./FoodArt";

/** Animate the actual resting object in basket coordinates so scroll and resize stay aligned. */
export function CartProduct({
  line,
  index,
  count,
}: {
  line: CartLine;
  index: number;
  count: number;
}) {
  const element = useRef<HTMLDivElement>(null);
  const previous = useRef(0);
  const columns = Math.min(4, count);
  const rows = Math.ceil(count / columns);
  const row = Math.floor(index / columns);
  const column = index % columns;
  const tilt = ((index * 7) % 17) - 8;
  const width = 100 / columns;
  const height = 100 / Math.max(2, rows);

  useLayoutEffect(() => {
    const node = element.current;
    const added = line.quantity > previous.current;
    const first = previous.current === 0;
    previous.current = line.quantity;
    if (
      !node ||
      !added ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    node.getAnimations().forEach((animation) => animation.cancel());
    const distance = first ? node.offsetTop + node.offsetHeight + 25 : 12;
    // Quadratic displacement approximates constant gravitational acceleration.
    const frames: Keyframe[] = Array.from({ length: 13 }, (_, step) => {
      const t = step / 12;
      return {
        offset: t * 0.72,
        transform: `translateY(${-distance * (1 - t * t)}px) rotate(${tilt - 12 * (1 - t)}deg)`,
      };
    });
    frames.push(
      {
        offset: 0.83,
        transform: `translateY(${-Math.min(distance * 0.09, 9)}px) rotate(${tilt + 3}deg)`,
      },
      { offset: 0.94, transform: `translateY(0) rotate(${tilt - 1}deg)` },
      { offset: 1, transform: `translateY(0) rotate(${tilt}deg)` },
    );
    const animation = node.animate(frames, {
      duration: first ? 720 : 300,
      delay: first ? 200 : 0,
      fill: "backwards",
      easing: "linear",
    });
    return () => animation.cancel();
  }, [line.quantity, tilt]);

  return (
    <div
      ref={element}
      className="cart-product"
      data-cart-product={line.item.id}
      aria-label={`${line.item.name}, quantity ${line.quantity}`}
      title={`${line.item.name} ×${line.quantity}`}
      style={{
        left: `${column * width + 2 + (row % 2 ? 1 : 0)}%`,
        bottom: `${row * height + 2}%`,
        width: `${width - 5}%`,
        height: `${height - 4}%`,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <FoodArt id={line.item.id} bare className="size-full" />
      {line.quantity > 1 && (
        <span className="cart-badge">×{line.quantity}</span>
      )}
    </div>
  );
}
