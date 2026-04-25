# AstroAI: Ancient Wisdom. Modern Clarity.

A premium full-stack platform for Vedic Astrology and Numerology, powered by FastAPI, Next.js, and Expo.

## Project Structure

- `backend/`: FastAPI application with high-precision Swiss Ephemeris engine.
- `mobile/`: Expo-based React Native app for cross-platform mobile experiences.
- `frontend/`: Next.js (TypeScript) web application with a custom luxury design system.
- `shared/`: (Planned) Shared types and utilities.

## 🚀 Quick Start (Windows)

The easiest way to get everything running is to use the automated scripts:

1.  **First Time Setup**: Run `setup_astroai.bat`. This will create virtual environments and install all dependencies for Backend, Frontend, and Mobile.
2.  **Launch All**: Run `launch_all.bat`. This will spin up the FastAPI server, Next.js web app, and Expo Metro bundler in separate windows.

---

## 🛠 Manual Setup

### 1. Backend Setup (FastAPI)
- **Environment**: Python 3.10+
- **Database**: PostgreSQL (optional, defaults to SQLite)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### 2. Mobile Setup (Expo)
- **Environment**: Node.js 18+
```bash
cd mobile
npm install
npx expo start
```
*Note: Use the `--lan` or `--tunnel` flag if testing on a physical device.*

### 3. Web Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Key Features

- **High-Precision Sidereal Engine**: Real-time Vedic chart generation using Swiss Ephemeris (`pyswisseph`).
- **Numerology Signature**: Chaldean and Pythagorean vibrations with name correction.
- **AI Interpretations**: Personalized wisdom reports linking astrology and numerology.
- **Cosmic Dashboard**: Daily Panchang, Moon phases, and planetary transits.
- **Luxury Design System**: Royal Navy (#0A0F2C) and Cosmic Gold (#D4AF37) aesthetic with smooth Mandala animations.

## 🎨 Design Philosophy

- **Visuals**: Gold-bordered glassmorphism, 16px corner radii, and Playfair Display typography.
- **Responsiveness**: Fully fluid layouts from mobile screens to desktop browsers.

## 🗺 Production Roadmap

1.  **AI Agent Core**: Deep integration with `@lokesh/agent-core` for autonomous cosmic analysis.
2.  **Infrastructure**: Dockerization for AWS/GCP deployment.
3.  **Real-time Alerts**: Push notifications for critical planetary transits.
4.  **Premium Ephemeris**: Integration of high-fidelity Swiss Ephemeris data files.