@echo off
chcp 65001 >nul
echo ============================================
echo 전시회 웹서버 종료 스크립트
echo ============================================
echo.

echo 실행 중인 Python HTTP 서버를 종료합니다...
taskkill /F /FI "WINDOWTITLE eq WebServer-KO-8080" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq WebServer-Toggle-8081" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq WebServer-Separate-8082" >nul 2>&1

echo.
echo 모든 웹서버가 종료되었습니다.
echo ============================================
pause
