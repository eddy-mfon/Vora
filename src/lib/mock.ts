export const providers = [
  {
    id: "1",
    name: "Marcus Johnson",
    specialty: "Fades & Lineups",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=marcus",
    available: true,
    nextSlot: "Today, 2:00 PM",
    rating: 4.9,
    reviews: 128,
    bio: "Specializing in crispy faded haircuts, beard sculpting, and precise lineups. 5+ years of experience making sure students look their best on campus."
  },
  {
    id: "2",
    name: "Sarah Palmer",
    specialty: "Box Braids & Locs",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=sarah",
    available: true,
    nextSlot: "Today, 1:00 PM",
    rating: 4.8,
    reviews: 204,
    bio: "Your go-to stylist for protective styling. I specialize in neat parts, painless braiding, and loc maintenance."
  },
  {
    id: "3",
    name: "David Chen",
    specialty: "Classic Cuts & Styling",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=david",
    available: false,
    nextSlot: "Tomorrow, 10:00 AM",
    rating: 4.7,
    reviews: 89,
    bio: "Classic cuts, modern styling. Whether it's a textured crop or a simple trim, I've got you covered."
  },
  {
    id: "4",
    name: "Aisha Taylor",
    specialty: "Cornrows & Silk Press",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=aisha",
    available: true,
    nextSlot: "Today, 3:15 PM",
    rating: 5.0,
    reviews: 312,
    bio: "Healthy hair advocate. Come to me for straight, bouncy silk presses and creative cornrow designs."
  },
  {
    id: "5",
    name: "James Wilson",
    specialty: "Beard Sculpting",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=james",
    available: true,
    nextSlot: "Today, 4:30 PM",
    rating: 4.6,
    reviews: 145,
    bio: "Master barber focusing on detailed beard work and traditional hot towel shaves."
  },
  {
    id: "6",
    name: "Elena Rodriguez",
    specialty: "Coloring & Treatment",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=elena",
    available: false,
    nextSlot: "Wed, 11:00 AM",
    rating: 4.9,
    reviews: 275,
    bio: "Transform your look with custom coloring. Balayage, highlights, and deep conditioning treatments."
  },
  {
    id: "7",
    name: "Kwame Osei",
    specialty: "Tapers & Waves",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=kwame",
    available: true,
    nextSlot: "Today, 5:00 PM",
    rating: 4.9,
    reviews: 188,
    bio: "Helping you achieve the perfect 360 waves and clean tapers. Precision is my priority."
  },
  {
    id: "8",
    name: "Chloe Smith",
    specialty: "Wig Installs & Sew-ins",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=chloe",
    available: true,
    nextSlot: "Tomorrow, 9:00 AM",
    rating: 4.8,
    reviews: 210,
    bio: "Flawless frontal installs and seamless sew-ins. Look camera ready every day."
  },
  {
    id: "9",
    name: "Daniel Kim",
    specialty: "Asian Hair Specialist",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=daniel",
    available: true,
    nextSlot: "Today, 1:30 PM",
    rating: 4.7,
    reviews: 160,
    bio: "Expert in styling coarse hair, two-blocks, and modern mullets."
  },
  {
    id: "10",
    name: "Jessica Ndlovu",
    specialty: "Knotless Braids",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=jessica",
    available: false,
    nextSlot: "Friday, 12:00 PM",
    rating: 4.9,
    reviews: 340,
    bio: "Neat, lightweight, and tension-free knotless braids. Quick braider with a gentle touch."
  }
];

// Generate 14 days of schedule slots helper
export const generateSchedule = () => {
  const schedule = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Skip Sundays
    if (date.getDay() === 0) continue;

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Generate random slots between 9 AM and 5 PM
    const slots = [];
    const availableHours = [9, 10, 11, 13, 14, 15, 16];
    
    availableHours.forEach(hour => {
      // 60% chance the slot is available
      if (Math.random() > 0.4) {
        const timeString = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push({ id: `${i}-${hour}`, time: timeString, available: true });
      }
    });

    schedule.push({
      date: formattedDate,
      fullDate: date,
      slots
    });
  }
  return schedule;
};

export const appointments = [
  {
    id: "a1",
    providerId: "1",
    providerName: "Marcus Johnson",
    service: "Skin Fade + Beard Trim",
    date: "Oct 24, 2023",
    time: "2:00 PM",
    status: "confirmed",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    id: "a2",
    providerId: "4",
    providerName: "Aisha Taylor",
    service: "Cornrows (Mid Back)",
    date: "Nov 2, 2023",
    time: "10:00 AM",
    status: "pending",
    image: "https://i.pravatar.cc/150?u=aisha",
  }
];

export const notifications = [
  {
    id: "n1",
    title: "Booking Confirmed",
    message: "Your appointment with Marcus Johnson is confirmed for Oct 24 at 2:00 PM.",
    time: "2 hours ago",
    unread: true,
    type: "success"
  },
  {
    id: "n2",
    title: "Appointment Reminder",
    message: "You have an upcoming appointment with Sarah Palmer tomorrow.",
    time: "1 day ago",
    unread: false,
    type: "info"
  }
];
