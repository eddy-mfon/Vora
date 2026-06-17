import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";
import { useAppContext } from "../context/AppContext";
import { 
  Scissors, 
  Star, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  Check, 
  Zap, 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight 
} from "lucide-react";

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { providers } = useAppContext();
  const featuredProviders = providers.slice(0, 3);

  const faqs = [
    {
      q: "How does Cuts & Braids work?",
      a: "It's simple! Stylists and barbers on campus list their available hours. Students browse, select a service and slot, and confirm instantly. You get reminder alerts and show up right when it's your turn."
    },
    {
      q: "Can I register as a service provider?",
      a: "Yes! If you cut hair or braid on campus, you can sign up as a Provider. You'll get access to a dedicated dashboard to manage your calendar, set your rates, and organize student bookings."
    },
    {
      q: "Is there a cancellation fee?",
      a: "No, but we ask students to respect providers' time. You can reschedule or cancel directly from your dashboard up to 2 hours before your appointment."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-darkest text-white selection:bg-brand-green selection:text-black overflow-x-hidden">
      {/* Premium Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-3 xs:px-6 py-3 xs:py-4 bg-bg-darkest/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Logo />
        </div>
        <div className="pointer-events-auto flex items-center gap-2 xs:gap-4">
          <Link to="/login" className="text-xs xs:text-sm font-medium text-neutral-400 hover:text-brand-green transition-all">Sign In</Link>
          <Link to="/register">
            <Button size="sm" className="rounded-xl px-3 xs:px-4 py-2 text-xs xs:text-sm">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 xs:pt-28 pb-16 xs:pb-24 px-3 xs:px-6 max-w-7xl mx-auto flex flex-col gap-16 xs:gap-24">
        
        {/* HERO SPLIT GRID SECTION */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 xs:gap-12 items-center min-h-[65vh]">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full text-[10px] xs:text-xs font-bold uppercase tracking-wider mb-4 xs:mb-6">
              <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Campus grooming, automated
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight leading-[1] mb-4 xs:mb-6 text-white text-left"
            >
              Your favorite look,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-white to-neutral-400">
                booked in seconds.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm xs:text-lg sm:text-xl font-normal text-neutral-400 mb-6 xs:mb-10 max-w-xl leading-relaxed"
            >
              Check availability, select your favorite campus barber or stylist, and skip the waiting line entirely.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full xs:w-auto"
            >
              <Link to="/register" className="w-full xs:w-auto">
                 <Button className="bg-brand-green hover:bg-brand-green-hover text-black font-semibold h-12 xs:h-14 rounded-2xl px-6 xs:px-8 text-sm xs:text-base shadow-[0_0_30px_rgba(184,255,90,0.25)] w-full">
                   Book Appointment <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
              </Link>
              <Link to="/dashboard" className="w-full xs:w-auto">
                 <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-12 xs:h-14 rounded-2xl px-6 xs:px-8 text-sm xs:text-base font-semibold w-full">
                   View Schedules
                 </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Premium Mockup UI Card */}
          <div className="lg:col-span-5 hidden lg:block relative z-10 w-full h-[520px]">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="w-full h-full bg-card-dark border border-white/10 rounded-[2.5rem] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-3xl flex flex-col"
             >
                {/* Simulated Glow */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-green/20 blur-[60px] rounded-full pointer-events-none" />
                
                {/* Mock Card Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-white/5 mb-6">
                   <img src="https://i.pravatar.cc/150?u=marcus" className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-lg" alt="" />
                   <div>
                      <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                         Marcus Johnson 
                         <span className="flex items-center gap-0.5 text-[9px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                           ★ 4.9
                         </span>
                      </h3>
                      <p className="text-xs text-neutral-400">Fades & Lineups • Student Barber</p>
                   </div>
                </div>

                {/* Date Selection mockup */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Select Date</p>
                <div className="flex gap-2.5 mb-6">
                   <div className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-40">
                      <span className="text-[10px] text-neutral-400">MON</span>
                      <span className="text-sm font-bold">15</span>
                   </div>
                   <div className="flex-1 py-3 bg-brand-green border border-brand-green rounded-2xl flex flex-col items-center justify-center text-black font-semibold shadow-lg scale-105">
                      <span className="text-[10px] text-black/70">TUE</span>
                      <span className="text-sm font-bold">16</span>
                   </div>
                   <div className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-40">
                      <span className="text-[10px] text-neutral-400">WED</span>
                      <span className="text-sm font-bold">17</span>
                   </div>
                   <div className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-40">
                      <span className="text-[10px] text-neutral-400">THU</span>
                      <span className="text-sm font-bold">18</span>
                   </div>
                </div>

                {/* Time Slots Mockup */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Available Slots</p>
                <div className="grid grid-cols-3 gap-2 mb-8">
                   <div className="py-2.5 bg-white/5 border border-white/5 rounded-xl text-center text-xs font-medium opacity-40 line-through">9:00 AM</div>
                   <div className="py-2.5 bg-white/5 border border-white/5 rounded-xl text-center text-xs font-medium opacity-40 line-through">11:00 AM</div>
                   <div className="py-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-medium text-white hover:border-white/30 transition-colors">1:30 PM</div>
                   <div className="py-2.5 bg-white text-black border border-white rounded-xl text-center text-xs font-bold shadow-md scale-105">2:00 PM</div>
                   <div className="py-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-medium text-white hover:border-white/30 transition-colors">3:15 PM</div>
                   <div className="py-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-medium text-white hover:border-white/30 transition-colors">4:30 PM</div>
                </div>

                {/* Confirm Button mockup */}
                <button className="mt-auto w-full h-14 bg-brand-green text-black font-semibold rounded-2xl text-center flex items-center justify-center gap-2 shadow-lg">
                   <Check className="w-5 h-5" /> Confirm Slot (TUE 2:00 PM)
                </button>
             </motion.div>

             {/* Background Blob */}
             <div className="absolute -left-12 bottom-12 w-64 h-64 bg-brand-green/10 blur-[80px] rounded-full pointer-events-none -z-10" />
          </div>
        </section>

        {/* QUICK STATS BAR */}
        <section className="bg-card-dark border border-white/5 p-5 xs:p-8 rounded-[1.5rem] xs:rounded-[2rem] shadow-xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 to-transparent pointer-events-none" />
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 xs:gap-8 text-center relative z-10">
              <div className="flex flex-col gap-1">
                 <p className="text-2xl xs:text-4xl md:text-5xl font-display font-extrabold text-brand-green">1.5k+</p>
                 <p className="text-[10px] xs:text-sm text-neutral-400 font-medium uppercase tracking-wider">Bookings</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/5">
                 <p className="text-2xl xs:text-4xl md:text-5xl font-display font-extrabold text-white">30+</p>
                 <p className="text-[10px] xs:text-sm text-neutral-400 font-medium uppercase tracking-wider">Stylists</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/5">
                 <p className="text-2xl xs:text-4xl md:text-5xl font-display font-extrabold text-white">100%</p>
                 <p className="text-[10px] xs:text-sm text-neutral-400 font-medium uppercase tracking-wider">No Wait</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/5">
                 <p className="text-2xl xs:text-4xl md:text-5xl font-display font-extrabold text-brand-green">4.9★</p>
                 <p className="text-[10px] xs:text-sm text-neutral-400 font-medium uppercase tracking-wider">Avg Rating</p>
              </div>
           </div>
        </section>

        {/* WHY CHOOSE VORA (Premium features grid) */}
        <section className="flex flex-col gap-12">
           <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-display font-bold tracking-tight">Built for Campus Lifestyles</h2>
              <p className="text-neutral-400 text-base xs:text-lg leading-relaxed">No more waiting around for hours at off-campus shops or messaging back and forth on social media. Everything is organized.</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: <Calendar className="w-6 h-6 text-brand-green" />, 
                  title: "Smart Calendar", 
                  desc: "Align your haircut with class breaks. Book in-between lectures cleanly." 
                },
                { 
                  icon: <Users className="w-6 h-6 text-white" />, 
                  title: "Peer Stylists", 
                  desc: "Support talented student professionals operating directly in campus halls." 
                },
                { 
                  icon: <Zap className="w-6 h-6 text-brand-green" />, 
                  title: "Instant Booking", 
                  desc: "No DMs, no waitlist checks. Click a time slot and it is immediately secured." 
                },
                { 
                  icon: <ShieldCheck className="w-6 h-6 text-white" />, 
                  title: "Ratings & Reviews", 
                  desc: "Verify quality with direct reviews left by fellow classmates." 
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-card-dark p-6 xs:p-8 rounded-[2rem] border border-white/5 hover:border-brand-green/30 hover:scale-[1.03] transition-all duration-300 flex flex-col gap-5 group"
                >
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-green/10 duration-300 transition-colors">
                      {feature.icon}
                   </div>
                   <div>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-brand-green transition-colors duration-300">{feature.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* TRENDING CREATORS / STYLISTS */}
        <section className="flex flex-col gap-12">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                 <h2 className="text-3xl xs:text-4xl sm:text-5xl font-display font-bold tracking-tight mb-2">Featured Campus Stylists</h2>
                 <p className="text-neutral-400 text-base">Book a session with one of our top-rated specialists.</p>
              </div>
              <Link to="/barbers">
                 <Button variant="outline" className="h-12 border-white/10 text-white rounded-xl text-sm px-5 hover:bg-white/5">
                   View All Providers <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProviders.map(provider => (
                <div key={provider.id} className="bg-card-dark rounded-[2rem] border border-white/5 p-6 flex flex-col justify-between hover:border-white/10 hover:scale-[1.02] duration-300 transition-all group">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <img src={provider.image} className="w-20 h-20 rounded-[1.25rem] object-cover border border-white/10 group-hover:scale-105 duration-300 transition-transform shrink-0" alt="" />
                         <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1 text-xs font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                               <Star className="w-3 h-3 fill-brand-green text-brand-green" /> {provider.rating}
                            </span>
                            <span className="text-[10px] text-neutral-500 mt-1.5 font-medium">({provider.reviews} reviews)</span>
                         </div>
                      </div>
                      
                      <h3 className="font-display font-bold text-xl mb-1 group-hover:text-brand-green transition-colors duration-300">{provider.name}</h3>
                      <p className="text-xs text-brand-green uppercase tracking-wider font-semibold mb-4">{provider.specialty}</p>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal line-clamp-3">{provider.bio}</p>
                   </div>

                   <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] text-neutral-500 uppercase font-semibold">Next slot</p>
                         <p className="text-xs font-medium text-white flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-brand-green" /> {provider.nextSlot}
                         </p>
                      </div>
                      <Link to={`/provider/${provider.id}`}>
                         <Button size="sm" className="h-10 rounded-xl px-4 text-xs font-semibold">
                           Book Now
                         </Button>
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-4 flex flex-col gap-4">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-display font-bold tracking-tight">Approved by Students</h2>
              <p className="text-neutral-400 leading-relaxed">Read what fellow students say about booking their regular trims and braiding sessions on campus.</p>
              <div className="flex gap-1.5 mt-2">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-green text-brand-green" />
                 ))}
              </div>
              <p className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">OVER 1,000+ COMPLETED APPOINTMENTS</p>
           </div>
           
           <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  quote: "Honestly the best campus addition. I got a clean fade in between my morning math class and afternoon lab. Highly recommend Marcus!",
                  author: "Trevor K.",
                  role: "Sophomore",
                  img: "https://i.pravatar.cc/150?u=trevor"
                },
                {
                  quote: "Finding a stylist who does neat box braids on campus was so stressful before this. Sarah was fast, painless, and my hair looks amazing.",
                  author: "Aaliyah M.",
                  role: "Senior",
                  img: "https://i.pravatar.cc/150?u=aaliyah"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-card-dark border border-white/5 p-6 xs:p-8 rounded-[2rem] flex flex-col justify-between gap-6 relative shadow-lg">
                   <p className="text-neutral-300 italic text-sm xs:text-base leading-relaxed">"{testimonial.quote}"</p>
                   <div className="flex items-center gap-3">
                      <img src={testimonial.img} className="w-10 h-10 rounded-full object-cover border border-white/10" alt="" />
                      <div>
                         <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                         <p className="text-xs text-neutral-500">{testimonial.role}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* DYNAMIC FAQ ACCORDION SECTION */}
        <section className="max-w-3xl mx-auto w-full flex flex-col gap-10">
           <div className="text-center flex flex-col gap-3">
              <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
              <p className="text-neutral-400">Everything you need to know about the platform.</p>
           </div>

           <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-card-dark rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                  >
                     <button
                       onClick={() => setActiveFaq(isOpen ? null : idx)}
                       className="w-full p-5 xs:p-6 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                     >
                        <span className="font-semibold text-base xs:text-lg text-white pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-green' : ''}`} />
                     </button>
                     <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                             <div className="p-5 xs:p-6 pt-0 border-t border-white/5 text-neutral-400 text-sm leading-relaxed">
                                {faq.a}
                             </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                );
              })}
           </div>
        </section>

        {/* HIGH-IMPACT FINAL CALL TO ACTION (CTA) */}
        <section className="relative rounded-[2.5rem] bg-bg-dark border border-white/10 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/10 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/5 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-green mb-2">
                 <Scissors className="w-7 h-7" />
              </div>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-display font-extrabold tracking-tight">Ready for a Fresh Cut?</h2>
              <p className="text-neutral-400 text-sm xs:text-base leading-relaxed">
                 Join thousands of students booking their weekly haircuts and styling sessions on campus. Register in less than a minute.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-4 w-full xs:w-auto mt-4">
                 <Link to="/register" className="w-full xs:w-auto">
                    <Button className="bg-brand-green text-black font-semibold h-14 px-8 rounded-2xl text-base w-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(184,255,90,0.15)]">
                       Create Student Account
                    </Button>
                 </Link>
                 <Link to="/register" className="w-full xs:w-auto">
                    <Button variant="outline" className="border-white/10 hover:border-white/30 h-14 px-8 rounded-2xl text-base w-full hover:scale-105 transition-transform bg-white/5">
                       Join as a Barber/Stylist
                    </Button>
                 </Link>
              </div>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-bg-darkest relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3">
               <div className="flex items-center gap-2.5">
                  <Logo showText={false} className="scale-75 origin-left" />
                  <span className="text-base font-bold tracking-wider font-display uppercase">Cuts & Braids</span>
               </div>
               <p className="text-neutral-500 text-xs mt-1">Premium campus scheduling by students, for students.</p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center text-sm font-medium text-neutral-400">
               <Link to="/barbers" className="hover:text-brand-green transition-colors">Barbers</Link>
               <Link to="/hairdressers" className="hover:text-brand-green transition-colors">Stylists</Link>
               <Link to="/admin" className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-brand-green/60" /> Admin
               </Link>
            </div>
            
            <p className="text-neutral-600 text-xs">&copy; {new Date().getFullYear()} Cuts & Braids. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}
