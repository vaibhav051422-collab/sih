import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

// A small, self-contained spinner component for clarity
const LoadingSpinner = () => (
  <span
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    style={{ color: "rgba(255, 255, 255, 0.6)" }}
  />
);

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transform active:scale-95 gap-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary/90 hover:-translate-y-px focus-visible:ring-primary/50 ring-offset-background",
  secondary:
    "bg-white/10 text-white border border-white/20 shadow-md hover:bg-white/20 hover:-translate-y-px focus-visible:ring-white/40 ring-offset-background",
  ghost:
    "bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/40 ring-offset-background",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-7 py-3",
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isLoading && "cursor-wait", // Apply wait cursor when loading
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
