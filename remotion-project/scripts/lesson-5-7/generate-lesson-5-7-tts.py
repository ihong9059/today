#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-7: 전이 학습"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-7"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 전이 학습에 대해 배워봅니다.
전이 학습은 거인의 어깨 위에 서는 것과 같습니다.
수백만 장의 이미지로 학습된 모델의 지식을 가져와서
내 작은 데이터셋에 활용하는 거예요.
처음부터 학습하는 것보다 훨씬 효율적입니다.
""",

    "scene2_concept": """
전이 학습이 왜 효과적일까요?
CNN의 초기 층은 엣지, 텍스처 같은 일반적인 특징을 학습합니다.
이런 특징은 어떤 이미지에서든 유용해요.
그래서 ImageNet으로 학습된 모델의 초기 층은
다른 이미지 분류 문제에도 그대로 사용할 수 있습니다.
""",

    "scene3_methods": """
전이 학습의 두 가지 방법을 알아봅시다.
첫 번째는 특성 추출기로 사용하는 방법입니다.
사전 학습된 모델의 가중치를 동결하고, 마지막 분류기만 학습해요.
두 번째는 파인튜닝입니다.
전체 모델을 작은 학습률로 미세 조정하는 방법이에요.
데이터가 많으면 파인튜닝, 적으면 특성 추출기가 좋습니다.
""",

    "scene4_pretrained": """
PyTorch에서 사전 학습된 모델을 불러오는 방법을 알아봅시다.
torchvision.models에서 ResNet, VGG 등을 쉽게 불러올 수 있어요.
weights 파라미터로 ImageNet 가중치를 지정하면 됩니다.
모델을 불러온 후 마지막 FC 레이어를 내 클래스 수에 맞게 교체합니다.
그리고 다른 레이어들의 requires_grad를 False로 설정하면 동결돼요.
""",

    "scene5_finetuning": """
파인튜닝을 할 때 주의할 점이 있어요.
학습률을 아주 작게 설정해야 합니다. 보통 0.0001 이하로요.
왜냐하면 이미 좋은 특징을 학습한 가중치를 크게 바꾸면 안 되니까요.
초기 층은 더 작은 학습률, 마지막 층은 더 큰 학습률을 사용하는
층별 학습률 설정도 효과적입니다.
""",

    "scene6_results": """
전이 학습의 놀라운 효과를 확인해 봅시다.
적은 데이터로도 높은 정확도를 얻을 수 있어요.
예를 들어, 개와 고양이 분류에서
처음부터 학습하면 수천 장이 필요하지만,
전이 학습을 사용하면 수백 장으로도 90% 이상의 정확도를 얻습니다.
학습 시간도 훨씬 짧아요.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
전이 학습은 사전 학습된 모델의 지식을 활용하는 방법입니다.
특성 추출기는 가중치를 동결하고 분류기만 학습하고,
파인튜닝은 전체를 작은 학습률로 미세 조정해요.
적은 데이터로도 높은 성능을 얻을 수 있어서 실무에서 많이 사용됩니다.
다음 시간에는 데이터 증강에 대해 더 자세히 배워보겠습니다!
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
    print("Generating TTS for Lesson 5-7: 전이 학습")
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
