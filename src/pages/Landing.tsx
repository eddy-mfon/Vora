import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-darkest text-white selection:bg-brand-green selection:text-black">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Logo />
        </div>
        <div className="pointer-events-auto flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-brand-green transition-colors hidden sm:block">Sign In</Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-32">
        {/* HERO SECTION */}
        <section className="relative bg-brand-green text-black rounded-[3rem] p-12 lg:p-20 overflow-hidden flex items-center min-h-[70vh]">
          <div className="relative z-10 max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-8"
            >
              Your favorite look,<br />booked in seconds.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl sm:text-2xl font-medium opacity-80 mb-12 max-w-xl"
            >
              Check availability, reserve appointments, and skip the waiting line on campus.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/register">
                 <Button className="bg-black text-white hover:bg-black/80 hover:scale-100 shadow-none h-16 rounded-3xl px-8 text-lg">Book Appointment</Button>
              </Link>
              <Link to="/dashboard">
                 <Button variant="ghost" className="text-black hover:bg-black/10 h-16 rounded-3xl px-8 text-lg font-semibold">View Schedules</Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 opacity-10 hidden lg:block"
          >
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M50 0L52.887 47.113L100 50L52.887 52.887L50 100L47.113 52.887L0 50L47.113 47.113L50 0Z" fill="currentColor"/>
             </svg>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: "Check Availability", desc: "Browse real-time schedules of campus barbers and stylists." },
             { title: "Book a Slot", desc: "Choose a free time that perfectly fits your classes." },
             { title: "Arrive on Time", desc: "Show up exactly when it's your turn. Avoid the crowd." }
           ].map((item, i) => (
             <div key={i} className="bg-card-dark p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-brand-green font-display font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-2 opacity-50">
             <Logo showText={false} className="scale-75 origin-left" />
             <span className="text-sm font-semibold tracking-widest uppercase">Cuts & Braids</span>
           </div>
           <div className="flex items-center gap-8 text-sm font-medium">
             <Link to="/admin" className="text-neutral-500 hover:text-brand-green transition-colors flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-brand-green/50" /> Admin Portal
             </Link>
             <p className="text-neutral-600">© 2024</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
