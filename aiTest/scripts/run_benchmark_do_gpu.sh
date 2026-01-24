#!/bin/bash
# ============================================================
# DigitalOcean GPU - 벤치마크 실행 스크립트
# 사용법: bash run_benchmark_do_gpu.sh
# ============================================================

set -e

echo "============================================================"
echo "  DigitalOcean GPU - AI 벤치마크 실행"
echo "============================================================"
echo ""

# 가상환경 활성화
source /opt/ai-benchmark/bin/activate

# GPU 상태 확인
echo "[0] GPU 상태 확인"
nvidia-smi --query-gpu=name,memory.total,memory.free --format=csv
echo ""

# 번호판 OCR 벤치마크
echo "============================================================"
echo "[1] 번호판 OCR 벤치마크"
echo "============================================================"
cd /opt/ai-benchmark/aiTest/test

if [ -f "plate_ocr_benchmark.py" ]; then
    python plate_ocr_benchmark.py
    echo ""
    echo "결과 파일: $(ls -la benchmark_result_*.json 2>/dev/null || echo '없음')"
else
    echo "plate_ocr_benchmark.py 파일이 없습니다."
    echo "먼저 코드를 업로드하세요: scp -r aiTest do-gpu:/opt/ai-benchmark/"
fi
echo ""

# 볼트 품질검사 벤치마크
echo "============================================================"
echo "[2] 볼트 품질검사 벤치마크"
echo "============================================================"
cd /opt/ai-benchmark/aiTest/boltTest

if [ -f "src/benchmark.py" ]; then
    python src/benchmark.py
    echo ""
    echo "결과 파일: $(ls -la benchmark/benchmark_result_*.json 2>/dev/null || echo '없음')"
else
    echo "src/benchmark.py 파일이 없습니다."
    echo "먼저 코드를 업로드하세요: scp -r aiTest do-gpu:/opt/ai-benchmark/"
fi
echo ""

# 결과 요약
echo "============================================================"
echo "  벤치마크 완료"
echo "============================================================"
echo ""
echo "결과 파일 다운로드 (로컬에서 실행):"
echo "  scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_*.json ./"
echo "  scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_*.json ./"
echo ""
echo "테스트 완료 후 Droplet 삭제를 잊지 마세요!"
echo ""
