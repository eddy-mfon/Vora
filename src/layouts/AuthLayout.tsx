import { motion } from "motion/react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { Scissors, Sparkles, Fan, Armchair } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-bg-darkest overflow-hidden selection:bg-brand-green selection:text-black">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-green/5 blur-[150px] rounded-full"
        />
        
        {/* Glowing Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-green/40 rounded-full blur-[2px]"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Soft glowing mesh gradient overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Left Branding Panel (Desktop Only) */}
      <div className="relative hidden lg:flex flex-col flex-1 w-full max-w-2xl px-16 py-20 z-10 border-r border-border-glass bg-bg-dark/50 backdrop-blur-3xl">
        <Logo className="mb-auto" />

        <div className="flex-1 flex flex-col justify-center max-w-lg mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-display font-semibold leading-[1.1] tracking-tight mb-8"
          >
            Skip the queue.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
              Book your look.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-neutral-400 leading-relaxed font-light"
          >
            Check availability, choose your favorite barber or stylist, and
            arrive exactly when it's your turn.
          </motion.p>
        </div>

        {/* Floating Line Art Illustrations */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block">
            <motion.div 
               animate={{ y: ["-15px", "15px", "-15px"], rotate: [-5, 5, -5] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }} 
               className="absolute top-[15%] right-[15%] text-white"
            >
              <Scissors strokeWidth={1} className="w-24 h-24" />
            </motion.div>
            <motion.div 
              animate={{ y: ["15px", "-15px", "15px"], rotate: [10, -10, 10] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
              className="absolute top-[45%] right-[30%] text-white"
            >
              <Sparkles strokeWidth={1} className="w-20 h-20" />
            </motion.div>
            <motion.div 
               animate={{ y: ["-10px", "10px", "-10px"], rotate: [0, 5, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
               className="absolute bottom-[20%] right-[15%] text-white"
            >
              <Fan strokeWidth={1} className="w-28 h-28" />
            </motion.div>
             <motion.div 
               animate={{ y: ["10px", "-10px", "10px"], rotate: [-5, 0, -5] }}
               transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }} 
               className="absolute top-[30%] right-[5%] text-white opacity-50"
            >
              <Armchair strokeWidth={1} className="w-16 h-16" />
            </motion.div>
        </div>

        <div className="mt-auto pt-10 border-t border-border-glass/50 flex items-center justify-between text-sm text-neutral-500">
          <span>&copy; {new Date().getFullYear()} Cuts & Braids</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Authentication Panel */}
      <div className="relative flex flex-col items-center justify-center flex-1 w-full p-4 sm:p-8 lg:p-12 z-10 bg-bg-darkest">
        <div className="w-full max-w-md lg:mt-0 flex flex-col items-center">
            {/* Show logo only on mobile */}
            <div className="lg:hidden mb-12 self-start pl-2">
                <Logo />
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
}
