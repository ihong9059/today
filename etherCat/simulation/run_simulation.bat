@echo off
chcp 65001 >nul
echo ============================================================
echo   EtherCAT 시뮬레이션 실행
echo ============================================================
echo.
echo   이 시뮬레이션은 두 개의 터미널이 필요합니다:
echo.
echo   터미널 1 (Slave 에뮬레이터):
echo     py -3.14 src\python\ethercat_slave_emulator.py "Realtek"
echo.
echo   터미널 2 (Master 스캔):
echo     py -3.14 src\python\scan_slaves.py 8
echo.
echo   주의: 두 터미널 모두 관리자 권한 필요!
echo.
echo ============================================================
echo.
echo 무엇을 실행하시겠습니까?
echo   1. Slave 에뮬레이터 (Realtek USB GbE)
echo   2. Master 스캔 (Intel I219-V)
echo   3. 루프백 테스트
echo   4. 종료
echo.
set /p choice="선택 (1-4): "

if "%choice%"=="1" (
    echo.
    echo Slave 에뮬레이터를 시작합니다...
    py -3.14 src\python\ethercat_slave_emulator.py "Realtek"
) else if "%choice%"=="2" (
    echo.
    echo Master 스캔을 시작합니다...
    py -3.14 src\python\scan_slaves.py 8
) else if "%choice%"=="3" (
    echo.
    echo 루프백 테스트를 시작합니다...
    py -3.14 src\python\ethercat_loopback_test.py
) else if "%choice%"=="4" (
    exit /b 0
) else (
    echo 잘못된 선택입니다.
)
pause
