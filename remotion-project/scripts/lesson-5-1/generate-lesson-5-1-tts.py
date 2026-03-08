#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-1: 컴퓨터 비전 소개"""

import subprocess
import os

# Output directory
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-1"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# TTS scripts for each scene
SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 컴퓨터 비전의 세계로 들어가 봅니다.
컴퓨터 비전이란 무엇일까요?
우리가 눈으로 이미지를 보는 것처럼, 컴퓨터도 이미지를 이해할 수 있게 하는 기술입니다.
핵심은 바로 이것입니다. 컴퓨터에게 이미지는 숫자들의 배열일 뿐입니다.
우리가 보는 고양이 사진은 컴퓨터에게는 수십만 개의 숫자 행렬이에요.
""",

    "scene2_applications": """
컴퓨터 비전은 정말 다양한 곳에서 사용됩니다.
이미지 분류는 고양이와 개를 구분하는 것처럼, 이미지가 어떤 카테고리인지 판별합니다.
객체 탐지는 자율주행 차량에서 다른 차와 사람을 인식하는 데 사용되죠.
스마트폰의 Face ID는 얼굴 인식 기술이고요.
의료 영상 분석은 엑스레이나 CT에서 질병을 자동으로 찾아냅니다.
OCR은 문서에서 텍스트를 추출하고, 자세 추정은 운동할 때 자세를 분석해줍니다.
""",

    "scene3_pixel": """
이제 이미지의 기본 단위인 픽셀에 대해 알아봅시다.
픽셀은 Picture와 Element의 합성어로, 이미지의 가장 작은 단위입니다.
HD 영상은 약 200만 개, 4K 영상은 약 800만 개의 픽셀로 구성되어 있어요.
우리가 자주 사용하는 MNIST 이미지는 28곱하기28, 총 784개의 픽셀로 이루어져 있습니다.
CIFAR-10은 32곱하기32로, 천 24개의 픽셀이죠.
""",

    "scene4_channel": """
다음은 채널의 개념입니다.
흑백 이미지는 1채널로, 각 픽셀이 0에서 255 사이의 밝기 값 하나만 가집니다.
0은 완전한 검정, 255는 완전한 흰색이에요.
컬러 이미지는 3채널, 즉 RGB로 구성됩니다.
빨강, 초록, 파랑 세 가지 색상의 조합으로 모든 색을 표현할 수 있어요.
예를 들어, 빨간색은 RGB 값이 255, 0, 0이고, 노란색은 255, 255, 0입니다.
""",

    "scene5_tensor": """
딥러닝에서 이미지는 텐서, 즉 다차원 배열로 표현됩니다.
PyTorch에서는 이미지를 채널, 높이, 너비 순서로 나타내요. 이걸 C, H, W라고 합니다.
여러 이미지를 한 번에 처리할 때는 배치 차원이 추가되어 N, C, H, W가 됩니다.
예를 들어, 64개의 224곱하기224 컬러 이미지는 64, 3, 224, 224 형태의 텐서가 됩니다.
NumPy에서는 높이, 너비, 채널 순서를 사용하니, 변환할 때 주의가 필요해요.
""",

    "scene6_normalization": """
정규화가 왜 중요할까요?
원본 픽셀값은 0에서 255 범위인데, 이 값이 너무 크면 학습이 불안정해집니다.
그래서 보통 0에서 1 범위로 바꾸거나, 마이너스 1에서 1 범위로 정규화합니다.
가장 간단한 방법은 픽셀 값을 255로 나누는 거예요.
정규화를 하면 학습이 안정적이고, 수렴 속도도 빨라집니다.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
픽셀은 이미지의 최소 단위이고, 0에서 255의 밝기 값을 가집니다.
채널은 색상 정보를 나타내며, 흑백은 1채널, 컬러는 3채널 RGB입니다.
텐서 shape에서 PyTorch는 N, C, H, W 순서를 사용합니다.
정규화는 학습 안정성을 위해 필수입니다.
다음 시간에는 CNN의 핵심인 합성곱 연산에 대해 배워보겠습니다!
"""
}

def generate_tts(text: str, output_path: str, voice: str = "ko-KR-SunHiNeural"):
    """Generate TTS audio using edge-tts"""
    # Clean up text
    text = text.strip().replace("\n", " ")

    cmd = [
        "edge-tts",
        "--voice", voice,
        "--text", text,
        "--write-media", output_path
    ]

    print(f"Generating: {os.path.basename(output_path)}")
    subprocess.run(cmd, check=True, capture_output=True)
    print(f"  ✓ Created: {output_path}")

def main():
    print("=" * 60)
    print("Generating TTS for Lesson 5-1: 컴퓨터 비전 소개")
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
