import { Button } from "../components/ui/Button";
import { Clock, CheckSquare, XCircle, Grid2x2 } from "lucide-react";

export default function ProviderPortal() {
  return (
    <div className="flex flex-col gap-10">
       <header className="border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-6">
         <div>
            <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Provider Dashboard</h1>
            <p className="text-neutral-400">View your schedule and manage bookings.</p>
         </div>
         <Button className="shrink-0 h-12 rounded-2xl">Create Available Slot</Button>
       </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
           <div className="bg-card-dark p-4 xs:p-6 rounded-2xl xs:rounded-[2rem] border border-white/5 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
             <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mb-4 shrink-0"><CheckSquare className="w-5 h-5"/></div>
             <div>
                <p className="text-2xl xs:text-3xl font-display font-bold">12</p>
                <p className="text-xs xs:text-sm text-neutral-400">Today's Bookings</p>
             </div>
           </div>
           <div className="bg-card-dark p-4 xs:p-6 rounded-2xl xs:rounded-[2rem] border border-white/5 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
             <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 shrink-0"><Clock className="w-5 h-5"/></div>
             <div>
                <p className="text-2xl xs:text-3xl font-display font-bold">4</p>
                <p className="text-xs xs:text-sm text-neutral-400">Pending Requests</p>
             </div>
           </div>
           <div className="bg-card-dark p-4 xs:p-6 rounded-2xl xs:rounded-[2rem] border border-white/5 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
             <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-4 shrink-0"><Grid2x2 className="w-5 h-5"/></div>
             <div>
                <p className="text-2xl xs:text-3xl font-display font-bold">5</p>
                <p className="text-xs xs:text-sm text-neutral-400">Available Slots</p>
             </div>
           </div>
           <div className="bg-card-dark p-4 xs:p-6 rounded-2xl xs:rounded-[2rem] border border-white/5 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
             <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mb-4 shrink-0"><XCircle className="w-5 h-5"/></div>
             <div>
                <p className="text-2xl xs:text-3xl font-display font-bold">0</p>
                <p className="text-xs xs:text-sm text-neutral-400">Cancellations</p>
             </div>
           </div>
        </div>

        <div className="bg-card-dark rounded-3xl xs:rounded-[2.5rem] border border-white/5 p-4 xs:p-8">
           <h2 className="text-xl xs:text-2xl font-display font-semibold mb-6">Today's Timeline</h2>
           <div className="flex flex-col gap-0 border-l border-white/10 ml-2 xs:ml-4 py-2">
              {[
                { time: "9:00 AM", student: "Student A", type: "Skin Fade", status: "completed" },
                { time: "10:00 AM", student: "Student B", type: "Classic Cut", status: "active" },
                { time: "11:00 AM", student: null, type: null, status: "free" },
                { time: "12:00 PM", student: "Student C", type: "Beard Trim", status: "upcoming" }
              ].map((slot, i) => (
                 <div key={i} className="relative pl-6 xs:pl-8 pb-6 xs:pb-8 last:pb-0">
                   <div className={`absolute -left-[7px] xs:-left-2 top-0 w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full border-[3px] border-card-dark ${slot.status === 'free' ? 'bg-neutral-600' : slot.status === 'active' ? 'bg-brand-green' : 'bg-white'}`} />
                   <p className="text-xs xs:text-sm font-medium mb-2 -mt-1 text-neutral-400">{slot.time}</p>
                   {slot.student ? (
                      <div className={`p-3.5 xs:p-4 rounded-xl xs:rounded-2xl border hover:scale-[1.01] transition-transform duration-300 ${slot.status === 'active' ? 'bg-brand-green/5 border-brand-green/20' : 'bg-white/5 border-white/5'}`}>
                         <p className={`font-semibold text-sm xs:text-base ${slot.status === 'active' ? 'text-brand-green' : 'text-white'}`}>{slot.student}</p>
                         <p className="text-xs xs:text-sm text-neutral-400 mt-1">{slot.type}</p>
                      </div>
                   ) : (
                      <div className="p-3.5 xs:p-4 rounded-xl xs:rounded-2xl border border-dashed border-white/10 text-neutral-500 text-xs xs:text-sm">
                         Available Slot
                      </div>
                   )}
                 </div>
              ))}
           </div>
        </div>
    </div>
  );
}
