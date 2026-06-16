# Cuts & Braids Front-End Application

## Overview
This is the front-end application for **Cuts & Braids**, a campus grooming platform connecting students with barbers and stylists. The application is built using a modern React stack. This document aims to provide backend developers with a clear understanding of the project's structure, mock data usage, and integration points.

## Tech Stack
- **Framework:** React 18+ (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility-first, responsive, custom theme config in `tailwind.config.js`)
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Global State Management:** React Context API (`src/context/AppContext.tsx`)

## Project Structure
- `/src/pages/`
  - Contains all route-level components (e.g., `Dashboard.tsx`, `Barbers.tsx`, `Appointments.tsx`, `ProviderProfile.tsx`).
- `/src/components/ui/`
  - Reusable UI primitives such as buttons, inputs, logos.
- `/src/layouts/`
  - Shared page wrappers like `AuthLayout`, `MainLayout`.
- `/src/lib/mock.ts`
  - **IMPORTANT:** This file contains all the static mock data arrays and helper generators (e.g., `generateSchedule()`) that emulate a database.
- `/src/context/`
  - AppContext holds a simplified global state for booking operations.

## Mock Data API Boundaries
For the current iteration, no real backend calls are made. The UI components directly consume arrays from `src/lib/mock.ts` and mutate state via `AppContext.tsx`.

When connecting the real backend, consider the following data contracts:

### 1. Appointments
Currently managed in `AppContext.tsx`. It tracks `{ id, providerId, providerName, service, date, time, status, image }`.
*Endpoints Needed:*
- `GET /api/appointments` - Fetch student's upcoming/past appointments.
- `POST /api/appointments` - Create a booking.
- `PATCH /api/appointments/:id` - Reschedule or update status (cancelled, completed).

### 2. Providers (Barbers & Stylists)
Mocked as an array of objects representing both barbers and hairdressers.
*Endpoints Needed:*
- `GET /api/providers` - Fetch all providers (with query params for type, filtering, etc.).
- `GET /api/providers/:id` - Fetch detailed profile.

### 3. Schedule & Availability
Provider availability is currently randomized in `generateSchedule()` inside `mock.ts` for demo purposes.
*Endpoints Needed:*
- `GET /api/providers/:id/availability` - Must return specific dates and time slots tailored to provider settings/existing appointments.

### 4. Authentication
Separate logical paths exist for "Student" vs "Provider" in `Login.tsx` and `Register.tsx`.
*Endpoints Needed:*
- Standard JWT or session-based Auth flows (`/api/auth/login`, `/api/auth/register`).

## How to Work with the Codebase
- **Replacing Mock Data:** Search for `import { providers }` or usages of `useAppContext` mapped to mock initial states, and replace them with standard fetch hooks, SWR, or React Query.
- **Styling Rules:** Ensure you reuse the utility classes from Tailwind and `cn()` utility wrapper for applying dynamic classes smoothly. Don't write raw CSS unless absolutely necessary.
