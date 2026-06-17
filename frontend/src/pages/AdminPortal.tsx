import { useState, FormEvent } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock } from "lucide-react";
import { motion } from "motion/react";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card-dark p-6 xs:p-10 rounded-[2rem] xs:rounded-[3rem] border border-white/5 shadow-2xl max-w-sm w-full"
        >
          <div className="w-11 h-11 xs:w-12 xs:h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-5 xs:mb-6 text-brand-green">
            <Lock className="w-5 h-5 xs:w-6 xs:h-6" />
          </div>
          <h1 className="text-xl xs:text-2xl font-display font-semibold mb-2">Admin Access</h1>
          <p className="text-neutral-400 text-xs xs:text-sm mb-6 xs:mb-8">
            Enter the master PIN to access the dashboard. (Hint: 0000)
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="password"
              name="PIN"
              title="PIN Code"
              placeholder="Enter 0000"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <Button className="w-full h-11 xs:h-12">Authenticate</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 xs:gap-10">
      {/* Header */}
      <header className="border-b border-white/10 pb-5 xs:pb-8 flex flex-col xs:flex-row xs:justify-between xs:items-end gap-3 xs:gap-6">
        <div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-display font-medium tracking-tight mb-1 xs:mb-2">
            Central Admin
          </h1>
          <p className="text-neutral-400 text-sm xs:text-base">
            Manage all students, providers, and system settings.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAuthenticated(false)}
          className="self-start xs:self-auto shrink-0"
        >
          Logout
        </Button>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4">
        {[
          { label: "Total Students", value: "1,248" },
          { label: "Active Providers", value: "24" },
          { label: "Today's Bookings", value: "156" },
          { label: "Total Appts", value: "12k+" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-4 xs:p-6 rounded-2xl xs:rounded-[2rem] bg-card-dark border border-white/5 hover:scale-[1.02] transition-transform duration-300"
          >
            <p className="text-2xl xs:text-3xl font-display font-bold mb-1 xs:mb-2">{stat.value}</p>
            <p className="text-xs xs:text-sm text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8">
        {/* Provider Applications */}
        <div className="p-5 xs:p-8 rounded-[2rem] xs:rounded-[2.5rem] bg-card-dark border border-white/5">
          <h2 className="text-lg xs:text-xl font-display font-semibold mb-4 xs:mb-6">
            Provider Applications
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { name: "Michael B.", role: "Barber", time: "2h ago" },
              { name: "Kezia O.", role: "Hairdresser", time: "5h ago" },
            ].map((app, i) => (
              <div
                key={i}
                className="p-4 xs:p-5 bg-white/[0.02] border border-white/5 rounded-2xl xs:rounded-3xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3">
                  <div>
                    <p className="font-semibold text-sm xs:text-base leading-tight">{app.name}</p>
                    <p className="text-xs xs:text-sm text-neutral-400 mt-0.5">
                      {app.role} · Submitted {app.time}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="rounded-xl text-xs xs:text-sm h-8 xs:h-9 px-3 xs:px-4">
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl text-xs xs:text-sm h-8 xs:h-9 px-3 xs:px-4 bg-brand-green text-black hover:bg-brand-green/90"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="p-5 xs:p-8 rounded-[2rem] xs:rounded-[2.5rem] bg-card-dark border border-white/5">
          <h2 className="text-lg xs:text-xl font-display font-semibold mb-4 xs:mb-6">
            Recent System Activity
          </h2>
          <div className="flex flex-col gap-4 xs:gap-5 text-sm border-l border-white/10 ml-2 pl-4 xs:pl-6">
            {[
              {
                color: "bg-neutral-600",
                actor: "System",
                text: "auto-cancelled 3 expired pending bookings.",
              },
              {
                color: "bg-brand-green",
                actor: "Admin",
                text: "approved new provider Aisha T.",
              },
              {
                color: "bg-blue-400",
                actor: "System",
                text: "sent reminder notifications to 12 upcoming appointments.",
              },
            ].map((log, i) => (
              <div key={i} className="relative flex gap-3 xs:gap-4 items-start">
                <div
                  className={`absolute -left-[1.65rem] xs:-left-[1.75rem] top-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${log.color}`}
                />
                <p className="text-xs xs:text-sm text-neutral-400 leading-relaxed">
                  <span className="text-white font-medium">{log.actor}</span> {log.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
