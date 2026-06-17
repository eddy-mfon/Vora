import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-green text-black hover:bg-brand-green-hover hover:scale-[1.02] shadow-[0_0_20px_rgba(184,255,90,0.15)] hover:shadow-[0_0_30px_rgba(184,255,90,0.3)]":
              variant === "primary",
            "bg-white/10 text-white hover:bg-white/20 border border-white/5": variant === "secondary",
            "border border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20": variant === "outline",
            "hover:bg-white/10 text-white hover:text-white": variant === "ghost",
            "h-12 px-6 py-3": size === "default",
            "h-9 rounded-xl px-4": size === "sm",
            "h-14 rounded-2xl px-10 text-base": size === "lg",
            "h-12 w-12": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
