import { notifications } from "../lib/mock";
import { Check, Info, BellOff } from "lucide-react";

export default function Notifications() {
  return (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto">
       <header className="border-b border-white/10 pb-8 flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Notifications</h1>
            <p className="text-neutral-400">Updates regarding your appointments.</p>
         </div>
       </header>

       <div className="flex flex-col gap-4">
          {notifications.length > 0 ? (
             notifications.map(n => (
              <div key={n.id} className={`p-6 rounded-[2rem] border transition-colors flex gap-5 ${n.unread ? 'bg-card-dark border-white/10' : 'bg-bg-darkest border-white/5'}`}>
                 <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center mt-1 ${n.type === 'success' ? 'bg-brand-green/20 text-brand-green' : 'bg-blue-500/20 text-blue-400'}`}>
                    {n.type === 'success' ? <Check className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                 </div>
                 <div>
                   <h3 className="text-lg font-medium mb-1">{n.title}</h3>
                   <p className="text-neutral-400 text-sm leading-relaxed mb-3">{n.message}</p>
                   <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">{n.time}</p>
                 </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/[0.05]">
                <BellOff className="w-8 h-8 text-neutral-500" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2 text-white">You're all caught up</h3>
              <p className="text-neutral-400 text-sm max-w-sm">
                No new notifications at the moment. We'll let you know when there are updates to your bookings.
              </p>
            </div>
          )}
       </div>
    </div>
  );
}
