import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { providers, generateSchedule } from "../lib/mock";
import { ArrowLeft, Star, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { useAppContext } from "../context/AppContext";

export default function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = providers.find(p => p.id === id) || providers[0];
  
  const { addAppointment } = useAppContext();

  // Memoize schedule so it doesn't regenerate on every render
  const schedule = useMemo(() => generateSchedule(), []);
  
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"calendar" | "confirm" | "success">("calendar");

  const activeDateSlots = schedule[selectedDate]?.slots || [];

  const handleBook = () => {
    if (!selectedSlot) return;
    setBookingStep("confirm");
  };

  const confirmBooking = () => {
    if (!selectedSlot) return;
    const time = activeDateSlots.find(s => s.id === selectedSlot)?.time || "";
    addAppointment({
      id: Math.random().toString(36).substring(7),
      providerName: provider.name,
      service: provider.specialty,
      date: schedule[selectedDate].date,
      time: time,
      status: "confirmed",
      image: provider.image,
    });
    setBookingStep("success");
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto">
       <header className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
         <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors shrink-0">
           <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">
            <img src={provider.image} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-white/10" alt={provider.name} />
            <div className="flex-1">
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight">{provider.name}</h1>
                  <span className="px-3 py-1 bg-white/5 text-neutral-300 text-xs rounded-full uppercase tracking-widest font-semibold w-max border border-white/10">
                    {provider.type}
                  </span>
               </div>
               <p className="text-neutral-400 text-lg mb-3">{provider.specialty}</p>
               <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                   <div className="flex items-center gap-1">
                     <Star className="w-4 h-4 text-brand-green fill-brand-green" />
                     {provider.rating} <span className="text-neutral-500 font-normal">({provider.reviews} reviews)</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-white/20" />
                   <p className="text-neutral-400 max-w-lg leading-relaxed font-normal">{provider.bio}</p>
               </div>
            </div>
         </div>
       </header>

       <AnimatePresence mode="wait">
          {bookingStep === "calendar" && (
            <motion.div 
               key="calendar"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 flex flex-col gap-8">
                 <div className="bg-card-dark p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-display font-medium flex items-center gap-3">
                         <CalendarIcon className="w-6 h-6 text-brand-green" />
                         Select Date & Time
                       </h2>
                    </div>

                    {/* Horizontal Date Picker */}
                    <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-2 px-2 scroll-smooth">
                       {schedule.map((day, idx) => {
                         const isSelected = selectedDate === idx;
                         const dateObj = new Date(day.fullDate);
                         const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                         const dayNum = dateObj.getDate();
                         const hasSlots = day.slots.length > 0;

                         return (
                           <button 
                             key={idx}
                             onClick={() => { setSelectedDate(idx); setSelectedSlot(null); }}
                             className={cn(
                               "flex flex-col items-center justify-center min-w-[4.5rem] h-24 rounded-3xl border transition-all duration-300 relative",
                               isSelected 
                                 ? "bg-brand-green border-brand-green text-black scale-105 shadow-[0_0_20px_rgba(184,255,90,0.2)]" 
                                 : "bg-bg-darkest border-white/10 text-neutral-400 hover:border-white/30",
                               !hasSlots && !isSelected && "opacity-50"
                             )}
                           >
                             <span className={cn("text-xs uppercase font-semibold tracking-wider mb-1", isSelected ? "text-black/70" : "text-neutral-500")}>
                               {dayName}
                             </span>
                             <span className={cn("text-2xl font-display font-bold", isSelected ? "text-black" : "text-white")}>
                               {dayNum}
                             </span>
                             {hasSlots && (
                               <div className={cn("absolute bottom-2 w-1.5 h-1.5 rounded-full", isSelected ? "bg-black" : "bg-brand-green")} />
                             )}
                           </button>
                         )
                       })}
                    </div>

                    <div className="h-px bg-white/5 w-full my-8" />

                    <div>
                       <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                         <Clock className="w-5 h-5 text-neutral-400" />
                         Available Slots for {schedule[selectedDate].date}
                       </h3>
                       
                       {activeDateSlots.length > 0 ? (
                         <motion.div 
                           initial="hidden"
                           animate="visible"
                           variants={{
                             visible: { transition: { staggerChildren: 0.04 } }
                           }}
                           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                         >
                           {activeDateSlots.map((slot) => (
                             <motion.button
                               variants={{
                                 hidden: { opacity: 0, y: 10, scale: 0.95 },
                                 visible: { opacity: 1, y: 0, scale: 1 }
                               }}
                               key={slot.id}
                               onClick={() => setSelectedSlot(slot.id)}
                               className={cn(
                                 "py-4 rounded-2xl border text-sm font-medium transition-all duration-300",
                                 selectedSlot === slot.id
                                   ? "bg-white text-black border-white scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                                   : "bg-bg-darkest border-white/10 hover:border-white/30 text-white"
                               )}
                             >
                               {slot.time}
                             </motion.button>
                           ))}
                         </motion.div>
                       ) : (
                         <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
                           <p className="text-neutral-400">No available slots on this day.</p>
                           <p className="text-sm mt-2 text-neutral-500">Please select another date from the calendar above.</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-1">
                 <div className="bg-card-dark p-8 rounded-[2.5rem] border border-white/5 sticky top-32">
                    <h3 className="text-xl font-display font-semibold mb-6">Booking Summary</h3>
                    
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex justify-between py-3 border-b border-white/5">
                        <span className="text-neutral-400">Service</span>
                        <span className="font-medium text-right">{provider.specialty}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/5">
                        <span className="text-neutral-400">Date</span>
                        <span className="font-medium text-right">{schedule[selectedDate].date}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/5">
                        <span className="text-neutral-400">Time</span>
                        <span className="font-medium text-right">
                          {selectedSlot ? activeDateSlots.find(s => s.id === selectedSlot)?.time : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/5 font-semibold text-brand-green">
                        <span>Total (Est.)</span>
                        <span className="text-right">Campus Rate</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-14 text-base" 
                      disabled={!selectedSlot} 
                      onClick={handleBook}
                    >
                      {selectedSlot ? "Proceed to Confirm" : "Select a Time Slot"}
                    </Button>
                 </div>
              </div>
            </motion.div>
          )}

          {bookingStep === "confirm" && (
             <motion.div 
               key="confirm"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="max-w-2xl mx-auto w-full"
             >
                <div className="bg-card-dark p-8 md:p-12 rounded-[3.5rem] border border-white/5 text-center">
                   <h2 className="text-3xl font-display font-semibold mb-2">Review Appointment</h2>
                   <p className="text-neutral-400 mb-10">Please confirm your booking details below.</p>
                   
                   <div className="bg-bg-darkest p-6 rounded-3xl border border-white/5 mb-10 text-left flex flex-col sm:flex-row items-center gap-6">
                      <img src={provider.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                      <div className="w-full">
                         <p className="text-xs text-brand-green font-semibold uppercase tracking-widest mb-1">{schedule[selectedDate].date} • {activeDateSlots.find(s => s.id === selectedSlot)?.time}</p>
                         <h3 className="text-xl font-display font-medium mb-1">{provider.specialty}</h3>
                         <p className="text-neutral-400">with {provider.name}</p>
                      </div>
                   </div>

                   <p className="text-sm text-neutral-400 mb-8 leading-relaxed max-w-md mx-auto">
                     By confirming, you agree to show up on time. Repeated no-shows may lead to a temporary restriction on the platform.
                   </p>

                   <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-14" onClick={() => setBookingStep("calendar")}>Back</Button>
                      <Button className="h-14 text-base shadow-[0_0_30px_rgba(184,255,90,0.2)]" onClick={confirmBooking}>Confirm Booking</Button>
                   </div>
                </div>
             </motion.div>
          )}

          {bookingStep === "success" && (
             <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="max-w-xl mx-auto w-full"
             >
                <div className="bg-brand-green text-black p-10 md:p-14 rounded-[3.5rem] text-center flex flex-col items-center">
                   <div className="w-20 h-20 bg-black text-brand-green rounded-full flex items-center justify-center mb-8 shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                   </div>
                   <h2 className="text-4xl font-display font-bold mb-4 tracking-tight">You're all set!</h2>
                   <p className="font-medium opacity-80 mb-10 text-lg leading-relaxed">
                     Your appointment with {provider.name} is confirmed for {schedule[selectedDate].date} at {activeDateSlots.find(s => s.id === selectedSlot)?.time}.
                   </p>
                   <Link to="/appointments" className="w-full">
                     <Button className="bg-black hover:bg-black/80 text-white w-full h-14 text-base border-none shadow-none rounded-2xl">
                       View My Appointments
                     </Button>
                   </Link>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}
