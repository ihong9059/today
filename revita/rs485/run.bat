@echo off
cd /d "%~dp0"
echo ============================================
echo  KC Test RS485 - DUT + Host Launcher
echo ============================================
echo.
echo  DUT (Simulator) : COM16 @ 9600
echo  Host (Web UI)   : COM15 @ 9600
echo  Web UI          : http://localhost:5000
echo.
echo  Starting DUT simulator...
start "DUT Simulator" cmd /k "cd /d "%~dp0" && python dut\dut_simulator.py COM16 9600"
echo.
echo  Waiting 2 seconds for DUT to start...
timeout /t 2 /nobreak >nul
echo.
echo  Starting Host web server...
start "Host Web UI" cmd /k "cd /d "%~dp0" && python host\app.py COM15 9600 5000"
echo.
echo  Waiting 2 seconds...
timeout /t 2 /nobreak >nul
echo  Opening browser...
start "" http://localhost:5000
echo.
echo  Both processes started. Press any key to exit.
pause >nul
