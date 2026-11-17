@echo off
title Apex Institute Backend Server
cd /d "%~dp0backend"
echo Starting Backend Server on http://localhost:5000 ...
node server.js
pause
