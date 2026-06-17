import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  hideTitle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, hideTitle, type, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white transition-all duration-300 ease-out focus:border-white/30 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/5",
            hideTitle ? "py-4 placeholder:text-neutral-500" : "peer pt-6 pb-2 placeholder:text-transparent",
            className
          )}
          ref={ref}
          placeholder={hideTitle ? props.placeholder : " "} // Show actual placeholder if hideTitle is true
          {...props}
        />
        {!hideTitle && (
          <label className="pointer-events-none absolute left-4 top-4 text-neutral-500 text-sm transition-all duration-300 peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-neutral-300 peer-[&:not(:placeholder-shown)]:-translate-y-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-neutral-300">
            {props.title || props.name}
          </label>
        )}
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors duration-300 peer-focus:text-white">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
