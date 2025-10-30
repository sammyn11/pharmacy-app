# KPharma Frontend

A React + TypeScript + Vite web app to help Kigali residents quickly find pharmacies that have required medicines in stock and that accept their insurance, with optional prescription upload, online ordering, and delivery.

## Quick Start

```bash
cd "kpharma-frontend"
npm install
npm run dev
```

- App runs at `http://localhost:5173`

## Tech Stack
- React 18 + TypeScript
- Vite 5
- React Router 6
- Tailwind CSS 3
- Zustand (cart state)

## Features (MVP)
- Search for medicines and filter pharmacies by insurance.
- View pharmacy details: stock, price, prescription requirement, insurance acceptance, delivery availability.
- Cart and checkout with delivery option.
- Prescription file upload with simulated verification flow.
- Mock data/services for pharmacies, medicines, and insurance.

## Project Structure
```
kpharma-frontend/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  src/
    main.tsx                 # App entry
    router.tsx               # Routes
    styles/
      index.css              # Tailwind
    ui/
      RootLayout.tsx         # Nav, footer, shell
    views/
      Home.tsx               # Search form (medicine + location)
      Pharmacies.tsx         # Results + insurance filters
      PharmacyDetail.tsx     # Stock + insurance details
      Cart.tsx               # Cart list
      Checkout.tsx           # Delivery + place order
      Prescription.tsx       # Upload & simulated verification
    services/
      data.ts                # Mock data
      api.ts                 # Mock API functions
    store/
      cartStore.ts           # Zustand cart state
```

## Environment
No external env vars required for the mock API. All data is in `src/services/data.ts`.

## Scripts
- `npm run dev`: Start dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build

## Notes & Next Steps
- Add real API integration (REST/GraphQL) for live stock and insurance checks.
- Implement auth and user profiles (insurance info, saved addresses, order history).
- Add "Add to cart" actions from `PharmacyDetail` and quantity adjustments.
- Geolocation + map view for nearby pharmacies and delivery ETA.
- Robust prescription workflow (image quality checks, pharmacy-side verification).
- Accessibility and responsive improvements, error states, loading skeletons.
- E2E tests (Playwright) and unit tests (Vitest/RTL).

## License
MIT
