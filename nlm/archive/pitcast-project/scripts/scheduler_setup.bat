@echo off
REM Daily Pitcast Generator - Windows Task Scheduler Setup Script
REM 이 스크립트는 관리자 권한으로 실행해야 합니다.

setlocal enabledelayedexpansion

REM 경로 설정
set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."
set "PYTHON_PATH=python"
set "SCRIPT_PATH=%SCRIPT_DIR%run_daily.py"
set "TASK_NAME=DailyPitcastGenerator"

echo ============================================================
echo Daily Pitcast Generator - Task Scheduler Setup
echo ============================================================
echo.

REM Python 확인
%PYTHON_PATH% --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Please install Python first.
    pause
    exit /b 1
)

echo [OK] Python found
echo.

REM 기존 작업 삭제 (있으면)
schtasks /query /tn "%TASK_NAME%" >nul 2>&1
if not errorlevel 1 (
    echo [INFO] Removing existing task...
    schtasks /delete /tn "%TASK_NAME%" /f >nul 2>&1
)

REM 새 작업 생성 - 매일 오전 8시
echo [INFO] Creating scheduled task for 8:00 AM daily...
echo.

schtasks /create ^
    /tn "%TASK_NAME%" ^
    /tr "\"%PYTHON_PATH%\" \"%SCRIPT_PATH%\"" ^
    /sc daily ^
    /st 08:00 ^
    /rl HIGHEST ^
    /f

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to create scheduled task.
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo [SUCCESS] Scheduled task created!
echo.
echo Task Name: %TASK_NAME%
echo Schedule: Daily at 08:00 AM
echo Script: %SCRIPT_PATH%
echo.
echo To verify: schtasks /query /tn "%TASK_NAME%" /v
echo To run now: schtasks /run /tn "%TASK_NAME%"
echo To delete: schtasks /delete /tn "%TASK_NAME%" /f
echo ============================================================
echo.

pause
