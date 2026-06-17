import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import {
  User, Mail, IdCard, ShieldCheck, LogOut, Calendar,
  CheckCircle2, Clock, Edit3, Save, X,
} from "lucide-react";

export default function Profile() {
  const { user, appointments, logout } = useAppContext();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const confirmedApts = appointments.filter(a => a.status === "confirmed").length;
  const completedApts = appointments.filter(a => a.status === "completed").length;
  const cancelledApts = appointments.filter(a => a.status === "cancelled").length;

  const avatarLetter = (displayName || user?.name || "?").charAt(0).toUpperCase();

  const statItems = [
    { label: "Upcoming", value: confirmedApts, color: "text-brand-green" },
    { label: "Completed", value: completedApts, color: "text-white" },
    { label: "Cancelled", value: cancelledApts, color: "text-red-400" },
  ];

  const infoRows = [
    { icon: <Mail className="w-4 h-4 text-neutral-400" />, label: "Email", value: user?.email || "—" },
    { icon: <IdCard className="w-4 h-4 text-neutral-400" />, label: "Student ID", value: user?.studentId || "Not provided" },
    { icon: <ShieldCheck className="w-4 h-4 text-neutral-400" />, label: "Role", value: user?.role === "provider" ? "Provider" : "Student" },
    { icon: <Calendar className="w-4 h-4 text-neutral-400" />, label: "Joined", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <header className="border-b border-white/5 pb-6 xs:pb-8">
        <h1 className="text-2xl xs:text-4xl font-display font-medium tracking-tight mb-1">My Profile</h1>
        <p className="text-neutral-400 text-sm xs:text-base">Your account details and stats.</p>
      </header>

      {/* Avatar + name card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card-dark border border-white/5 rounded-[2rem] p-6 xs:p-8 flex flex-col xs:flex-row items-center xs:items-start gap-5 xs:gap-7"
      >
        {/* Avatar */}
        <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-brand-green/15 border-2 border-brand-green/30 flex items-center justify-center shrink-0">
          <span className="text-brand-green font-display font-bold text-3xl xs:text-4xl">
            {avatarLetter}
          </span>
        </div>

        <div className="flex-1 w-full text-center xs:text-left">
          {editing ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-lg font-semibold focus:outline-none focus:border-brand-green w-full max-w-xs"
                autoFocus
              />
              <button
                onClick={() => setEditing(false)}
                className="p-2 rounded-full bg-brand-green/10 text-brand-green hover:bg-brand-green/20 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setDisplayName(user?.name || ""); setEditing(false); }}
                className="p-2 rounded-full bg-white/5 text-neutral-400 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center xs:justify-start mb-1">
              <h2 className="text-xl xs:text-2xl font-display font-semibold">{displayName || user?.name}</h2>
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-full text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <p className="text-neutral-400 text-sm mb-4">
            {user?.role === "provider" ? "Campus Provider" : "Student Account"}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center xs:justify-start gap-5 xs:gap-6">
            {statItems.map(s => (
              <div key={s.label} className="text-center xs:text-left">
                <p className={`text-xl xs:text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] xs:text-xs text-neutral-500 uppercase tracking-widest font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Info rows */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="bg-card-dark border border-white/5 rounded-[2rem] overflow-hidden"
      >
        <div className="px-6 xs:px-8 py-4 xs:py-5 border-b border-white/5 flex items-center gap-2">
          <User className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest">Account Details</h3>
        </div>
        <div className="divide-y divide-white/5">
          {infoRows.map(row => (
            <div key={row.label} className="flex items-center justify-between px-6 xs:px-8 py-4">
              <div className="flex items-center gap-3">
                {row.icon}
                <span className="text-sm text-neutral-400">{row.label}</span>
              </div>
              <span className="text-sm font-medium text-white text-right max-w-[55%] truncate">{row.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent appointments preview */}
      {appointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="bg-card-dark border border-white/5 rounded-[2rem] overflow-hidden"
        >
          <div className="px-6 xs:px-8 py-4 xs:py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest">Recent Bookings</h3>
            </div>
            <button
              onClick={() => navigate("/appointments")}
              className="text-xs text-brand-green hover:underline font-medium"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {[...appointments].reverse().slice(0, 3).map(apt => (
              <div key={apt.id} className="flex items-center gap-4 px-6 xs:px-8 py-4">
                <img src={apt.image} className="w-10 h-10 rounded-xl object-cover shrink-0" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{apt.providerName}</p>
                  <p className="text-xs text-neutral-500 truncate">{apt.service}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-white">{apt.date}</p>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${apt.status === "confirmed" ? "text-brand-green" : apt.status === "cancelled" ? "text-red-400" : "text-neutral-400"}`}>
                    {apt.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full h-12 xs:h-14 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 rounded-2xl gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}
