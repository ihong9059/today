#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-4: CNN 아키텍처"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-4"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 유명한 CNN 아키텍처들을 살펴봅니다.
CNN의 역사는 더 깊게, 더 효율적으로의 여정입니다.
LeNet의 5층에서 시작해 VGG의 19층, ResNet의 152층까지.
깊이가 깊어질수록 더 복잡한 패턴을 학습할 수 있게 되었습니다.
""",

    "scene2_lenet": """
1998년에 등장한 LeNet-5는 CNN의 원조 할아버지입니다.
손글씨 숫자 인식을 위해 설계되었고,
현대 CNN의 모든 핵심 요소를 이미 갖추고 있었어요.
합성곱과 풀링의 조합, 가중치 공유, 계층적 특징 추출.
이 모든 것이 LeNet에서 시작되었습니다.
""",

    "scene3_alexnet": """
2012년 AlexNet은 딥러닝 르네상스의 시작입니다.
ImageNet 대회에서 기존 방법들을 압도적으로 이기며 딥러닝 시대를 열었죠.
ReLU 활성화 함수로 학습 속도를 6배 향상시키고,
Dropout으로 과적합을 방지하고, GPU로 병렬 학습을 했습니다.
데이터 증강 기법도 이때 도입되었어요.
""",

    "scene4_vgg": """
2014년 VGG는 단순함의 미학을 보여줬습니다.
핵심 아이디어는 간단해요. 3곱하기3 필터만 사용하자!
왜 3곱하기3일까요?
7곱하기7 필터 1개와 3곱하기3 필터 3개는 같은 영역을 커버하는데,
3곱하기3을 쓰면 파라미터는 45% 적고, 비선형성은 더 많아집니다.
""",

    "scene5_comparison": """
CNN 아키텍처의 발전을 비교해 볼까요?
LeNet은 1998년에 5층으로 시작해 6만 개의 파라미터를 가졌어요.
AlexNet은 2012년에 8층, 6천만 개로 딥러닝 시대를 열었고,
VGG는 2014년에 19층, 1억 4천만 개로 깊이의 힘을 증명했습니다.
이후 ResNet은 스킵 연결로 152층까지 깊어졌어요.
""",

    "scene6_principles": """
현대 CNN 설계의 원칙을 알아봅시다.
작은 필터인 3곱하기3을 선호하고,
모든 합성곱 뒤에 배치 정규화를 적용합니다.
활성화 함수는 ReLU나 그 변형을 사용하고,
네트워크가 매우 깊으면 스킵 연결이 필수입니다.
마지막으로 Global Average Pooling으로 FC 레이어를 대체하는 추세예요.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
LeNet은 1998년에 CNN의 기본 구조를 확립했습니다.
AlexNet은 2012년에 ReLU, Dropout, GPU를 도입했어요.
VGG는 2014년에 3곱하기3 필터와 깊이의 힘을 보여줬습니다.
다음 시간에는 직접 CNN을 구현해서 MNIST를 분류해 보겠습니다!
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
    print("Generating TTS for Lesson 5-4: CNN 아키텍처")
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
