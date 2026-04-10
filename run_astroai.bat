@echo off
setlocal
title Start AstroAI - Full-Stack Implementation

echo ============================================================
echo   AstroAI: Ancient Wisdom. Modern Clarity.
echo   Starting Backend and Frontend for You...
echo ============================================================
echo.

:: Start Backend in a new window
echo [SERVER] Launching FastAPI Backend on http://localhost:8000...
start "AstroAI Backend" cmd /k "cd backend && venv\Scripts\activate && python -m app.main"

:: Wait for backend to warm up
timeout /t 5 >nul

:: Start Frontend in a new window
echo [CLIENT] Launching Next.js Frontend on http://localhost:3000...
if exist frontend (
    start "AstroAI Frontend" cmd /k "cd frontend && npm run dev"
) else (
    echo [ERROR] Frontend directory not found.
)

echo.
echo ============================================================
echo   ASTROAI IS RUNNING!
echo   * Backend:   http://localhost:8000/docs (Swagger UI)
echo   * Frontend:  http://localhost:3000
echo ============================================================
echo.
pause
