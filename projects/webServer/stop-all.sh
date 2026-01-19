#!/bin/bash
# Web Server 중지 스크립트 (Mac/Linux)
# 작성일: 2026-01-19

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Web Server 중지 스크립트${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 포트별로 프로세스 종료
stop_port() {
    local port=$1
    local name=$2
    local pid=$(lsof -t -i:$port 2>/dev/null)

    if [ -n "$pid" ]; then
        kill $pid 2>/dev/null
        echo -e "${GREEN}[$name]${NC} 중지됨 (포트: $port, PID: $pid)"
    else
        echo -e "${YELLOW}[$name]${NC} 실행 중이 아님 (포트: $port)"
    fi
}

stop_port 8080 "Device Info"
stop_port 5000 "SensorMonitor"
stop_port 8000 "SNU Consulting"
stop_port 3000 "cert-guide"

echo ""
echo -e "${GREEN}모든 서비스 중지 완료${NC}"
echo ""
