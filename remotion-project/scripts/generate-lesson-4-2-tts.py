#!/usr/bin/env python3
"""
Lesson 4-2: 이미지 분류 CNN - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-2"

SCENES = {
    "scene1_intro": """
오늘은 CNN으로 이미지를 분류하는 방법을 배워봅니다.
CNN은 Convolutional Neural Network의 약자예요.
컴퓨터 비전의 핵심 기술입니다.

이미지 분류란 사진을 보고 어떤 종류인지 맞추는 거예요.
고양이인지, 개인지, 자동차인지 구분하는 거죠.

MLP로도 할 수 있지만, CNN이 훨씬 효과적입니다.
왜 그런지 알아볼게요.
""",
    "scene2_mlp_problem": """
MLP로 이미지를 분류할 때 문제점이 있어요.

첫째, 이미지를 1차원으로 펼쳐야 합니다.
32 곱하기 32 이미지는 1024개의 숫자가 되는데,
이렇게 하면 공간 정보가 사라져요.
위아래, 좌우 관계를 모르게 되는 거죠.

둘째, 파라미터가 너무 많아요.
1024개 입력에 512개 뉴런이면
52만 개의 가중치가 필요해요.
이미지가 커지면 기하급수적으로 늘어납니다.

셋째, 위치 변화에 약해요.
고양이가 왼쪽에 있든 오른쪽에 있든 같은 고양이인데,
MLP는 이걸 다르게 인식할 수 있어요.
""",
    "scene3_cnn_idea": """
CNN은 이 문제들을 어떻게 해결할까요?

세 가지 핵심 아이디어가 있습니다.

첫째, 지역 연결입니다.
전체 이미지가 아니라 작은 영역, 예를 들어 3 곱하기 3 영역만 봐요.
이렇게 하면 공간 정보가 보존됩니다.

둘째, 가중치 공유입니다.
같은 필터를 이미지 전체에 적용해요.
덕분에 파라미터 수가 대폭 줄어듭니다.

셋째, 계층적 특징 학습입니다.
낮은 층에서는 선이나 모서리 같은 단순한 패턴을,
높은 층에서는 눈, 귀 같은 복잡한 패턴을 학습해요.

마치 돋보기로 이미지를 훑으면서 패턴을 찾는 것과 같습니다.
""",
    "scene4_layers": """
CNN의 핵심 레이어들을 살펴봅시다.

첫째, Conv2d, 합성곱 레이어입니다.
필터가 이미지 위를 이동하면서 특징을 추출해요.
커널 사이즈 3, 패딩 1을 쓰면 입력과 출력 크기가 같아집니다.

둘째, MaxPool2d, 최대 풀링입니다.
2 곱하기 2 영역에서 가장 큰 값만 남겨요.
크기가 절반으로 줄어들고, 위치 변화에 강해집니다.

셋째, BatchNorm2d, 배치 정규화입니다.
각 채널의 출력을 표준화해서 학습을 안정시켜요.

일반적인 순서는 Conv, BatchNorm, ReLU, 그리고 MaxPool입니다.
채널 수는 보통 32, 64, 128처럼 2배씩 늘려갑니다.
""",
    "scene5_cifar": """
CIFAR-10 데이터셋을 소개합니다.

MNIST보다 한 단계 어려운 데이터셋이에요.
32 곱하기 32 크기의 컬러 이미지입니다.
RGB 3채널을 가지고 있어요.

10개 클래스가 있는데,
비행기, 자동차, 새, 고양이, 사슴,
개, 개구리, 말, 배, 트럭이에요.

훈련 데이터는 5만 개, 테스트 데이터는 1만 개입니다.

MLP로 CIFAR-10을 분류하면 55퍼센트 정도 나오지만,
CNN을 쓰면 85퍼센트 이상을 달성할 수 있어요!
무려 30퍼센트 이상 차이가 나는 거죠.
""",
    "scene6_model": """
CNN 모델의 구조를 살펴봅시다.

크게 두 부분으로 나뉘어요.
특징 추출부와 분류부입니다.

특징 추출부에서는 Conv 블록을 쌓습니다.
블록 1: 3채널에서 32채널, 크기는 32 곱하기 32
MaxPool 후 16 곱하기 16

블록 2: 32채널에서 64채널
MaxPool 후 8 곱하기 8

블록 3: 64채널에서 128채널
MaxPool 후 4 곱하기 4

그 다음 분류부에서 Flatten으로 1차원으로 펼칩니다.
128 곱하기 4 곱하기 4는 2048이에요.
이것을 256, 그리고 10개 클래스로 줄여나갑니다.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

MLP는 이미지의 공간 정보를 잃어버리고 파라미터가 많아요.
CNN은 지역 연결, 가중치 공유, 계층적 학습으로 이를 해결합니다.

핵심 레이어 세 가지를 배웠어요.
Conv2d는 필터로 특징을 추출하고,
MaxPool2d는 크기를 줄이면서 핵심만 남기고,
BatchNorm2d는 학습을 안정시킵니다.

CNN은 특징 추출부와 분류부로 구성되고,
CIFAR-10에서 MLP보다 30퍼센트 이상 높은 정확도를 달성합니다.

다음 레슨에서는 텍스트 분류를 배워보겠습니다.
그럼 다음 시간에 만나요!
""",
}

async def generate_tts(name: str, text: str):
    """Generate TTS for a single scene"""
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")

    # Clean text
    clean_text = " ".join(text.strip().split())

    print(f"Generating: {name}")
    communicate = edge_tts.Communicate(clean_text, VOICE)
    await communicate.save(output_path)
    print(f"  Saved: {output_path}")

async def main():
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Voice: {VOICE}")
    print(f"Generating {len(SCENES)} scenes...")
    print()

    # Generate all scenes
    for name, text in SCENES.items():
        await generate_tts(name, text)

    print()
    print("All TTS files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
