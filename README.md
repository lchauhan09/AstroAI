# AstroAI - Full-Stack Implementation

Ancient wisdom meets modern clarity with a FastAPI backend and Next.js frontend.

## Project Structure

- `backend/`: FastAPI application, SQL models, and core Vedic/Numerology engines.
- `frontend/`: Next.js (TypeScript) application with TailwindCSS and custom luxury design system.

## Getting Started

### 1. Backend Setup (FastAPI)

Prerequisites: Python 3.10+, PostgreSQL (optional, defaults to SQLite)

```bash
cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic email-validator pyswisseph passlib[bcrypt] pyjwt

# Run the server
python app/main.py
```

**Note**: `pyswisseph` requires C-compilation on some systems. Pre-built binaries are available for most OS versions.

### 2. Frontend Setup (Next.js)

Prerequisites: Node.js 18+

```bash
cd frontend
# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will start at [http://localhost:3000](http://localhost:3000).

## Design System

- **Primary Colors**: Royal Navy (#0A0F2C), Cosmic Gold (#D4AF37), Saffron Glow (#FF9933)
- **Typography**: Playfair Display (Headings), Inter (Body), JetBrains Mono (Data)
- **Visuals**: Mandala animations, gold-bordered cards (16px radius), and smooth ease-in-out transitions.

## Key Features

- **Sidereal Engine**: High-precision Vedic chart generation using Swiss Ephemeris.
- **Numerology Signature**: Chaldean and Pythagorean vibrations with name correction.
- **AI Interpretations**: Personalized wisdom reports linking astrology and numerology via LLMs.
- **Daily Insights**: Real-time Panchang, auspicious timings (Muhurats), and Rahu Kalam trackers on the dashboard.

## Production Roadmap

1.  **High Availability**: Deploy backend to AWS Lambda or ECS using Docker.
2.  **State Management**: Use React Query for advanced caching of cosmic data.
3.  **Security**: Replace mock JWT keys with environment variables and secure HttpOnly cookies.
4.  **Ephemeris Path**: Point `pyswisseph` to the official Swiss Ephemeris data files for dates far in the past/future.