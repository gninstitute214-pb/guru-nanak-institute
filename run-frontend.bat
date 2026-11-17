@echo off
title Apex Institute Frontend (Vite)
cd /d "%~dp0frontend"
echo Starting Frontend Development Server on http://localhost:5173 ...
call npm.cmd run dev
pause
