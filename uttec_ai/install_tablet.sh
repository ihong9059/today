#!/bin/bash
# ============================================================
# UTTEC AI - Lenovo Tab M9 설치 스크립트
# Termux에서 실행
# ============================================================

echo "╔══════════════════════════════════════╗"
echo "║  UTTEC AI 설치 스크립트              ║"
echo "║  Lenovo Tab M9 (Termux)              ║"
echo "╚══════════════════════════════════════╝"
echo ""

# 1. 패키지 업데이트
echo "📦 패키지 업데이트 중..."
pkg update -y && pkg upgrade -y

# 2. Python 설치
echo "🐍 Python 설치 중..."
pkg install python -y

# 3. pip 업그레이드
echo "📥 pip 업그레이드 중..."
pip install --upgrade pip

# 4. 필요한 라이브러리 설치
echo "📚 라이브러리 설치 중..."
pip install requests

# 5. 폴더 생성
echo "📁 폴더 생성 중..."
mkdir -p ~/uttec_ai

# 6. 완료 메시지
echo ""
echo "✅ 설치 완료!"
echo ""
echo "다음 단계:"
echo "1. uttec_ai.py 파일을 ~/uttec_ai/ 에 복사"
echo "2. cd ~/uttec_ai"
echo "3. python uttec_ai.py"
echo ""
