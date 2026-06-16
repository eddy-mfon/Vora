import React, { createContext, useContext, useState, ReactNode } from 'react';
import { appointments as initialAppointments, providers } from '../lib/mock';

type Appointment = typeof initialAppointments[0];

interface AppContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt));
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) => prev.map(apt => apt.id === id ? { ...apt, date: newDate, time: newTime } : apt));
  };

  return (
    <AppContext.Provider value={{ appointments, addAppointment, cancelAppointment, rescheduleAppointment }}>
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
