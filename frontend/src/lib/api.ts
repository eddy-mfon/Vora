const API_URL = 'http://localhost:3001/api';

export const api = {
  // --- Providers ---
  getProviders: async () => {
    const res = await fetch(`${API_URL}/providers`);
    if (!res.ok) throw new Error('Failed to fetch providers');
    return res.json();
  },
  
  createProvider: async (providerData: any) => {
    const res = await fetch(`${API_URL}/providers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(providerData),
    });
    if (!res.ok) throw new Error('Failed to create provider');
    return res.json();
  },

  // --- Appointments ---
  getAppointments: async () => {
    const res = await fetch(`${API_URL}/appointments`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  createAppointment: async (appointmentData: any) => {
    const res = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });
    if (!res.ok) throw new Error('Failed to create appointment');
    return res.json();
  },

  updateAppointmentStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update appointment');
    return res.json();
  },

  rescheduleAppointment: async (id: string, date: string, time: string) => {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, time }),
    });
    if (!res.ok) throw new Error('Failed to reschedule appointment');
    return res.json();
  },

  // --- Auth Simulation ---
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to register');
    return res.json();
  },

  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  }
};
