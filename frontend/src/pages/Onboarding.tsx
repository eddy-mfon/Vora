import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Scissors } from "lucide-react";
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
  const firstName = user?.name?.split(" ")[0] || "there";

  const studentSteps = [
    {
      icon: "👋",
      title: `Hey ${firstName}, welcome!`,
      desc: "Cuts & Braids is your campus grooming hub. No more waiting around, no more sliding into DMs. Everything lives right here.",
      tip: null,
    },
    {
      icon: "🔍",
      title: "Find your stylist",
      desc: "Browse verified barbers and hairdressers on campus. Check their ratings, specialties, and real availability — all updated live.",
      tip: "Pro tip: filter by specialty to find exactly who you need.",
    },
    {
      icon: "📅",
      title: "Pick a slot",
      desc: "Every provider has a live calendar. See open slots, pick a time that fits your class schedule, and lock it in instantly.",
      tip: "Slots go fast — book early to avoid missing out.",
    },
    {
      icon: "⚡",
      title: "Confirm & show up",
      desc: "Once booked, your appointment is confirmed immediately. No back-and-forth, no double-booking. Just show up and get fresh.",
      tip: null,
    },
    {
      icon: "🔔",
      title: "Stay in the loop",
      desc: "Check your Notifications tab for reminders and updates. Manage, reschedule, or cancel from your Bookings tab anytime.",
      tip: "You can reschedule up to 2 hours before your appointment.",
    },
  ];

  const providerSteps = [
    {
      icon: "✂️",
      title: `Welcome, ${firstName}!`,
      desc: "Your Provider dashboard is where you run everything — schedule, bookings, availability. Let's get you set up.",
      tip: null,
    },
    {
      icon: "🗓️",
      title: "Set your availability",
      desc: "Open your Provider Portal and add the time slots you're free. Students can only book times you've marked available.",
      tip: "Update your schedule regularly to keep bookings flowing.",
    },
    {
      icon: "📋",
      title: "Manage bookings",
      desc: "When a student books you, it appears in your dashboard. You can view details, confirm, or reschedule right from there.",
      tip: null,
    },
    {
      icon: "⭐",
      title: "Build your reputation",
      desc: "Every completed session can earn you a review. The higher your rating, the more you show up in student searches.",
      tip: "Consistency and punctuality = more bookings.",
    },
    {
      icon: "🚀",
      title: "You're all set!",
      desc: "Your profile is live and students can already find you. Head to your Provider Portal to add your first available slots.",
      tip: null,
    },
  ];

  const currentSteps = isProvider ? providerSteps : studentSteps;
  const totalSteps = currentSteps.length;
  const current = currentSteps[step - 1];

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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 xs:px-6 py-8">
        <div className="w-full max-w-md">
          {/* Progress bar */}
          <div className="flex items-center gap-1.5 mb-6 xs:mb-8">
            {currentSteps.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all duration-500"
                style={{
                  background: i + 1 <= step
                    ? "var(--color-brand-green)"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card-dark border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-10 shadow-2xl flex flex-col gap-5 xs:gap-7"
            >
              {/* Icon + step label */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 xs:w-16 xs:h-16 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center justify-center text-2xl xs:text-3xl shrink-0">
                  {current.icon}
                </div>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">
                  Step {step} of {totalSteps}
                </p>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 xs:gap-3">
                <h2 className="text-xl xs:text-2xl font-display font-bold tracking-tight leading-snug">
                  {current.title}
                </h2>
                <p className="text-neutral-400 text-sm xs:text-base leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Tip */}
              {current.tip && (
                <div className="bg-brand-green/8 border border-brand-green/15 rounded-xl px-4 py-3 text-xs xs:text-sm text-brand-green leading-relaxed">
                  💡 {current.tip}
                </div>
              )}

              {/* Button */}
              <Button
                onClick={handleNext}
                className="w-full h-12 xs:h-14 text-sm xs:text-base font-semibold mt-1"
              >
                {step === totalSteps ? "Let's go" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </AnimatePresence>
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
