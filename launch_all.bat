@echo off
setlocal
title AstroAI - Full Stack Launcher

echo ============================================================
echo   AstroAI: Ancient Wisdom. Modern Clarity.
echo   Launching all services for mobile testing...
echo ============================================================
echo.

:: 1. Launch FastAPI Backend
echo [BACKEND] Starting FastAPI on port 8000 (accessible on LAN)...
start "AstroAI Backend" cmd /k "cd backend && venv\Scripts\activate && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

:: Wait for backend
timeout /t 3 >nul

:: 2. Launch Agent Bridge
echo [AGENT] Starting Agent Bridge on port 5001...
if exist shared\agent-bridge (
    start "AstroAI Agent Bridge" cmd /k "cd shared\agent-bridge && node server.js"
) else (
    echo [SKIP] Agent Bridge directory not found.
)

:: Wait for agent
timeout /t 2 >nul

:: 3. Launch Next.js Frontend
echo [FRONTEND] Starting Next.js on port 3000...
if exist frontend (
    start "AstroAI Frontend" cmd /k "cd frontend && npm run dev"
) else (
    echo [SKIP] Frontend directory not found.
)

:: 4. Launch Expo Mobile
echo [MOBILE] Starting Expo (Metro Bundler)...
if exist mobile (
    start "AstroAI Mobile" cmd /k "cd mobile && npx expo start --lan"
) else (
    echo [SKIP] Mobile directory not found.
)

echo.
echo ============================================================
echo   ALL SERVICES ARE LAUNCHING!
echo   - Backend:  http://localhost:8000
echo   - Frontend: http://localhost:3000
echo   - Mobile:   Check the new window for QR code
echo ============================================================
echo.
pause
