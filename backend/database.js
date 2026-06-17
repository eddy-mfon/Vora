import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.json');

const defaultData = {
  users: [],
  providers: [
    { id: "1", name: "Marcus Johnson", specialty: "Fades & Lineups", type: "barber", image: "https://i.pravatar.cc/150?u=marcus", available: true, nextSlot: "Today, 2:00 PM", rating: 4.9, reviews: 128, bio: "Specializing in crispy faded haircuts, beard sculpting, and precise lineups." },
    { id: "2", name: "Sarah Palmer", specialty: "Box Braids & Locs", type: "hairdresser", image: "https://i.pravatar.cc/150?u=sarah", available: true, nextSlot: "Today, 1:00 PM", rating: 4.8, reviews: 204, bio: "Your go-to stylist for protective styling." },
    { id: "3", name: "David Chen", specialty: "Classic Cuts & Styling", type: "barber", image: "https://i.pravatar.cc/150?u=david", available: false, nextSlot: "Tomorrow, 10:00 AM", rating: 4.7, reviews: 89, bio: "Classic cuts, modern styling." },
    { id: "4", name: "Aisha Taylor", specialty: "Cornrows & Silk Press", type: "hairdresser", image: "https://i.pravatar.cc/150?u=aisha", available: true, nextSlot: "Today, 3:15 PM", rating: 5.0, reviews: 312, bio: "Healthy hair advocate." }
  ],
  appointments: [
    { id: "a1", providerId: "1", providerName: "Marcus Johnson", service: "Skin Fade + Beard Trim", date: "Oct 24, 2023", time: "2:00 PM", status: "confirmed", image: "https://i.pravatar.cc/150?u=marcus" }
  ]
};

export async function initDb() {
  try {
    await fs.access(dbPath);
  } catch (e) {
    await fs.writeFile(dbPath, JSON.stringify(defaultData, null, 2));
  }
}

async function readDb() {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function dbQuery(table, queryFn) {
  const data = await readDb();
  return queryFn ? data[table].filter(queryFn) : data[table];
}

export async function dbRun(table, actionFn) {
  const data = await readDb();
  actionFn(data[table]);
  await writeDb(data);
}
