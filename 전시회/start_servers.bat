@echo off
chcp 65001 >nul
echo ============================================
echo 전시회 웹서버 실행 스크립트
echo ============================================
echo.
echo 1. 기존 한글 웹서버    : http://localhost:8080
echo 2. 언어 전환 버튼 방식 : http://localhost:8081
echo 3. 별도 영문 페이지    : http://localhost:8082
echo.
echo ============================================
echo.

cd /d %~dp0

echo [1] 기존 한글 웹서버 시작 (Port 8080)...
start "WebServer-KO-8080" cmd /c "cd webserver && python -m http.server 8080"

timeout /t 2 >nul

echo [2] 언어 전환 버튼 방식 시작 (Port 8081)...
start "WebServer-Toggle-8081" cmd /c "cd webserver_toggle && python -m http.server 8081"

timeout /t 2 >nul

echo [3] 별도 영문 페이지 방식 시작 (Port 8082)...
start "WebServer-Separate-8082" cmd /c "cd webserver_separate && python -m http.server 8082"

echo.
echo ============================================
echo 모든 웹서버가 시작되었습니다!
echo.
echo 브라우저에서 접속:
echo   - 한글 전용    : http://localhost:8080
echo   - 언어 전환    : http://localhost:8081
echo   - 별도 페이지  : http://localhost:8082
echo.
echo 종료하려면 각 터미널 창을 닫으세요.
echo ============================================
pause
