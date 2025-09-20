import React, { useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * If true, automatically repeats children enough to fill the visible area
   */
  autoFill?: boolean;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * ARIA live region politeness
   */
  ariaLive?: "off" | "polite" | "assertive";
  /**
   * ARIA role
   */
  ariaRole?: string;
}

// Corrected Marquee Component
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  // The 'repeat' prop is no longer needed for the basic loop
  // but you could adapt the logic if you want more than one duplication
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn(
        // This is the outer container / viewport
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {/* This is the new animated container. It holds two copies of the children
        to create the seamless loop. The animation is applied here.
      */}
      <div
        className={cn(
          "flex shrink-0 [gap:var(--gap)]",
          !vertical ? "flex-row" : "flex-col",
          !vertical &&
            "animate-[marquee_var(--duration)_linear_infinite] flex-row",
          vertical &&
            "animate-[marquee-vertical_var(--duration)_linear_infinite] flex-col",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {/* First copy of the content */}
        <div
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row"
          )}
        >
          {children}
        </div>

        {/* Second copy of the content (hidden from screen readers for accessibility) */}
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
