import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../lib/api';

export interface Provider {
  id: string;
  userId?: string;
  name: string;
  specialty: string;
  type: string;
  image: string;
  available: boolean;
  nextSlot: string;
  rating: number;
  reviews: number;
  bio: string;
}

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  date: string;
  time: string;
  status: string;
  image: string;
}

interface AppContextType {
  providers: Provider[];
  appointments: Appointment[];
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  refreshProviders: () => Promise<void>;
  addAppointment: (appointment: Appointment) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // Restore previous session from localStorage on first load
  const [user, setUser] = useState<any>(() => api.getSession());

  const refreshProviders = async () => {
    try {
      const data = await api.getProviders();
      setProviders(data);
    } catch (e) {
      console.error(e);
    }
  };

  const refreshAppointments = async () => {
    try {
      const data = await api.getAppointments();
      setAppointments(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshProviders();
    refreshAppointments();
  }, []);

  const login = (userData: any) => setUser(userData);

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const addAppointment = async (appointment: Appointment) => {
    await api.createAppointment(appointment);
    await refreshAppointments();
  };

  const cancelAppointment = async (id: string) => {
    await api.updateAppointmentStatus(id, 'cancelled');
    await refreshAppointments();
  };

  const rescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    await api.rescheduleAppointment(id, newDate, newTime);
    await refreshAppointments();
  };

  return (
    <AppContext.Provider value={{
      providers,
      appointments,
      user,
      login,
      logout,
      refreshProviders,
      addAppointment,
      cancelAppointment,
      rescheduleAppointment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
