#!/bin/bash
# ============================================================
# UTTEC AI - Lenovo Tab M9 전체 설치 스크립트
# 온라인(Gemini) + 오프라인(TinyLlama) 듀얼 모드
# Termux에서 실행
# ============================================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  UTTEC AI 전체 설치 스크립트                         ║"
echo "║  Lenovo Tab M9 (Termux)                              ║"
echo "║  온라인(Gemini) + 오프라인(TinyLlama)                ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ============================================================
# 1단계: 기본 패키지 설치
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 [1/5] 기본 패키지 설치"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

pkg update -y && pkg upgrade -y
pkg install -y python git cmake make clang wget

pip install --upgrade pip
pip install requests

echo "✅ 기본 패키지 설치 완료"
echo ""

# ============================================================
# 2단계: llama.cpp 설치
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 [2/5] llama.cpp 설치 (10~15분 소요)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd ~

if [ -d "llama.cpp" ]; then
    echo "llama.cpp 폴더가 이미 존재합니다. 업데이트 중..."
    cd llama.cpp
    git pull
else
    echo "llama.cpp 클론 중..."
    git clone https://github.com/ggerganov/llama.cpp.git
    cd llama.cpp
fi

echo "컴파일 중... (시간이 걸립니다)"
make clean
make -j4

if [ -f "main" ]; then
    echo "✅ llama.cpp 설치 완료"
else
    echo "❌ llama.cpp 컴파일 실패"
    echo "   수동으로 'cd ~/llama.cpp && make' 실행해 보세요"
fi
echo ""

# ============================================================
# 3단계: TinyLlama 모델 다운로드
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📥 [3/5] TinyLlama 모델 다운로드 (~670MB)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

mkdir -p ~/models
cd ~/models

MODEL_FILE="tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
MODEL_URL="https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"

if [ -f "$MODEL_FILE" ]; then
    echo "모델이 이미 존재합니다."
else
    echo "다운로드 중... (Wi-Fi 권장)"
    wget -c "$MODEL_URL" -O "$MODEL_FILE"

    if [ -f "$MODEL_FILE" ]; then
        echo "✅ 모델 다운로드 완료"
    else
        echo "❌ 다운로드 실패. 나중에 다시 시도하세요:"
        echo "   wget -c $MODEL_URL -O ~/models/$MODEL_FILE"
    fi
fi
echo ""

# ============================================================
# 4단계: UTTEC AI 설치
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 [4/5] UTTEC AI 설치"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

mkdir -p ~/uttec_ai
cd ~/uttec_ai

echo "✅ UTTEC AI 폴더 생성 완료"
echo "   uttec_ai_dual.py 파일을 ~/uttec_ai/ 에 복사하세요"
echo ""

# ============================================================
# 5단계: 설치 확인
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ [5/5] 설치 확인"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "설치 상태:"
echo "─────────────────────────────────────"

# Python
if command -v python &> /dev/null; then
    echo "✅ Python: $(python --version)"
else
    echo "❌ Python: 미설치"
fi

# requests
if python -c "import requests" 2>/dev/null; then
    echo "✅ requests: 설치됨"
else
    echo "❌ requests: 미설치"
fi

# llama.cpp
if [ -f ~/llama.cpp/main ]; then
    echo "✅ llama.cpp: 설치됨"
else
    echo "❌ llama.cpp: 미설치"
fi

# TinyLlama
if [ -f ~/models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf ]; then
    SIZE=$(du -h ~/models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf | cut -f1)
    echo "✅ TinyLlama: 설치됨 ($SIZE)"
else
    echo "❌ TinyLlama: 미설치"
fi

echo "─────────────────────────────────────"
echo ""

# ============================================================
# 완료
# ============================================================
echo "╔══════════════════════════════════════════════════════╗"
echo "║  🎉 설치 완료!                                       ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  다음 단계:                                          ║"
echo "║  1. uttec_ai_dual.py 를 ~/uttec_ai/ 에 복사         ║"
echo "║  2. cd ~/uttec_ai                                    ║"
echo "║  3. python uttec_ai_dual.py                          ║"
echo "║                                                      ║"
echo "║  사용법:                                             ║"
echo "║  - /online  : 온라인 모드 (Gemini, 빠름)            ║"
echo "║  - /offline : 오프라인 모드 (TinyLlama, 느림)       ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
