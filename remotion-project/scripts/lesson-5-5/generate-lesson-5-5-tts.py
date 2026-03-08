#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-5: CNN 구현 (MNIST)"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-5"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 PyTorch로 CNN을 직접 구현해봅니다.
CNN은 이미지의 공간 구조를 이해합니다.
MLP는 이미지를 일렬로 펼쳐서 처리하지만,
CNN은 2D 구조를 유지하며 인접 픽셀 간의 관계를 학습해요.
이것이 이미지 인식에서 CNN이 압도적인 이유입니다.
""",

    "scene2_data": """
먼저 MNIST 데이터를 준비합니다.
MNIST는 28곱하기28 크기의 흑백 손글씨 숫자 이미지입니다.
훈련 데이터 6만 개, 테스트 데이터 1만 개가 있어요.
데이터 변환에서 텐서로 바꾸고, 평균과 표준편차로 정규화합니다.
DataLoader를 사용해서 배치 단위로 데이터를 로딩합니다.
""",

    "scene3_model": """
CNN 모델을 설계해 봅시다.
첫 번째 합성곱 레이어는 1채널 입력을 32채널로 바꾸고,
두 번째는 32채널을 64채널로 확장합니다.
각 합성곱 뒤에는 배치 정규화와 맥스 풀링이 따라옵니다.
마지막으로 Flatten 후 FC 레이어로 10개 클래스를 출력해요.
이 모델은 약 42만 개의 파라미터를 가집니다.
""",

    "scene4_training": """
학습 루프를 구현합니다.
손실 함수는 CrossEntropyLoss, 옵티마이저는 Adam을 사용해요.
에포크마다 훈련 데이터로 모델을 학습하고,
테스트 데이터로 정확도를 평가합니다.
train 모드에서는 배치 정규화와 드롭아웃이 활성화되고,
eval 모드에서는 비활성화되는 것을 기억하세요.
""",

    "scene5_results": """
학습 결과를 확인해 봅시다.
10 에포크만 학습해도 99% 이상의 정확도를 달성할 수 있어요.
학습 곡선을 보면 손실이 꾸준히 감소하고,
훈련 정확도와 테스트 정확도가 함께 올라갑니다.
두 정확도의 차이가 작으면 과적합 없이 잘 학습된 거예요.
""",

    "scene6_prediction": """
학습된 모델로 예측을 해봅시다.
테스트 이미지를 모델에 넣으면 10개 클래스에 대한 점수가 나와요.
argmax로 가장 높은 점수의 클래스를 선택하면 예측 레이블입니다.
대부분의 숫자를 정확하게 맞추고,
가끔 헷갈리는 경우만 틀리는 것을 볼 수 있습니다.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
MNIST 데이터를 transforms와 DataLoader로 준비했고,
CNN 모델은 Conv, BN, ReLU, Pool 순서로 구성했습니다.
Adam 옵티마이저와 CrossEntropy 손실 함수로 학습했고,
99% 이상의 정확도를 달성했어요.
다음 시간에는 더 어려운 CIFAR-10에 도전해 보겠습니다!
"""
}

def generate_tts(text: str, output_path: str, voice: str = "ko-KR-SunHiNeural"):
    text = text.strip().replace("\n", " ")
    cmd = ["edge-tts", "--voice", voice, "--text", text, "--write-media", output_path]
    print(f"Generating: {os.path.basename(output_path)}")
    subprocess.run(cmd, check=True, capture_output=True)
    print(f"  ✓ Created: {output_path}")

def main():
    print("=" * 60)
    print("Generating TTS for Lesson 5-5: CNN 구현 (MNIST)")
    print("=" * 60)
    for scene_name, script in SCRIPTS.items():
        output_path = os.path.join(OUTPUT_DIR, f"{scene_name}.mp3")
        generate_tts(script, output_path)
    print("\n" + "=" * 60)
    print("All TTS files generated successfully!")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    main()
