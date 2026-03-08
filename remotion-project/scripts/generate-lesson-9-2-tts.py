#!/usr/bin/env python3
"""
Level 9-2: 데이터 수집/준비
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-2"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-2, 데이터 수집과 준비입니다.
AI 모델의 성능은 데이터 품질에 달려있습니다.
번호판 인식을 위한 이미지 수집, 라벨링, 전처리 방법을 배웁니다.""",

    "collection": """데이터 수집 방법을 알아봅니다.
직접 촬영, 공개 데이터셋 활용, 웹 크롤링 등 다양한 방법이 있습니다.
주간, 야간, 맑음, 비, 다양한 환경을 포함해야 합니다.
최소 1000장 이상 수집을 권장합니다. 많을수록 좋습니다.""",

    "labeling": """라벨링은 AI 학습의 핵심입니다.
번호판 검출을 위해 바운딩 박스 좌표를 표시합니다.
문자 인식을 위해 번호판 텍스트를 입력합니다.
라벨미, 시버트 같은 도구를 사용하면 편리합니다.""",

    "format": """라벨 포맷을 살펴봅시다.
YOLO 포맷은 클래스 번호와 중심점 좌표, 너비, 높이를 사용합니다.
COCO 포맷은 JSON으로 상세한 어노테이션을 저장합니다.
프로젝트에 맞는 포맷을 선택하고 일관성을 유지하세요.""",

    "augmentation": """데이터 증강으로 학습 데이터를 늘립니다.
회전, 밝기 조절, 노이즈 추가, 블러 적용 등이 있습니다.
다양한 환경을 시뮬레이션해서 모델의 일반화 성능을 높입니다.
알부멘테이션 라이브러리를 추천합니다.""",

    "split": """데이터를 학습, 검증, 테스트 세트로 분할합니다.
일반적으로 7대 2대 1 비율을 사용합니다.
같은 차량이 여러 세트에 나뉘지 않도록 주의하세요.
계층적 샘플링으로 클래스 분포를 유지합니다.""",

    "outro": """데이터 준비가 완료되었습니다.
품질 좋은 데이터가 좋은 모델의 시작입니다.
다음 레슨에서는 번호판 검출 모델을 학습합니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-2 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
