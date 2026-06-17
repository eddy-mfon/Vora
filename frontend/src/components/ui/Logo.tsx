import { Scissors } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-lg">
        <Scissors className="w-5 h-5 text-black" strokeWidth={2.5} />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_rgba(184,255,90,0.8)]" />
      </div>
      {showText && (
        <span className="font-display font-bold text-xl tracking-tight text-white">
          Cuts & Braids
        </span>
      )}
    </div>
  );
}
