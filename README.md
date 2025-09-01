■ Notes App — Frontend (React + Vite + TypeScript +
Tailwind)
A clean, production-ready frontend for the Notes App backend. Built with React, Vite, TypeScript,
TailwindCSS, Axios, React Router, and React Toastify. Includes auth UI (OTP flow), protected
Dashboard, and a simple Notes CRUD wired to your live API.
■ Highlights
- Vite + TypeScript for fast DX & type safety
- TailwindCSS for utility-first, responsive UI
- Toastify for crisp success/error notifications
- JWT auth flow (OTP-based Sign Up/Sign In)
- React Router with guarded dashboard route
- Axios interceptor that auto-attaches JWT
- Deploy-ready (Netlify/Vercel) with environment variables
■■ Project Structure
src/ assets/hero.jpg main.tsx App.tsx components/ Button.tsx TextInput.tsx AuthLayout.tsx pages/
SignUp.tsx SignIn.tsx Dashboard.tsx lib/ api.ts constants.ts index.html tailwind.config.js
postcss.config.js tsconfig.json vite.config.ts
■ Prerequisites
- Node.js v18+ (LTS recommended)
- Running Notes App Backend (Render/any host)
- GitHub account (for deploy to Netlify/Vercel)
■■ Setup
1. Create app: npm create vite@latest notes-frontend -- --template react-ts cd notes-frontend npm i 2.
Install libraries: npm i react-router-dom axios react-toastify npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p 3. Add .env: VITE_API_BASE_URL=https://notes-backend.onrender.com
■ API Client
Axios instance in src/lib/api.ts attaches JWT automatically via interceptors.
■ Pages & Backend Integration
• Sign Up: /auth/register → /auth/verify
• Sign In: /auth/login → /auth/login/verify
• Dashboard: /notes (GET, POST, DELETE) with JWT protection
■ Deploy
Netlify: - Build Command: npm run build - Publish Directory: dist - Env Var:
VITE_API_BASE_URL=https://notes-backend.onrender.com Vercel: - Framework: Vite + React - Build
Command: npm run build - Output Directory: dist - Env Var:
VITE_API_BASE_URL=https://notes-app-itxg.onrender.com
■ Security Notes
- JWT stored in localStorage (demo); prefer HTTP-only cookies for production
- Never commit .env
- Ensure backend CORS allows your frontend domain
  
