#!/usr/bin/env python3
"""Generate TTS audio files for Lesson 5-3: 풀링과 정규화"""

import subprocess
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-5-3"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SCRIPTS = {
    "scene1_intro": """
안녕하세요! 오늘은 풀링과 배치 정규화에 대해 배워봅니다.
풀링은 요약이고, 정규화는 균형입니다.
풀링은 특성 맵을 압축해서 핵심 정보만 남기고,
정규화는 각 층의 출력을 일정한 범위로 맞춰 학습을 안정화합니다.
""",

    "scene2_pooling": """
풀링이란 무엇일까요?
책의 각 장을 한 문장으로 요약하는 것과 비슷해요.
중요한 핵심만 남기고 세부 사항은 생략합니다.
풀링을 사용하면 계산량이 줄고, 과적합이 방지되며,
약간의 위치 변화에도 강건해집니다.
2곱하기2 풀링을 적용하면 크기가 절반으로 줄어듭니다.
""",

    "scene3_max_pooling": """
Max Pooling은 영역 내 최댓값을 선택합니다.
예를 들어, 1, 3, 4, 2 중에서 가장 큰 4만 남깁니다.
가장 강한 특징만 선택하기 때문에 노이즈에 강하고,
CNN에서 가장 많이 사용되는 표준 방식입니다.
""",

    "scene4_avg_pooling": """
Average Pooling은 영역 내 평균값을 계산합니다.
모든 값을 고려하기 때문에 정보 손실이 적어요.
결과가 부드럽고, 마지막 층에서 Global Average Pooling으로 많이 사용됩니다.
Max와 Average 중 어떤 것을 선택할지는 상황에 따라 다릅니다.
""",

    "scene5_batch_norm": """
배치 정규화는 마라톤 선수들의 페이스 조절과 비슷합니다.
너무 빠른 값은 줄이고, 너무 작은 값은 키워서 일정한 범위를 유지해요.
먼저 배치의 평균과 분산을 계산하고,
입력을 정규화한 다음, 학습 가능한 감마와 베타로 스케일과 시프트를 적용합니다.
""",

    "scene6_bn_benefits": """
배치 정규화의 효과는 정말 놀랍습니다.
더 큰 학습률을 사용할 수 있어서 학습 속도가 향상되고,
가중치 초기화에 덜 민감해져서 안정적으로 학습됩니다.
또한 약간의 정규화 효과가 있어 과적합을 방지하고,
기울기 소실이나 폭발 문제도 완화됩니다.
""",

    "scene7_outro": """
오늘 배운 내용을 정리해 볼까요?
Max Pooling은 영역 내 최댓값을 선택해서 강한 특징을 보존합니다.
Average Pooling은 평균값으로 전체 정보를 고려해요.
배치 정규화는 평균 0, 분산 1로 정규화하여 학습을 안정화합니다.
CNN 블록의 일반적인 순서는 Conv, BatchNorm, ReLU, Pool입니다.
다음 시간에는 유명한 CNN 아키텍처들을 배워보겠습니다!
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
    print("Generating TTS for Lesson 5-3: 풀링과 정규화")
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
