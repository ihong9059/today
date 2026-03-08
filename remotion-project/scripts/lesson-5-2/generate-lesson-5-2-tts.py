#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-2: 합성곱 연산"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-2"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 CNN의 핵심인 합성곱 연산에 대해 배워봅니다.
합성곱은 작은 창문으로 이미지를 훑으면서 특징을 찾아내는 연산입니다.
돋보기로 신문을 읽는다고 상상해보세요.
돋보기, 즉 커널을 이미지 위에서 한 칸씩 이동하면서 패턴을 감지하는 거예요.
""",

    "scene2_mlp_vs_cnn": """
MLP와 CNN의 차이점을 알아볼까요?
MLP는 이미지를 일렬로 펼쳐서 처리합니다. 그래서 공간 정보가 손실되죠.
하지만 CNN은 2D 구조를 그대로 유지합니다.
그래서 인접한 픽셀들 사이의 관계를 학습할 수 있어요.
또한 가중치를 공유하기 때문에 파라미터 수도 훨씬 적습니다.
""",

    "scene3_convolution": """
합성곱 계산은 어떻게 할까요?
커널과 이미지 영역을 요소별로 곱한 다음 모두 더합니다.
예를 들어, 3곱하기3 커널이 이미지 위를 슬라이딩하면서
각 위치에서 계산한 값들이 모여 특성 맵이 됩니다.
이 과정을 이미지 전체에서 반복하면 특징 맵이 완성됩니다.
""",

    "scene4_kernel": """
커널은 학습 가능한 작은 가중치 행렬입니다.
각 커널은 특정 패턴을 감지하는 역할을 해요.
예를 들어, 수평 엣지 검출 커널은 가로선을 찾고,
수직 엣지 검출 커널은 세로선을 찾습니다.
가장 많이 사용되는 크기는 3곱하기3입니다.
""",

    "scene5_stride_padding": """
스트라이드와 패딩에 대해 알아봅시다.
스트라이드는 커널이 이동하는 칸 수입니다.
기본값은 1이고, 2로 설정하면 출력 크기가 절반으로 줄어들어요.
패딩은 이미지 가장자리에 값을 추가하는 것입니다.
패딩을 사용하면 합성곱 후에도 크기를 유지할 수 있어요.
출력 크기는 입력에서 커널을 빼고 스트라이드로 나눈 뒤 1을 더하면 됩니다.
""",

    "scene6_pytorch": """
PyTorch에서 합성곱은 Conv2d로 구현합니다.
입력 채널, 출력 채널, 커널 크기를 지정하면 돼요.
예를 들어, 3채널 입력에 64개 필터, 3곱하기3 커널이면
파라미터 수는 64 곱하기 3 곱하기 3 곱하기 3, 약 1,700개입니다.
여기에 편향 64개를 더하면 총 파라미터가 됩니다.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
합성곱은 커널과 이미지 영역의 곱의 합으로 특징을 추출합니다.
커널은 보통 3곱하기3 크기를 사용하고, 학습을 통해 최적화됩니다.
스트라이드가 크면 출력이 작아지고, 패딩으로 크기를 유지할 수 있어요.
다음 시간에는 풀링과 정규화에 대해 배워보겠습니다!
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
    print("Generating TTS for Lesson 5-2: 합성곱 연산")
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
