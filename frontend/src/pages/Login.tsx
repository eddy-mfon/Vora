import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, CheckCircle2, User, Scissors } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useState, FormEvent } from "react";
import { api } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "provider" | null>(null);
  const { login } = useAppContext();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await api.login({ email: data["Email"] as string, password: data["Password"] as string });
      login(res.user);
      
      if (res.user.role === "provider") {
        navigate("/provider");
      } else {
        navigate("/dashboard");
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
      {/* Extra floating UI element requested */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -right-12 -top-12 hidden lg:flex items-center gap-3 bg-card-darker border border-white/5 rounded-full pl-2 pr-4 py-2 shadow-2xl z-20"
      >
        <img src="https://i.pravatar.cc/150?u=4" className="w-8 h-8 rounded-full border border-brand-green" alt="" />
        <div>
          <p className="text-xs text-white font-medium flex items-center gap-1">Sarah Palmer <CheckCircle2 className="w-3 h-3 text-brand-green fill-brand-green/20" /></p>
          <p className="text-[10px] text-neutral-500">Available at 2:00 PM</p>
        </div>
      </motion.div>

      <div className="relative rounded-3xl xs:rounded-[2.5rem] bg-card-dark p-5 xs:p-8 sm:p-10 shadow-2xl border border-white/[0.04] backdrop-blur-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
        {/* Inner subtle glow */}
        <div className="absolute inset-0 rounded-3xl xs:rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center mb-4">
                <h2 className="text-3xl font-display font-semibold mb-2">Welcome</h2>
                <p className="text-neutral-400 text-sm">How would you like to continue?</p>
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
                  <p className="text-sm text-neutral-400">Book appointments & manage schedule</p>
                </div>
              </button>

              <button 
                onClick={() => setRole("provider")}
                className="group flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-3 xs:gap-4 p-4 xs:p-6 rounded-2xl border border-white/5 bg-bg-darkest hover:border-blue-400/50 hover:bg-white/5 hover:scale-[1.01] transition-all w-full"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors shrink-0">
                  <Scissors className="w-6 h-6 text-white group-hover:bg-blue-500/10 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">Provider</h3>
                  <p className="text-sm text-neutral-400">Manage bookings & availability</p>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
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
                  {role === "student" ? "Student Login" : "Provider Login"}
                </h2>
                <p className="text-neutral-400 text-sm">
                  Welcome back. Please enter your details.
                </p>
              </div>

              {error && (
                <div className="mb-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                <Input
                  type="email"
                  name="Email"
                  title="Email Address"
                  icon={<Mail className="w-5 h-5" />}
                  autoComplete="email"
                />
                <Input
                  type="password"
                  name="Password"
                  title="Password"
                  icon={<Lock className="w-5 h-5" />}
                  autoComplete="current-password"
                />

                <div className="flex flex-wrap gap-3 items-center justify-between mt-6 text-sm py-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors">
                      <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-brand-green scale-0 transition-transform peer-checked:scale-100" />
                    </div>
                    <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">Remember Me</span>
                  </label>
                  <button type="button" className="text-neutral-400 hover:text-white transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-14 text-base font-semibold" size="lg">
                    Sign In
                  </Button>
                </div>
              </form>

              {role === "student" && (
                <>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/[0.04]" />
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">Or continue with</span>
                    <div className="flex-1 h-px bg-white/[0.04]" />
                  </div>

                  <div className="mt-6 flex flex-col xs:flex-row gap-3 xs:gap-4">
                    <Button variant="outline" className="w-full h-12 rounded-2xl gap-2 font-medium">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-2xl gap-2 font-medium">
                       <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                         <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.076 1.516-.05 2.096-.985 3.926-.985 1.832 0 2.457.985 3.974.958 1.56-.027 2.585-1.503 3.593-2.955 1.168-1.724 1.652-3.393 1.673-3.48-.035-.015-3.237-1.246-3.272-4.98-.027-3.125 2.544-4.636 2.66-4.721-1.464-2.164-3.754-2.455-4.582-2.535-1.921-.194-3.83 1.144-4.825 1.144h-.001zm3.178-3.08c.84-.997 1.408-2.389 1.253-3.816-1.21.05-2.69.805-3.553 1.821-.767.873-1.439 2.302-1.26 3.708 1.353.104 2.716-.713 3.56-1.713z"/>
                       </svg>
                      Apple
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-sm text-neutral-500"
      >
        Don't have an account?{" "}
        <Link to="/register" className="text-white hover:text-brand-green font-medium transition-colors">
          Create Account
        </Link>
      </motion.p>
    </motion.div>
  );
}
