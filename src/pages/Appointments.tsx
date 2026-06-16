import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function Appointments() {
  const { appointments, cancelAppointment } = useAppContext();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "Upcoming") return apt.status === "confirmed";
    if (activeTab === "Cancelled") return apt.status === "cancelled";
    return apt.status === "completed";
  });

  return (
    <div className="flex flex-col gap-10">
       <header className="border-b border-white/10 pb-8 flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-display font-medium tracking-tight mb-2">My Appointments</h1>
            <p className="text-neutral-400">Manage your past and upcoming bookings.</p>
         </div>
       </header>

       <div className="bg-card-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-2 flex border-b border-white/5 bg-white/[0.02]">
            {["Upcoming", "Past", "Cancelled"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 sm:p-10 flex flex-col gap-6">
             {filteredAppointments.length > 0 ? filteredAppointments.map(apt => (
                <div key={apt.id} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-bg-darkest border border-white/5 gap-6">
                   <div className="flex items-center gap-5 w-full sm:w-auto">
                      <img src={apt.image} className="w-16 h-16 rounded-[1rem] object-cover" alt="" />
                      <div>
                         <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${apt.status === 'confirmed' ? 'text-brand-green' : apt.status === 'cancelled' ? 'text-red-400' : 'text-neutral-400'}`}>{apt.status}</p>
                         <h3 className="text-xl font-display font-medium">{apt.service}</h3>
                         <p className="text-neutral-400 text-sm">with {apt.providerName}</p>
                      </div>
                   </div>
                   
                   <div className="flex flex-col sm:items-end w-full sm:w-auto gap-4">
                      <div className="text-left sm:text-right">
                         <p className="font-medium text-lg">{apt.date}</p>
                         <p className="text-neutral-400 text-sm">{apt.time}</p>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                         {apt.status === "confirmed" && (
                           <>
                             <Button variant="outline" size="sm" className="w-full sm:w-auto">Reschedule</Button>
                             <Button variant="secondary" size="sm" onClick={() => cancelAppointment(apt.id)} className="w-full sm:w-auto hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20">Cancel</Button>
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
                 <h3 className="text-xl font-display font-medium mb-2 text-white">No {activeTab.toLowerCase()} appointments</h3>
                 <p className="text-neutral-400 text-sm max-w-sm">
                   {activeTab === "Upcoming" ? "You don't have any grooming sessions booked yet. Find a provider and secure your slot." : `You don't have any ${activeTab.toLowerCase()} appointments matching this status.`}
                 </p>
                 {activeTab === "Upcoming" && (
                   <Link to="/barbers" className="mt-8">
                      <Button variant="outline" className="border-white/10 hover:bg-white/10">Find a Provider</Button>
                   </Link>
                 )}
               </div>
             )}
          </div>
       </div>
    </div>
  );
}
