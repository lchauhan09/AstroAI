@echo off
echo =========================================
echo   Terminating AstroAI Servers...
echo =========================================

echo Stopping server on Port 8000 (FastAPI)...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :8000') DO (
    taskkill /F /PID %%T 2>nul
)

echo Stopping server on Port 5001 (Agent Bridge)...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :5001') DO (
    taskkill /F /PID %%T 2>nul
)

echo Stopping server on Port 8081 (Expo)...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :8081') DO (
    taskkill /F /PID %%T 2>nul
)

echo.
echo All AstroAI development servers have been safely terminated!
echo (Your EAS build, if running, was not interrupted).
echo.
pause
