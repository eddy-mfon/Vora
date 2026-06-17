import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

export default function Onboarding() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const isProvider = user?.role === "provider";

  const studentSteps = [
    { title: "Welcome to Cuts & Braids!", desc: "The fastest way to get groomed on campus." },
    { title: "Browse & Find", desc: "Search for campus barbers and stylists, check out their verified reviews." },
    { title: "Book Instantly", desc: "No more DMs. Pick an available slot and show up. It's that easy." }
  ];

  const providerSteps = [
    { title: "Welcome Provider!", desc: "Get ready to elevate your campus grooming business." },
    { title: "Set Your Schedule", desc: "Use your dashboard to add free slots between classes." },
    { title: "Manage Bookings", desc: "Accept, decline, or reschedule appointments all in one place." }
  ];

  const currentSteps = isProvider ? providerSteps : studentSteps;

  const handleNext = () => {
    if (step < currentSteps.length) {
      setStep(step + 1);
    } else {
      navigate(isProvider ? "/provider" : "/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4 text-center">
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card-dark p-8 xs:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl w-full flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div>
          <h2 className="text-2xl xs:text-3xl font-display font-bold mb-3">
            {currentSteps[step - 1].title}
          </h2>
          <p className="text-neutral-400 text-sm xs:text-base leading-relaxed">
            {currentSteps[step - 1].desc}
          </p>
        </div>

        <div className="flex gap-2 my-2">
          {currentSteps.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i + 1 === step ? "bg-brand-green w-6" : "bg-white/20"}`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="w-full h-14 text-base font-semibold">
          {step === currentSteps.length ? "Get Started" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <button 
          onClick={() => navigate(isProvider ? "/provider" : "/dashboard")}
          className="text-sm text-neutral-500 hover:text-white transition-colors mt-2"
        >
          Skip Onboarding
        </button>
      </motion.div>
    </div>
  );
}
