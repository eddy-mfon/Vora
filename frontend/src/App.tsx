/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Barbers from './pages/Barbers';
import Hairdressers from './pages/Hairdressers';
import Appointments from './pages/Appointments';
import ProviderPortal from './pages/ProviderPortal';
import AdminPortal from './pages/AdminPortal';
import Notifications from './pages/Notifications';
import ProviderProfile from './pages/ProviderProfile';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/hairdressers" element={<Hairdressers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/provider" element={<ProviderPortal />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

