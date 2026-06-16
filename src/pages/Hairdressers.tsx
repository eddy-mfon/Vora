import { useState } from "react";
import { providers } from "../lib/mock";
import { Star, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/Input";

export default function Hairdressers() {
  const allHairdressers = providers.filter(p => p.type === "hairdresser");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  const specialties = ["All", ...Array.from(new Set(allHairdressers.map(b => b.specialty)))];

  const filteredHairdressers = allHairdressers.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "All" || h.specialty === serviceFilter;
    return matchesSearch && matchesService;
  });

  return (
    <div className="flex flex-col gap-10">
       <header className="border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
         <div>
            <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Hairdressers & Stylists</h1>
            <p className="text-neutral-400">Premium styling, braiding, and hair treatment.</p>
         </div>
       </header>

       <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
         <div className="flex-1">
           <Input 
             type="text"
             name="search"
             placeholder="Search by name..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             icon={<Search className="w-5 h-5" />}
             className="!rounded-2xl"
             hideTitle={true}
           />
         </div>
         <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide shrink-0">
           {specialties.map(spec => (
             <button
               key={spec}
               onClick={() => setServiceFilter(spec)}
               className={`px-4 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors ${serviceFilter === spec ? 'bg-brand-green text-black' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}
             >
               {spec}
             </button>
           ))}
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHairdressers.length > 0 ? filteredHairdressers.map(stylist => (
             <div key={stylist.id} className="bg-card-dark p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <img src={stylist.image} className="w-20 h-20 rounded-[1.5rem] object-cover" alt={stylist.name} />
                   <div className="flex flex-col items-end">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${stylist.available ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' : 'bg-white/5 text-neutral-400 border border-white/10'}`}>
                         {stylist.available ? 'Available Now' : 'Booked'}
                      </div>
                   </div>
                </div>
                <h3 className="text-xl font-display font-semibold">{stylist.name}</h3>
                <p className="text-sm text-neutral-400 mb-4">{stylist.specialty}</p>

                <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                   <Star className="w-4 h-4 text-brand-green fill-brand-green" />
                   {stylist.rating} <span className="text-neutral-500 font-normal">({stylist.reviews} reviews)</span>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                   <Link to={`/provider/${stylist.id}`}>
                      <Button variant="outline" className="w-full text-xs h-12 rounded-2xl">View Profile</Button>
                   </Link>
                   <Link to={`/provider/${stylist.id}`}>
                      <Button className="w-full text-xs h-12 rounded-2xl">Book Slot</Button>
                   </Link>
                </div>
             </div>
          )) : (
            <div className="col-span-full py-16 text-center text-neutral-400">
               <Search className="w-8 h-8 opacity-20 mx-auto mb-4" />
               <p>No stylists found matching your criteria.</p>
            </div>
          )}
       </div>
    </div>
  );
}
