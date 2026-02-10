@echo off
chcp 65001 >nul
title 스마트 파쇄기 모니터링 - 전시회 서버

echo.
echo ========================================
echo   전시회용 웹 서버 시작
echo   UTTEC x 한국기계엔지니어링
echo ========================================
echo.

cd /d "%~dp0"

REM Python 확인
python --version >nul 2>&1
if errorlevel 1 (
    echo [오류] Python이 설치되어 있지 않습니다.
    echo Python 3.x를 설치해주세요: https://python.org
    pause
    exit /b 1
)

REM 서버 실행
python server.py %1

pause
