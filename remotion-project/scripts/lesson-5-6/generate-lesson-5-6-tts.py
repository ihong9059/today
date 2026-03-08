#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-6: CNN 구현 (CIFAR-10)"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-6"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 CIFAR-10 데이터셋에 도전합니다.
실제 이미지는 MNIST보다 훨씬 복잡해요.
CIFAR-10은 컬러 이미지에 다양한 배경, 다양한 물체 위치를 가집니다.
이를 해결하려면 더 깊은 네트워크와 데이터 증강이 필요합니다.
""",

    "scene2_dataset": """
CIFAR-10과 MNIST를 비교해 볼까요?
MNIST는 28곱하기28 흑백 이미지이고, CIFAR-10은 32곱하기32 컬러 이미지입니다.
MNIST는 검정 배경에 숫자만 있지만,
CIFAR-10은 비행기, 자동차, 새, 고양이 등 10가지 사물이
복잡한 배경과 함께 있어서 훨씬 어렵습니다.
""",

    "scene3_augmentation": """
데이터 증강 기법을 적용해 봅시다.
훈련할 때 이미지를 좌우 반전하거나 랜덤하게 자르면
같은 데이터로 더 다양한 패턴을 학습할 수 있어요.
테스트할 때는 증강 없이 원본 이미지만 사용합니다.
이렇게 하면 모델이 다양한 상황에 강건해집니다.
""",

    "scene4_deeper_cnn": """
CIFAR-10을 위해 더 깊은 CNN을 설계합니다.
3채널 컬러 입력을 받아서 점점 채널 수를 늘려가요.
32, 64, 128 채널로 확장하면서 크기는 풀링으로 줄입니다.
각 블록은 2개의 합성곱 레이어를 포함하고,
배치 정규화와 드롭아웃으로 정규화합니다.
파라미터 수는 약 60만 개 정도가 됩니다.
""",

    "scene5_training": """
학습 설정을 살펴봅시다.
배치 크기는 128, 옵티마이저는 Adam에 학습률은 0.001입니다.
50 에포크 정도 학습하면 80% 이상의 정확도를 얻을 수 있어요.
학습률 스케줄러를 사용하면 더 좋은 결과를 얻을 수 있습니다.
MNIST보다 에포크가 많이 필요한 건 데이터가 더 복잡하기 때문이에요.
""",

    "scene6_analysis": """
학습 결과를 분석해 봅시다.
클래스별 정확도를 보면 비행기와 배는 잘 맞추는데,
고양이와 개는 헷갈리는 경우가 많아요.
혼동 행렬을 그려보면 어떤 클래스가 서로 혼동되는지 알 수 있습니다.
이런 분석을 통해 모델 개선 방향을 찾을 수 있어요.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
CIFAR-10은 32곱하기32 컬러 이미지로 MNIST보다 어렵습니다.
데이터 증강으로 좌우 반전, 랜덤 크롭을 적용했고,
더 깊은 CNN 구조로 80% 이상의 정확도를 달성했어요.
다음 시간에는 전이 학습으로 더 적은 데이터로 높은 성능을 얻는 방법을 배웁니다!
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
    print("Generating TTS for Lesson 5-6: CNN 구현 (CIFAR-10)")
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
