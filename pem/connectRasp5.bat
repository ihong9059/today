@echo off
chcp 65001 >nul
title Raspberry Pi 5 SSH Connection (Cloudflare Tunnel)

echo ============================================
echo  회사 Raspberry Pi 5 SSH 접속
echo  도메인: example-atmospheric-week-involved.trycloudflare.com
echo ============================================
echo.

:: 기존 cloudflared 프로세스 종료
taskkill /f /im cloudflared.exe >nul 2>&1

:: cloudflared 프록시 백그라운드 시작
echo [1/2] Cloudflare 프록시 시작 중...
start "" /B "C:\todo\today\cloudflared.exe" access tcp --hostname example-atmospheric-week-involved.trycloudflare.com --url localhost:2222

:: 프록시 연결 대기
timeout /t 3 /nobreak >nul

:: SSH 접속
echo [2/2] SSH 접속 중...
echo.
echo 비밀번호: uttec
echo.
ssh -p 2222 uttec@localhost

:: SSH 종료 후 cloudflared 정리
taskkill /f /im cloudflared.exe >nul 2>&1
echo.
echo 연결 종료됨.
pause
