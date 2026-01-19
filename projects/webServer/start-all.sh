#!/bin/bash
# Web Server 실행 스크립트 (Mac/Linux)
# 작성일: 2026-01-19

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Web Server 시작 스크립트${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 함수: 서비스 시작
start_service() {
    local name=$1
    local port=$2
    local dir=$3
    local cmd=$4

    echo -e "${YELLOW}[$name]${NC} 시작 중... (포트: $port)"

    # 이미 포트가 사용 중인지 확인
    if lsof -i :$port > /dev/null 2>&1; then
        echo -e "${RED}  -> 포트 $port 이미 사용 중${NC}"
        return 1
    fi

    cd "$SCRIPT_DIR/$dir" 2>/dev/null || { echo -e "${RED}  -> 디렉토리 없음: $dir${NC}"; return 1; }

    # 백그라운드로 실행
    nohup $cmd > server.log 2>&1 &
    local pid=$!

    sleep 2

    if kill -0 $pid 2>/dev/null; then
        echo -e "${GREEN}  -> 시작됨 (PID: $pid)${NC}"
    else
        echo -e "${RED}  -> 시작 실패${NC}"
        return 1
    fi

    cd "$SCRIPT_DIR"
}

# 1. Device Info Server (포트 8080)
start_service "Device Info" 8080 "device-info" "node server.js"

# 2. SensorMonitor (포트 5000)
start_service "SensorMonitor" 5000 "SensorMonitor/server" "node server.js"

# 3. SNU Consulting (포트 8000)
echo -e "${YELLOW}[SNU Consulting]${NC} 시작 중... (포트: 8000)"
if lsof -i :8000 > /dev/null 2>&1; then
    echo -e "${RED}  -> 포트 8000 이미 사용 중${NC}"
else
    cd "$SCRIPT_DIR/snu-consulting" 2>/dev/null && {
        nohup python3 -m http.server 8000 > server.log 2>&1 &
        echo -e "${GREEN}  -> 시작됨 (PID: $!)${NC}"
    } || echo -e "${RED}  -> 디렉토리 없음${NC}"
fi
cd "$SCRIPT_DIR"

# 4. cert-guide (포트 3000) - npm 의존성 확인 필요
echo -e "${YELLOW}[cert-guide]${NC} 확인 중... (포트: 3000)"
if [ -d "cert-guide" ]; then
    if [ ! -d "cert-guide/node_modules" ]; then
        echo -e "${YELLOW}  -> npm install 필요 (직접 실행해주세요)${NC}"
        echo -e "${YELLOW}     cd cert-guide && npm install && npm run dev${NC}"
    else
        if lsof -i :3000 > /dev/null 2>&1; then
            echo -e "${RED}  -> 포트 3000 이미 사용 중${NC}"
        else
            cd "$SCRIPT_DIR/cert-guide"
            nohup npm run dev > server.log 2>&1 &
            echo -e "${GREEN}  -> 시작됨 (PID: $!)${NC}"
            cd "$SCRIPT_DIR"
        fi
    fi
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}서비스 상태 확인:${NC}"
echo -e "  http://localhost:8080  (Device Info)"
echo -e "  http://localhost:5000  (SensorMonitor)"
echo -e "  http://localhost:8000  (SNU Consulting)"
echo -e "  http://localhost:3000  (cert-guide)"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}모든 서버 중지: ${NC}killall node; pkill -f 'http.server'"
echo ""
