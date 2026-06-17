import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function Appointments() {
  const { appointments, cancelAppointment, rescheduleAppointment } = useAppContext();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "Upcoming") return apt.status === "confirmed";
    if (activeTab === "Cancelled") return apt.status === "cancelled";
    return apt.status === "completed";
  });

  const handleRescheduleSubmit = async () => {
    if (selectedAptId && newDate && newTime) {
      await rescheduleAppointment(selectedAptId, newDate, newTime);
      setIsRescheduleOpen(false);
      setSelectedAptId(null);
      setNewDate("");
      setNewTime("");
    }
  };

  return (
    <div className="flex flex-col gap-10">
       <header className="border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
             <h1 className="text-2xl xs:text-4xl font-display font-medium tracking-tight mb-2">My Appointments</h1>
             <p className="text-neutral-400 text-sm xs:text-base">Manage your past and upcoming bookings.</p>
          </div>
       </header>

       <div className="bg-card-dark rounded-3xl sm:rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-2 flex border-b border-white/5 bg-white/[0.02] overflow-x-auto no-scrollbar whitespace-nowrap">
            {["Upcoming", "Past", "Cancelled"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 xs:px-6 py-2 xs:py-3 rounded-full text-xs xs:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 xs:p-6 sm:p-10 flex flex-col gap-4 xs:gap-6">
             {filteredAppointments.length > 0 ? filteredAppointments.map(apt => (
                <div key={apt.id} className="flex flex-col sm:flex-row items-center justify-between p-4 xs:p-6 rounded-2xl xs:rounded-3xl bg-bg-darkest border border-white/5 gap-4 xs:gap-6">
                    <div className="flex items-center gap-4 xs:gap-5 w-full sm:w-auto">
                       <img src={apt.image} className="w-12 h-12 xs:w-16 xs:h-16 rounded-[0.75rem] xs:rounded-[1rem] object-cover shrink-0" alt="" />
                       <div className="min-w-0">
                          <p className={`text-[9px] xs:text-[10px] font-bold uppercase tracking-widest mb-1 ${apt.status === 'confirmed' ? 'text-brand-green' : apt.status === 'cancelled' ? 'text-red-400' : 'text-neutral-400'}`}>{apt.status}</p>
                          <h3 className="text-lg xs:text-xl font-display font-medium truncate">{apt.service}</h3>
                          <p className="text-neutral-400 text-xs xs:text-sm">with {apt.providerName}</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end w-full sm:w-auto gap-3 xs:gap-4 border-t border-white/5 sm:border-none pt-3 sm:pt-0">
                       <div className="text-left sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto gap-2">
                          <p className="font-medium text-sm xs:text-lg">{apt.date}</p>
                          <p className="text-neutral-400 text-xs xs:text-sm">{apt.time}</p>
                       </div>
                       <div className="flex gap-2 xs:gap-3 w-full sm:w-auto">
                          {apt.status === "confirmed" && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => { setSelectedAptId(apt.id); setIsRescheduleOpen(true); }} className="w-full sm:w-auto text-xs h-9 rounded-xl">Reschedule</Button>
                              <Button variant="secondary" size="sm" onClick={() => cancelAppointment(apt.id)} className="w-full sm:w-auto text-xs h-9 rounded-xl hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20">Cancel</Button>
                            </>
                          )}
                       </div>
                    </div>
                </div>
             )) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/[0.05]">
                    <Calendar className="w-8 h-8 text-neutral-500" />
                  </div>
                  <h3 className="text-lg xs:text-xl font-display font-medium mb-2 text-white">No {activeTab.toLowerCase()} appointments</h3>
                  <p className="text-neutral-400 text-xs xs:text-sm max-w-sm">
                    {activeTab === "Upcoming" ? "You don't have any grooming sessions booked yet. Find a provider and secure your slot." : `You don't have any ${activeTab.toLowerCase()} appointments matching this status.`}
                  </p>
                  {activeTab === "Upcoming" && (
                    <Link to="/barbers" className="mt-8">
                       <Button variant="outline" className="border-white/10 hover:bg-white/10 text-xs xs:text-sm h-11 rounded-xl">Find a Provider</Button>
                    </Link>
                  )}
                </div>
             )}
          </div>
       </div>

       {isRescheduleOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="bg-card-dark border border-white/10 p-6 rounded-3xl w-full max-w-sm">
             <h3 className="text-xl font-display font-semibold mb-4">Reschedule Appointment</h3>
             <div className="flex flex-col gap-4 mb-6">
               <input 
                 type="text" 
                 placeholder="New Date (e.g., Oct 25, 2023)" 
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-green"
                 value={newDate}
                 onChange={(e) => setNewDate(e.target.value)}
               />
               <input 
                 type="text" 
                 placeholder="New Time (e.g., 3:00 PM)" 
                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-green"
                 value={newTime}
                 onChange={(e) => setNewTime(e.target.value)}
               />
             </div>
             <div className="flex gap-3">
               <Button variant="outline" className="flex-1" onClick={() => setIsRescheduleOpen(false)}>Cancel</Button>
               <Button className="flex-1" onClick={handleRescheduleSubmit}>Confirm</Button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
