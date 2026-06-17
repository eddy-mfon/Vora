import express from 'express';
import cors from 'cors';
import { initDb, dbQuery, dbRun } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Init DB
initDb().then(() => {
  console.log("Database initialized");
}).catch(console.error);

// --- Providers ---
app.get('/api/providers', async (req, res) => {
  try {
    const providers = await dbQuery("providers");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/providers', async (req, res) => {
  try {
    const { id, userId, name, specialty, type, image, available, nextSlot, rating, reviews, bio } = req.body;
    await dbRun("providers", (providers) => {
      providers.push({ id, userId, name, specialty, type, image, available, nextSlot, rating, reviews, bio });
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Appointments ---
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await dbQuery("appointments");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { id, providerId, providerName, service, date, time, status, image } = req.body;
    await dbRun("appointments", (appointments) => {
      appointments.push({ id, providerId, providerName, service, date, time, status, image });
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { date, time, status } = req.body;
    const { id } = req.params;
    
    await dbRun("appointments", (appointments) => {
      const apt = appointments.find(a => a.id === id);
      if (apt) {
        if (date && time) {
          apt.date = date;
          apt.time = time;
        } else if (status) {
          apt.status = status;
        }
      }
    });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Users (Auth Simulation) ---
app.post('/api/register', async (req, res) => {
  try {
    const { id, name, email, password, role, studentId } = req.body;
    await dbRun("users", (users) => {
      users.push({ id, name, email, password, role, studentId });
    });
    res.status(201).json({ success: true, user: { id, name, email, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await dbQuery("users", u => u.email === email && u.password === password);
    if (users.length > 0) {
      const user = users[0];
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
