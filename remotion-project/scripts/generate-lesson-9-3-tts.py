#!/usr/bin/env python3
"""
Level 9-3: 번호판 검출 모델 (YOLO)
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-3"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-3, 번호판 검출 모델입니다.
YOLO를 사용해서 이미지에서 번호판 위치를 찾아내는 모델을 학습합니다.
객체 검출의 핵심 개념과 실제 학습 과정을 배웁니다.""",

    "yolo": """YOLO는 You Only Look Once의 약자입니다.
이미지를 한 번만 보고 객체의 위치와 클래스를 동시에 예측합니다.
실시간 처리가 가능할 정도로 빠르면서도 정확합니다.
최신 버전인 YOLOv8을 사용하겠습니다.""",

    "architecture": """YOLO의 동작 원리를 살펴봅시다.
이미지를 그리드로 나누고 각 셀이 객체를 담당합니다.
각 셀은 바운딩 박스 좌표, 신뢰도, 클래스 확률을 예측합니다.
NMS, 비최대 억제로 중복 박스를 제거합니다.""",

    "training": """모델 학습을 시작합니다.
YOLOv8은 울트라리틱스 라이브러리로 쉽게 사용할 수 있습니다.
사전 학습된 가중치에서 시작해 전이 학습을 진행합니다.
배치 크기, 에포크, 이미지 크기 등 하이퍼파라미터를 설정합니다.""",

    "metrics": """학습 결과를 평가합니다.
mAP, 평균 정밀도는 검출 모델의 핵심 지표입니다.
Precision은 검출한 것 중 실제 번호판 비율입니다.
Recall은 실제 번호판 중 검출한 비율입니다.""",

    "inference": """학습된 모델로 추론을 수행합니다.
새 이미지를 넣으면 번호판 위치가 바운딩 박스로 출력됩니다.
신뢰도 임계값을 조정해서 검출 민감도를 조절합니다.
GPU를 사용하면 실시간 처리도 가능합니다.""",

    "outro": """번호판 검출 모델 학습을 완료했습니다.
YOLO로 빠르고 정확한 객체 검출이 가능합니다.
다음 레슨에서는 검출된 번호판에서 문자를 인식하는 모델을 만듭니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-3 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
