/**
 * LocalStorage-backed API shim.
 * Behaves identically to the real REST API so swapping back later
 * is just a one-file change. Data survives page refreshes but is
 * scoped to the browser — no server required.
 */

// ─── Storage keys ────────────────────────────────────────────────────────────
const KEYS = {
  users: "cb_users",
  providers: "cb_providers",
  appointments: "cb_appointments",
  currentUser: "cb_current_user",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function delay(ms = 120) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Seed providers once so the app has data on first load ───────────────────
const SEED_PROVIDERS = [
  {
    id: "p1",
    userId: "seed",
    name: "Marcus Johnson",
    specialty: "Fades & Lineups",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=marcus",
    available: true,
    nextSlot: "Today, 2:00 PM",
    rating: 4.9,
    reviews: 128,
    bio: "Specializing in clean fades and sharp lineups. Student barber with 3 years of experience on campus.",
  },
  {
    id: "p2",
    userId: "seed",
    name: "Devon Clarke",
    specialty: "Skin Fades",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=devon",
    available: true,
    nextSlot: "Today, 4:00 PM",
    rating: 4.7,
    reviews: 94,
    bio: "Precision skin fades and beard trims. Book a slot and leave looking fresh.",
  },
  {
    id: "p3",
    userId: "seed",
    name: "Kofi Mensah",
    specialty: "Twists & Dreads",
    type: "barber",
    image: "https://i.pravatar.cc/150?u=kofi",
    available: false,
    nextSlot: "Tomorrow, 10:00 AM",
    rating: 4.8,
    reviews: 76,
    bio: "Expert in twists, locs, and traditional African styles. Patience and precision in every session.",
  },
  {
    id: "p4",
    userId: "seed",
    name: "Sarah Palmer",
    specialty: "Box Braids",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=sarah",
    available: true,
    nextSlot: "Today, 1:00 PM",
    rating: 4.9,
    reviews: 203,
    bio: "Campus queen of box braids and knotless styles. Fast, neat, and affordable.",
  },
  {
    id: "p5",
    userId: "seed",
    name: "Amara Diallo",
    specialty: "Natural Hair",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=amara",
    available: true,
    nextSlot: "Today, 3:30 PM",
    rating: 4.6,
    reviews: 87,
    bio: "Passionate about natural hair care, twists, and protective styles for all textures.",
  },
  {
    id: "p6",
    userId: "seed",
    name: "Jade Williams",
    specialty: "Weaves & Wigs",
    type: "hairdresser",
    image: "https://i.pravatar.cc/150?u=jade",
    available: false,
    nextSlot: "Tomorrow, 11:00 AM",
    rating: 4.5,
    reviews: 61,
    bio: "Professional wig installs, weave applications, and sew-ins. DM for custom quotes.",
  },
];

function seedProviders() {
  const existing = read<any[]>(KEYS.providers, []);
  if (existing.length === 0) {
    write(KEYS.providers, SEED_PROVIDERS);
  }
}

seedProviders();

// ─── Public API ──────────────────────────────────────────────────────────────
export const api = {
  // --- Providers ---
  getProviders: async () => {
    await delay();
    return read<any[]>(KEYS.providers, SEED_PROVIDERS);
  },

  createProvider: async (providerData: any) => {
    await delay();
    const providers = read<any[]>(KEYS.providers, []);
    providers.push(providerData);
    write(KEYS.providers, providers);
    return providerData;
  },

  // --- Appointments ---
  getAppointments: async () => {
    await delay();
    return read<any[]>(KEYS.appointments, []);
  },

  createAppointment: async (appointmentData: any) => {
    await delay();
    const appointments = read<any[]>(KEYS.appointments, []);
    appointments.push(appointmentData);
    write(KEYS.appointments, appointments);
    return appointmentData;
  },

  updateAppointmentStatus: async (id: string, status: string) => {
    await delay();
    const appointments = read<any[]>(KEYS.appointments, []);
    const idx = appointments.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Appointment not found");
    appointments[idx].status = status;
    write(KEYS.appointments, appointments);
    return appointments[idx];
  },

  rescheduleAppointment: async (id: string, date: string, time: string) => {
    await delay();
    const appointments = read<any[]>(KEYS.appointments, []);
    const idx = appointments.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Appointment not found");
    appointments[idx].date = date;
    appointments[idx].time = time;
    appointments[idx].status = "confirmed";
    write(KEYS.appointments, appointments);
    return appointments[idx];
  },

  // --- Auth ---
  register: async (userData: any) => {
    await delay();
    const users = read<any[]>(KEYS.users, []);

    // Prevent duplicate emails
    const emailKey = (userData.email as string)?.toLowerCase().trim();
    if (users.find(u => u.email?.toLowerCase() === emailKey)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: userData.id || Math.random().toString(36).substring(2),
      name: userData.name,
      email: emailKey,
      // Never store plain password in a real app — fine for local mock
      password: userData.password,
      role: userData.role ?? "student",
      studentId: userData.studentId ?? null,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    write(KEYS.users, users);

    // Persist session
    const sessionUser = { ...newUser, password: undefined };
    write(KEYS.currentUser, sessionUser);

    return { user: sessionUser };
  },

  login: async (credentials: { email: string; password: string }) => {
    await delay();
    const users = read<any[]>(KEYS.users, []);
    const emailKey = credentials.email?.toLowerCase().trim();
    const found = users.find(
      u => u.email?.toLowerCase() === emailKey && u.password === credentials.password
    );

    if (!found) throw new Error("Invalid email or password.");

    const sessionUser = { ...found, password: undefined };
    write(KEYS.currentUser, sessionUser);
    return { user: sessionUser };
  },

  logout: async () => {
    localStorage.removeItem(KEYS.currentUser);
  },

  /** Restore session after a page refresh */
  getSession: () => {
    return read<any>(KEYS.currentUser, null);
  },
};
