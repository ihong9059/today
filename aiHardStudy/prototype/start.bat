@echo off
chcp 65001 >nul 2>&1
title Vibe Firmware Server
echo ============================================
echo   Vibe Firmware - Start
echo ============================================
echo.

echo [1/4] Cleanup...
taskkill /f /im python.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] Reset status...
echo {"state":"idle","message":"","code":"","error":"","elapsed":0} > "%~dp0_status.json"

echo [3/4] Starting Worker...
start "Vibe Worker" "C:\Users\lenovo\AppData\Local\Programs\Python\Python314\python.exe" "%~dp0worker_daemon.py"
timeout /t 3 /nobreak >nul

echo [4/4] Starting Flask...
echo.
echo ============================================
echo   http://192.168.0.2:5051
echo ============================================
echo.
"C:\Users\lenovo\AppData\Local\Programs\Python\Python314\python.exe" "%~dp0app.py"
