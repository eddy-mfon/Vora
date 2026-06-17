import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, IdCard, Scissors } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useState, FormEvent } from "react";
import { api } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function Register() {
  const [role, setRole] = useState<"student" | "provider" | null>(null);
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const userData = {
        id: Math.random().toString(36).substring(7),
        name: data["Full Name"],
        email: data["Email Address"],
        password: data["Password"],
        role: role,
        studentId: data["Student ID"] || null,
      };

      const res = await api.register(userData);
      login(res.user);

      // We should route to onboarding after successful registration
      navigate("/onboarding");
      
      // If it's a provider, we also create the provider record
      if (role === "provider") {
         await api.createProvider({
           id: Math.random().toString(36).substring(7),
           userId: userData.id,
           name: userData.name,
           specialty: data["Specialty"],
           type: (data["Service Type"] as string).toLowerCase(),
           image: "https://i.pravatar.cc/150",
           available: true,
           nextSlot: "Today, 12:00 PM",
           rating: 0,
           reviews: 0,
           bio: "New provider on campus."
         });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative max-w-lg mx-auto"
    >
      <div className="relative rounded-3xl xs:rounded-[2.5rem] bg-card-dark p-5 xs:p-8 sm:p-10 shadow-2xl border border-white/[0.04] backdrop-blur-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
        <div className="absolute inset-0 rounded-3xl xs:rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="register-role"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center mb-4">
                <h2 className="text-3xl font-display font-semibold mb-2">Create Account</h2>
                <p className="text-neutral-400 text-sm">Join as a student or a service provider.</p>
              </div>

              <button 
                onClick={() => setRole("student")}
                className="group flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-3 xs:gap-4 p-4 xs:p-6 rounded-2xl border border-white/5 bg-bg-darkest hover:border-brand-green/50 hover:bg-white/5 hover:scale-[1.01] transition-all w-full"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-green/10 transition-colors shrink-0">
                  <User className="w-6 h-6 text-white group-hover:text-brand-green transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">Student</h3>
                  <p className="text-sm text-neutral-400">Book campus barbers & stylists</p>
                </div>
              </button>

              <button 
                onClick={() => setRole("provider")}
                className="group flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-3 xs:gap-4 p-4 xs:p-6 rounded-2xl border border-white/5 bg-bg-darkest hover:border-blue-400/50 hover:bg-white/5 hover:scale-[1.01] transition-all w-full"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors shrink-0">
                  <Scissors className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">Provider</h3>
                  <p className="text-sm text-neutral-400">Offer your services & manage schedule</p>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setRole(null)}
                className="text-sm text-neutral-500 hover:text-white mb-6 transition-colors flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-3xl font-display font-semibold mb-2">
                  Join as {role === "student" ? "Student" : "Provider"}
                </h2>
                <p className="text-neutral-400 text-sm">
                  {role === "student" 
                    ? "Reserve your favorite barber or stylist in seconds." 
                    : "Set up your profile and start receiving bookings."}
                </p>
              </div>

              {error && (
                <div className="mb-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleRegister}>
                <Input
                  type="text"
                  name="Full Name"
                  title="Full Name"
                  icon={<User className="w-5 h-5" />}
                  autoComplete="name"
                />

                {role === "student" ? (
                  <Input
                    type="text"
                    name="Student ID"
                    title="Student ID"
                    icon={<IdCard className="w-5 h-5" />}
                  />
                ) : (
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                    <Input
                      type="text"
                      name="Service Type"
                      title="Service Type"
                      placeholder="e.g. Barber"
                    />
                    <Input
                      type="text"
                      name="Specialty"
                      title="Specialty"
                      placeholder="e.g. Fades"
                    />
                  </div>
                )}

                <Input
                  type="email"
                  name="Email Address"
                  title="Email Address"
                  icon={<Mail className="w-5 h-5" />}
                  autoComplete="email"
                />

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                  <Input
                    type="password"
                    name="Password"
                    title="Password"
                    icon={<Lock className="w-5 h-5" />}
                    autoComplete="new-password"
                  />
                  <Input
                    type="password"
                    name="Confirm Password"
                    title="Confirm Password"
                    autoComplete="new-password"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full h-14 text-base font-semibold" size="lg">
                    Create Account
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center text-sm text-neutral-500"
      >
        Already have an account?{" "}
        <Link to="/login" className="text-white hover:text-brand-green font-medium transition-colors">
          Sign In
        </Link>
      </motion.p>
    </motion.div>
  );
}
