import { useState, FormEvent } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pin === "0000") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid mock PIN. Use 0000");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card-dark p-10 rounded-[3rem] border border-white/5 shadow-2xl max-w-sm w-full"
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-brand-green">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold mb-2">Admin Access</h1>
          <p className="text-neutral-400 text-sm mb-8">Enter the master PIN to access the dashboard. (Hint: 0000)</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input 
               type="password" 
               name="PIN" 
               title="PIN Code" 
               placeholder="Enter 0000"
               value={pin}
               onChange={(e) => setPin(e.target.value)}
            />
            <Button className="w-full h-12">Authenticate</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
       <header className="border-b border-white/10 pb-8 flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Central Admin</h1>
            <p className="text-neutral-400">Manage all students, providers, and system settings.</p>
         </div>
         <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
       </header>

       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
           {/* Simple stat cards */}
          {[
            { label: "Total Students", value: "1,248" },
            { label: "Active Providers", value: "24" },
            { label: "Today's Bookings", value: "156" },
            { label: "Total Appts", value: "12k+" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-[2rem] bg-card-dark border border-white/5">
              <p className="text-3xl font-display font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-neutral-400">{stat.label}</p>
            </div>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-8 rounded-[2.5rem] bg-card-dark border border-white/5">
            <h2 className="text-xl font-display font-semibold mb-6">Provider Applications</h2>
            <div className="flex flex-col gap-4">
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                 <div>
                   <p className="font-semibold text-lg">Michael B.</p>
                   <p className="text-sm text-neutral-400">Barber • Submitted 2h ago</p>
                 </div>
                 <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="rounded-xl">Reject</Button>
                   <Button size="sm" className="rounded-xl bg-brand-green text-black hover:bg-brand-green/90">Approve</Button>
                 </div>
              </div>
            </div>
         </div>

         <div className="p-8 rounded-[2.5rem] bg-card-dark border border-white/5">
            <h2 className="text-xl font-display font-semibold mb-6">Recent System Activity</h2>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex gap-4 items-start">
                 <div className="w-2 h-2 rounded-full bg-neutral-600 mt-1.5 shrink-0" />
                 <p className="text-neutral-400 leading-relaxed"><span className="text-white font-medium">System</span> auto-cancelled 3 expired pending bookings.</p>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 shrink-0" />
                 <p className="text-neutral-400 leading-relaxed"><span className="text-white font-medium">Admin</span> approved new provider Aisha T.</p>
              </div>
            </div>
         </div>
       </div>
    </div>
  );
}
