@echo off
chcp 65001 >nul
echo ============================================================
echo   EtherCAT Slave 에뮬레이터 시작
echo ============================================================
echo.
echo   인터페이스: Realtek USB GbE
echo   관리자 권한으로 실행 필요!
echo.
echo ============================================================
echo.
py -3.14 "%~dp0src\python\ethercat_slave_emulator.py" "Realtek"
pause
