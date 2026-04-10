@echo off
setlocal
title AstroAI - Setup Wizard

echo ============================================================
echo   AstroAI: Ancient Wisdom. Modern Clarity.
echo   Setup Wizard for Full-Stack Implementation
echo ============================================================
echo.

:: Check for Python
echo [1/4] Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Please install Python 3.10+ and add it to PATH.
    pause
    exit /b 1
)
echo [OK] Python found.

:: Check for Node.js
echo [2/4] Checking for Node.js (npm)...
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Node.js/npm not found. Frontend setup might fail.
    echo Please install Node.js from https://nodejs.org/ if you wish to run the React app.
) else (
    echo [OK] Node.js found.
)

:: Backend Setup
echo [3/4] Initializing Backend (FastAPI)...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
echo Installing backend dependencies...
call venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic email-validator pyswisseph passlib[bcrypt] pyjwt
cd ..
echo [OK] Backend ready.

:: Frontend Setup
echo [4/4] Initializing Frontend (Next.js)...
if exist frontend (
    cd frontend
    if exist node_modules (
        echo Node modules already installed.
    ) else (
        echo Installing frontend dependencies (this may take a while)...
        call npm install
    )
    cd ..
) else (
    echo [ERROR] Frontend directory not found.
)
echo [OK] Frontend setup attempted.

echo.
echo ============================================================
echo   SETUP COMPLETE!
echo.
echo   To Start Backend:
echo     cd backend ^&^& venv\Scripts\activate ^&^& python -m app.main
echo.
echo   To Start Frontend:
echo     cd frontend ^&^& npm run dev
echo ============================================================
pause
