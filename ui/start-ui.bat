@echo off
title English Coaching Studio UI - Port 3001
echo ========================================================
echo   Starting English Coaching Landing UI on Port 3001
echo ========================================================
cd /d "%~dp0"

:: Open the browser automatically after 1 second
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3001"

:: Start the clean native server
node server.js
if %errorlevel% neq 0 (
  echo.
  echo Falling back to Python HTTP server...
  python -m http.server 3001
)
pause
