#!/bin/bash
# ============================================================
# DigitalOcean GPU Droplet - AI 벤치마크 환경 설정 스크립트
# 사용법: bash setup_do_gpu.sh
# ============================================================

set -e

echo "============================================================"
echo "  DigitalOcean GPU - AI 벤치마크 환경 설정"
echo "============================================================"
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 시스템 업데이트
echo -e "${YELLOW}[1/6] 시스템 업데이트...${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}[1/6] 완료${NC}"
echo ""

# 2. GPU 확인
echo -e "${YELLOW}[2/6] GPU 확인...${NC}"
nvidia-smi
echo -e "${GREEN}[2/6] 완료${NC}"
echo ""

# 3. Python 가상환경 생성
echo -e "${YELLOW}[3/6] Python 가상환경 생성...${NC}"
python3 -m venv /opt/ai-benchmark
source /opt/ai-benchmark/bin/activate
pip install --upgrade pip
echo -e "${GREEN}[3/6] 완료${NC}"
echo ""

# 4. PyTorch (CUDA 12.1) 설치
echo -e "${YELLOW}[4/6] PyTorch (CUDA) 설치...${NC}"
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
echo -e "${GREEN}[4/6] 완료${NC}"
echo ""

# 5. 추가 패키지 설치
echo -e "${YELLOW}[5/6] 추가 패키지 설치...${NC}"
pip install easyocr opencv-python-headless pillow numpy
echo -e "${GREEN}[5/6] 완료${NC}"
echo ""

# 6. 설치 확인
echo -e "${YELLOW}[6/6] 설치 확인...${NC}"
python -c "
import torch
print(f'PyTorch: {torch.__version__}')
print(f'CUDA available: {torch.cuda.is_available()}')
if torch.cuda.is_available():
    print(f'GPU: {torch.cuda.get_device_name(0)}')
    print(f'CUDA version: {torch.version.cuda}')
"
echo -e "${GREEN}[6/6] 완료${NC}"
echo ""

# 작업 디렉토리 생성
mkdir -p /opt/ai-benchmark/aiTest/test/data
mkdir -p /opt/ai-benchmark/aiTest/boltTest/data
mkdir -p /opt/ai-benchmark/aiTest/boltTest/benchmark

echo "============================================================"
echo -e "${GREEN}  설정 완료!${NC}"
echo "============================================================"
echo ""
echo "다음 단계:"
echo "  1. 로컬에서 코드 업로드:"
echo "     scp -r aiTest do-gpu:/opt/ai-benchmark/"
echo ""
echo "  2. 벤치마크 실행:"
echo "     source /opt/ai-benchmark/bin/activate"
echo "     cd /opt/ai-benchmark/aiTest/test"
echo "     python plate_ocr_benchmark.py"
echo ""
echo "     cd /opt/ai-benchmark/aiTest/boltTest"
echo "     python src/benchmark.py"
echo ""
echo "  3. 결과 다운로드 (로컬에서):"
echo "     scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_*.json ./"
echo "     scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_*.json ./"
echo ""
