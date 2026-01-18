#!/bin/bash
# Lenovo TB310FU - 모든 웹 서버 시작 스크립트

echo "=========================================="
echo "  Lenovo TB310FU Web Servers 시작"
echo "=========================================="
echo ""

BASE_DIR=~/webServer

# 기존 node 프로세스 종료 (선택사항)
# echo "기존 서버 종료 중..."
# killall node 2>/dev/null
# sleep 1

echo "[1/5] SensorMonitor 시작 (포트 5000)..."
cd $BASE_DIR/SensorMonitor/server
nohup node server.js > server.log 2>&1 &
sleep 1

echo "[2/5] cert-guide 시작 (포트 4000)..."
cd $BASE_DIR/cert-guide
nohup node static-server.js > static.log 2>&1 &
sleep 1

echo "[3/5] edu-platform Frontend 시작 (포트 3001)..."
cd $BASE_DIR/hw-c-edu-platform/frontend
nohup node static-server.js > static.log 2>&1 &
sleep 1

echo "[4/5] edu-platform Backend 시작 (포트 3000)..."
cd $BASE_DIR/hw-c-edu-platform/backend
nohup node server-lite.js > server.log 2>&1 &
sleep 1

echo "[5/5] Device Info 시작 (포트 8080)..."
cd $BASE_DIR/device-info
nohup node server.js > server.log 2>&1 &
sleep 1

echo ""
echo "=========================================="
echo "  모든 서버 시작 완료!"
echo "=========================================="
echo ""
echo "서버 목록:"
echo "  - SensorMonitor:    http://192.168.0.31:5000"
echo "  - cert-guide:       http://192.168.0.31:4000"
echo "  - edu Frontend:     http://192.168.0.31:3001"
echo "  - edu Backend:      http://192.168.0.31:3000"
echo "  - Device Info:      http://192.168.0.31:8080"
echo ""
echo "상태 확인: http://192.168.0.31:8080"
echo ""

# 프로세스 확인
echo "실행 중인 Node 프로세스:"
ps aux | grep node | grep -v grep | awk '{print "  PID: "$2" - "$11" "$12}'
