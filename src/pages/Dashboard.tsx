import { providers } from "../lib/mock";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, Calendar, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const barbers = providers.filter(p => p.type === "barber");
  const hairdressers = providers.filter(p => p.type === "hairdresser");
  const { appointments } = useAppContext();
  
  return (
    <div className="flex flex-col gap-12 relative max-w-6xl mx-auto">
       <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5">
         <div>
            <h1 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-3">Welcome back, Alex.</h1>
            <p className="text-neutral-400 text-lg">Here's your grooming schedule for the week.</p>
         </div>
         <div className="flex bg-card-dark p-2 rounded-3xl border border-white/5 shadow-xl">
            <div className="px-6 py-2 leading-tight">
               <p className="text-[11px] text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Available Barbers</p>
               <p className="text-3xl font-display font-bold text-white">{barbers.filter(b => b.available).length}</p>
            </div>
            <div className="w-px bg-white/5 my-2" />
            <div className="px-6 py-2 leading-tight">
               <p className="text-[11px] text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Available Stylists</p>
               <p className="text-3xl font-display font-bold text-white">{hairdressers.filter(h => h.available).length}</p>
            </div>
         </div>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-10">
             <section className="bg-brand-green relative overflow-hidden rounded-[3rem] p-10 sm:p-12 text-black flex flex-col justify-between gap-8 h-[320px]">
               <div className="max-w-md relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/10 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-black/10">
                   <Sparkles className="w-3.5 h-3.5" /> Book Instantly
                 </div>
                 <h2 className="text-4xl font-display font-bold mb-4 tracking-tight leading-[1.1]">Ready for a fresh look?</h2>
                 <p className="font-medium opacity-80 text-lg leading-snug">Reserve your spot with over 20 top-rated campus professionals.</p>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
                 <Link to="/barbers" className="w-full sm:w-auto">
                   <Button className="bg-black hover:bg-black/80 text-white rounded-2xl w-full h-14 px-8 border-none shadow-xl text-base">Book New Session</Button>
                 </Link>
                 <Link to="/appointments" className="w-full sm:w-auto">
                   <Button variant="outline" className="border-black/20 bg-white/50 hover:bg-white/80 text-black rounded-2xl w-full h-14 px-8 shadow-none text-base font-semibold">View My Appointments</Button>
                 </Link>
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
               <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/20 blur-[80px] rounded-full pointer-events-none" />
             </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-medium tracking-tight">Available Right Now</h2>
                  <Link to="/barbers" className="text-sm font-medium text-brand-green hover:underline">View all</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {providers.filter(p => p.available).slice(0, 4).map((provider, i) => (
                    <Link key={provider.id} to={`/provider/${provider.id}`}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card-dark p-5 rounded-[2rem] border border-white/5 flex gap-5 items-center hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer group"
                      >
                         <img src={provider.image} className="w-16 h-16 rounded-[1.25rem] object-cover border border-white/5 group-hover:scale-105 transition-transform" alt="" />
                         <div className="flex-1">
                            <h3 className="font-medium text-lg leading-tight mb-1 group-hover:text-brand-green transition-colors">{provider.name}</h3>
                            <p className="text-sm text-neutral-400 mb-2 truncate">{provider.specialty}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-[10px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full w-max tracking-widest uppercase font-semibold">
                                 <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                                 Available
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-brand-green text-brand-green" />
                                <span className="text-xs font-medium text-white">{provider.rating}</span>
                                <span className="text-xs text-neutral-500">({provider.reviews})</span>
                              </div>
                            </div>
                         </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
             </section>
          </div>

          <div className="lg:col-span-1">
             <section className="bg-card-dark rounded-[3rem] p-8 sm:p-10 border border-white/5 h-full flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <h2 className="text-xl font-display font-medium tracking-tight">Recent Bookings</h2>
                </div>
                
                <div className="flex flex-col gap-4 flex-1 relative z-10">
                  {appointments.length > 0 ? [...appointments].reverse().slice(0, 3).map(apt => (
                    <div key={apt.id} className="bg-bg-darkest p-5 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                       {apt.status === 'confirmed' && <div className="absolute top-0 left-0 w-1 h-full bg-brand-green" />}
                       {apt.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />}
                       
                       <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <img src={apt.image} className="w-12 h-12 rounded-[1rem] object-cover" alt="" />
                            <div>
                               <p className="font-medium">{apt.providerName}</p>
                               <p className="text-xs text-neutral-400 mt-0.5">{apt.service}</p>
                            </div>
                          </div>
                       </div>
                       <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-2xl text-xs font-medium text-neutral-300 mb-4">
                          <div className="flex items-center gap-3">
                             <Calendar className="w-4 h-4 text-brand-green" /> {apt.date}
                          </div>
                          <div className="flex items-center gap-3">
                             <Clock className="w-4 h-4 text-brand-green" /> {apt.time}
                          </div>
                       </div>
                       
                       <Link to="/appointments">
                          <Button variant="secondary" size="sm" className="w-full text-xs font-semibold h-9 rounded-xl">
                            Manage Booking
                          </Button>
                       </Link>
                    </div>
                  )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                       <Calendar className="w-8 h-8 text-neutral-600 mb-3" />
                       <p className="text-sm text-neutral-400">No recent bookings</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 relative z-10">
                   <Link to="/appointments" className="block w-full">
                     <Button variant="outline" className="w-full text-base h-14 bg-white/5 hover:bg-white/10 border-white/5">
                        Manage Appointments
                     </Button>
                   </Link>
                </div>
             </section>
          </div>
       </div>
    </div>
  );
}
