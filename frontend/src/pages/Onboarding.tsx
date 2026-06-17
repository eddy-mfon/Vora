import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

export default function Onboarding() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const isProvider = user?.role === "provider";

  const studentSteps = [
    {
      icon: "👋",
      title: "Welcome to Cuts & Braids!",
      desc: "The fastest way to get groomed on campus. No more waiting, no more DMs.",
    },
    {
      icon: "🔍",
      title: "Browse & Find",
      desc: "Search for campus barbers and stylists, check out their verified reviews and availability.",
    },
    {
      icon: "⚡",
      title: "Book Instantly",
      desc: "Pick an available slot and show up exactly when it's your turn. It's that easy.",
    },
  ];

  const providerSteps = [
    {
      icon: "✂️",
      title: "Welcome, Provider!",
      desc: "Get ready to elevate your campus grooming business and reach more students.",
    },
    {
      icon: "📅",
      title: "Set Your Schedule",
      desc: "Use your dashboard to add free slots between classes and manage your availability.",
    },
    {
      icon: "📋",
      title: "Manage Bookings",
      desc: "Accept, decline, or reschedule appointments — all in one place.",
    },
  ];

  const currentSteps = isProvider ? providerSteps : studentSteps;
  const totalSteps = currentSteps.length;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate(isProvider ? "/provider" : "/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-bg-darkest text-white flex flex-col selection:bg-brand-green selection:text-black overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-green/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-5 xs:px-8 pt-6 xs:pt-8 flex items-center justify-between">
        <Logo />
        <button
          onClick={() => navigate(isProvider ? "/provider" : "/dashboard")}
          className="text-xs xs:text-sm text-neutral-500 hover:text-white transition-colors"
        >
          Skip
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 xs:px-6 py-10">
        {/* Step card */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card-dark border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-7 xs:p-10 shadow-2xl text-center flex flex-col items-center gap-5 xs:gap-7"
            >
              {/* Emoji icon */}
              <div className="w-16 h-16 xs:w-20 xs:h-20 bg-brand-green/10 border border-brand-green/20 rounded-2xl xs:rounded-3xl flex items-center justify-center text-3xl xs:text-4xl">
                {currentSteps[step - 1].icon}
              </div>

              <div className="flex flex-col gap-2 xs:gap-3">
                <h2 className="text-2xl xs:text-3xl font-display font-bold tracking-tight">
                  {currentSteps[step - 1].title}
                </h2>
                <p className="text-neutral-400 text-sm xs:text-base leading-relaxed max-w-xs mx-auto">
                  {currentSteps[step - 1].desc}
                </p>
              </div>

              {/* Step dots */}
              <div className="flex items-center gap-2">
                {currentSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i + 1 === step
                        ? "bg-brand-green w-6"
                        : i + 1 < step
                        ? "bg-brand-green/40 w-2"
                        : "bg-white/15 w-2"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12 xs:h-14 text-sm xs:text-base font-semibold"
              >
                {step === totalSteps ? "Get Started" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Progress text */}
          <p className="text-center text-xs text-neutral-600 mt-5">
            Step {step} of {totalSteps}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-5 xs:px-8 pb-6 xs:pb-8 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Scissors className="w-3 h-3" />
          <span>&copy; {new Date().getFullYear()} Cuts & Braids</span>
        </div>
      </footer>
    </div>
  );
}
