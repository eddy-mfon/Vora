import { Outlet, Link, useLocation } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Bell } from "lucide-react";

export default function MainLayout() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Barbers", path: "/barbers" },
    { label: "Hairdressers", path: "/hairdressers" },
  ];

  return (
    <div className="min-h-screen bg-bg-darkest text-white selection:bg-brand-green selection:text-black">
      {/* Top Floating Navigation */}
      <div className="fixed top-3 xs:top-6 left-0 w-full z-50 flex justify-center px-3 xs:px-4 pointer-events-none">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between px-2 xs:px-3 md:px-6 py-2 xs:py-3 bg-card-dark/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-6xl"
        >
          {/* Logo Section */}
          <Link to="/dashboard" className="hidden sm:block cursor-pointer">
            <Logo showText={false} className="scale-90" />
          </Link>
          <Link to="/dashboard" className="sm:hidden cursor-pointer shrink-0">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-display font-bold text-base">C</span>
             </div>
          </Link>

          {/* Primary Navigation */}
          <div className="flex items-center gap-0.5 xs:gap-1 bg-black/40 p-0.5 xs:p-1 rounded-full border border-white/5 mx-1 xs:mx-2 overflow-x-auto no-scrollbar">
            {navItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-2.5 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-colors whitespace-nowrap",
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 xs:gap-3 shrink-0">
            <Link to="/notifications" className="relative p-2 xs:p-2.5 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full border border-white/5 hover:border-white/20">
              <Bell className="w-3.5 h-3.5 xs:w-4 h-4" />
              <span className="absolute top-1 xs:top-1.5 right-1.5 xs:right-2 w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-brand-green border-[2px] border-card-dark" />
            </Link>
            <Link to="/profile" className="w-8 h-8 xs:w-9 h-9 rounded-full border border-white/10 hover:border-brand-green transition-colors overflow-hidden shrink-0">
               <img src="https://i.pravatar.cc/150?u=current_user" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* Main Content Area */}
      <main className="pt-24 xs:pt-32 pb-20 xs:pb-24 px-3 xs:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
             <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
