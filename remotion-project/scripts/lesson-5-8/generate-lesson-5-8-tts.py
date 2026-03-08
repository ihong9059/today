#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-8: 데이터 증강"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-8"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 데이터 증강에 대해 배워봅니다.
데이터 증강은 적은 데이터로 더 많은 데이터를 만드는 마법입니다.
같은 이미지를 돌리고, 뒤집고, 색상을 바꾸면
모델이 다양한 상황을 학습할 수 있어요.
과적합을 방지하고 일반화 성능을 높이는 핵심 기법입니다.
""",

    "scene2_why": """
왜 데이터 증강이 필요할까요?
딥러닝 모델은 데이터를 많이 필요로 하는데,
실제로 라벨링된 데이터를 많이 모으기는 어렵습니다.
데이터 증강을 사용하면 기존 데이터를 변형해서
실질적으로 학습 데이터를 늘릴 수 있어요.
모델이 다양한 변형에 강건해지는 효과도 있습니다.
""",

    "scene3_geometric": """
기하학적 변환부터 알아봅시다.
좌우 반전은 가장 간단하고 효과적인 방법이에요.
회전은 지정한 각도 범위 내에서 랜덤하게 돌립니다.
랜덤 크롭은 이미지의 일부를 잘라서 사용하고,
크기 조정은 이미지를 확대하거나 축소합니다.
이런 변환으로 모델이 위치 변화에 강건해져요.
""",

    "scene4_color": """
색상 변환에 대해 알아봅시다.
밝기 조정은 이미지를 밝게 또는 어둡게 만들고,
대비 조정은 색상 차이를 강하게 또는 약하게 해요.
채도 조정은 색의 선명함을, 색조 조정은 색깔 자체를 바꿉니다.
ColorJitter로 이 모든 것을 한 번에 적용할 수 있어요.
조명 조건이 달라져도 잘 인식하도록 학습됩니다.
""",

    "scene5_advanced": """
고급 증강 기법도 있습니다.
CutOut은 이미지의 일부를 검은색으로 가리는 방법이에요.
모델이 전체 맥락을 보도록 유도합니다.
MixUp은 두 이미지를 섞어서 새로운 이미지를 만들고,
CutMix는 한 이미지 위에 다른 이미지 조각을 붙입니다.
이런 기법들은 정규화 효과가 있어서 일반화 성능이 좋아져요.
""",

    "scene6_pytorch": """
PyTorch에서 데이터 증강을 적용해 봅시다.
transforms.Compose로 여러 변환을 연결합니다.
훈련할 때만 증강을 적용하고, 테스트할 때는 적용하지 않아요.
주의할 점은 훈련과 테스트에서 정규화 값은 동일하게 유지하는 겁니다.
증강은 무작위로 적용되기 때문에 같은 이미지도 매번 다르게 보여요.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
데이터 증강은 기존 데이터를 변형해서 학습 데이터를 늘리는 방법입니다.
기하학적 변환으로는 반전, 회전, 크롭이 있고,
색상 변환으로는 밝기, 대비, 채도 조정이 있어요.
CutOut, MixUp, CutMix 같은 고급 기법도 효과적입니다.
Level 5 CNN과 이미지 처리를 완료했습니다. 축하드려요!
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
    print("Generating TTS for Lesson 5-8: 데이터 증강")
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
