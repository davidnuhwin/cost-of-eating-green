import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: "md" | "lg";
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 select-none " +
  "active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-deep hover:shadow-lg hover:shadow-forest/20 " +
    "disabled:bg-sage-soft disabled:text-ink-soft disabled:shadow-none",
  secondary:
    "bg-white text-forest border-2 border-forest hover:bg-sage-soft " +
    "disabled:border-line disabled:text-ink-soft disabled:bg-cream-deep",
  ghost: "text-forest hover:bg-sage-soft",
};

const sizes = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-14 px-8 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}
