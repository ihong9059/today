@echo off
REM ================================================================
REM  다수 Android 기기에 APK 일괄 설치 스크립트
REM  USB 허브에 여러 기기를 연결한 후 실행
REM  사전 조건: 각 기기에서 USB 디버깅 활성화
REM  사용법: install_all.bat
REM ================================================================

set ADB=C:\Users\lenovo\AppData\Local\Android\sdk\platform-tools\adb.exe
set APK=%~dp0UTTEC_Cloud_v1.0.apk

echo ============================================
echo   UTTEC Cloud APK 일괄 설치
echo ============================================
echo.

if not exist "%APK%" (
    echo [ERROR] APK 파일을 찾을 수 없습니다: %APK%
    pause
    exit /b 1
)

echo [*] 연결된 기기 목록:
%ADB% devices -l
echo.

set COUNT=0
set SUCCESS=0
set FAIL=0

for /f "tokens=1" %%D in ('%ADB% devices ^| findstr "device$"') do (
    set /a COUNT+=1
    echo [%%D] 설치 중...
    %ADB% -s %%D install "%APK%"
    if errorlevel 1 (
        echo [%%D] ❌ 실패
        set /a FAIL+=1
    ) else (
        echo [%%D] ✅ 성공
        set /a SUCCESS+=1
    )
    echo.
)

echo ============================================
echo   설치 결과: %SUCCESS% 성공 / %FAIL% 실패 / %COUNT% 총
echo ============================================
pause
