#!/usr/bin/env python3
"""
Lesson 4-6: 학습 루프 - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-6"

SCENES = {
    "scene1_intro": """
오늘은 학습 루프에 대해 배워봅니다.
학습 루프는 딥러닝의 핵심이에요.

비유하면 시험공부 사이클과 같습니다.
문제를 풀고, 정답과 비교하고,
어디서 틀렸는지 분석하고, 약점을 보완해요.
이 사이클을 수천 번 반복하면 실력이 향상됩니다.

모델이 아무리 잘 설계되어도,
학습 루프가 올바르지 않으면 제대로 학습되지 않아요.
""",
    "scene2_five_steps": """
학습 루프의 5단계를 알아봅시다.

첫 번째는 optimizer.zero_grad입니다.
그래디언트를 초기화해서 이전 배치의 영향을 제거해요.

두 번째는 순전파예요.
현재 가중치로 예측을 수행합니다.

세 번째는 손실 계산이에요.
예측과 정답의 차이를 측정합니다.

네 번째는 역전파예요.
loss.backward로 각 가중치의 개선 방향을 계산해요.

다섯 번째는 가중치 업데이트예요.
optimizer.step으로 실제로 가중치를 수정합니다.
""",
    "scene3_train_function": """
학습 함수를 구현해볼게요.

먼저 model.train으로 학습 모드로 설정해요.
이러면 Dropout과 BatchNorm이 활성화됩니다.

그다음 데이터 로더에서 배치를 하나씩 가져와요.
데이터를 디바이스로 이동하고,
5단계를 순서대로 수행합니다.

loss.item으로 Python 숫자로 변환해서 기록해요.
텐서 상태로 누적하면 메모리 문제가 생길 수 있거든요.
""",
    "scene4_validation": """
검증 루프에 대해 알아볼게요.

검증은 학습과 다른 점이 많아요.
model.eval로 평가 모드로 설정합니다.
torch.no_grad 안에서 실행해요.
그래디언트 계산을 끄면 메모리와 속도가 절약돼요.

검증 루프에서는 backward와 step을 하지 않아요.
가중치를 수정하지 않고 성능만 측정하는 거예요.

검증 데이터로 현재 모델의 일반화 성능을 확인합니다.
""",
    "scene5_early_stopping": """
조기 종료에 대해 알아볼게요.

검증 손실이 더 이상 좋아지지 않으면 학습을 멈춰요.
과적합이 시작되면 계속 학습해도 성능이 안 오르거든요.

patience는 몇 에폭 동안 기다릴지 정해요.
검증 손실이 개선되면 patience를 초기화하고,
개선되지 않으면 카운터를 올립니다.

카운터가 patience에 도달하면 학습을 중단해요.
그리고 가장 좋았던 모델을 복원합니다.
""",
    "scene6_monitoring": """
학습 모니터링 방법을 알아봅시다.

매 에폭마다 학습 손실과 검증 손실을 기록해요.
정확도도 함께 기록하면 좋습니다.

그래프로 그려보면 학습 상태를 파악할 수 있어요.
두 곡선이 함께 내려가면 정상 학습 중이에요.

학습 손실은 내려가는데 검증 손실이 올라가면,
이건 과적합의 신호예요.
두 곡선 사이 간격이 크면 과적합이 심각한 거예요.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

학습 루프 5단계를 기억하세요.
zero_grad, 순전파, 손실 계산, 역전파, 가중치 업데이트.

검증 루프는 eval 모드와 no_grad를 사용해요.
backward와 step 없이 성능만 측정합니다.

조기 종료로 과적합을 방지하고,
학습 기록으로 상태를 모니터링하세요.

다음 레슨에서는 모델 저장과 로드를 배워보겠습니다.
그럼 다음 시간에 만나요!
""",
}

async def generate_tts(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    clean_text = " ".join(text.strip().split())
    print(f"Generating: {name}")
    communicate = edge_tts.Communicate(clean_text, VOICE)
    await communicate.save(output_path)
    print(f"  Saved: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Voice: {VOICE}")
    print(f"Generating {len(SCENES)} scenes...")
    print()
    for name, text in SCENES.items():
        await generate_tts(name, text)
    print()
    print("All TTS files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
