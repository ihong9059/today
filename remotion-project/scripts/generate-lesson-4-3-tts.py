#!/usr/bin/env python3
"""
Lesson 4-3: 텍스트 분류 - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-3"

SCENES = {
    "scene1_intro": """
오늘은 텍스트를 분류하는 방법을 배웁니다.
감성 분석이라고도 하는데요,
글이 긍정적인지 부정적인지 판단하는 거예요.

신경망은 숫자만 이해할 수 있어요.
그래서 텍스트를 숫자로 바꾸는 과정이 필요합니다.

오늘 배울 핵심 개념은 세 가지예요.
토큰화, 임베딩, 그리고 LSTM입니다.
""",
    "scene2_preprocessing": """
텍스트를 숫자로 바꾸는 과정을 알아봅시다.

세 단계를 거쳐요.
첫째, 토큰화. 문장을 단어로 쪼갭니다.
둘째, 인덱싱. 각 단어에 고유 번호를 부여해요.
셋째, 임베딩. 번호를 의미 벡터로 변환합니다.

예를 들어 볼게요.
This movie is great라는 문장이 있어요.
토큰화하면 this, movie, is, great로 나뉘고요.
인덱싱하면 42, 156, 11, 89 같은 숫자가 됩니다.
임베딩하면 각 숫자가 128차원 벡터로 변환돼요.
""",
    "scene3_embedding": """
임베딩에 대해 자세히 알아볼게요.

임베딩은 단어의 번호를 의미 벡터로 바꿔줍니다.
숫자 42는 아무런 의미 정보가 없어요.
하지만 벡터는 단어의 의미를 담고 있습니다.

비슷한 의미의 단어는 비슷한 벡터를 갖게 돼요.
예를 들어 good과 great의 벡터는 서로 가깝습니다.

PyTorch에서는 nn.Embedding을 사용해요.
어휘 크기와 임베딩 차원을 지정하면 됩니다.
예를 들어 만 개 단어, 128차원으로 설정할 수 있어요.
""",
    "scene4_lstm": """
LSTM에 대해 알아봅시다.

기본 RNN은 긴 문장을 처리하기 어려워요.
앞부분을 읽다 보면 뒷부분을 까먹거든요.
이걸 기울기 소실 문제라고 합니다.

LSTM은 이 문제를 해결해요.
마치 수첩을 가진 학생과 같아요.
중요한 정보는 적어두고, 필요 없는 건 지웁니다.

LSTM의 핵심 구성요소는 네 가지예요.
셀 상태는 장기 기억 저장소입니다.
망각 게이트는 불필요한 정보를 삭제하고요.
입력 게이트는 새 정보를 저장할지 결정해요.
출력 게이트는 현재 필요한 정보를 내보냅니다.
""",
    "scene5_model": """
감성 분석 모델을 구현해봅시다.

모델은 세 부분으로 구성돼요.
첫째, 임베딩 레이어입니다.
단어 인덱스를 의미 벡터로 바꿔줘요.

둘째, LSTM 레이어예요.
순서 정보를 활용해서 문맥을 파악합니다.
문장을 순서대로 읽으면서 의미를 이해해요.

셋째, 분류 레이어입니다.
LSTM의 마지막 출력을 받아서
긍정인지 부정인지 분류합니다.

드롭아웃도 추가해서 과적합을 방지해요.
""",
    "scene6_training": """
모델 학습 과정을 살펴봅시다.

데이터는 영화 리뷰 같은 텍스트와 라벨로 구성돼요.
라벨은 긍정이면 1, 부정이면 0입니다.

학습 과정은 이미지 분류와 비슷해요.
손실 함수로는 CrossEntropyLoss를 사용하고요.
최적화기로는 Adam을 사용합니다.

배치 단위로 학습하면서
텍스트의 긍정 부정을 예측하고
실제 라벨과 비교해서 손실을 계산해요.

몇 에폭 학습하면 85퍼센트 이상의 정확도를 얻을 수 있습니다.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

텍스트를 숫자로 바꾸는 세 단계를 배웠어요.
토큰화로 단어를 쪼개고,
인덱싱으로 번호를 붙이고,
임베딩으로 의미 벡터로 변환합니다.

LSTM은 긴 문장도 잘 처리해요.
셀 상태에 중요한 정보를 저장하기 때문이죠.

감성 분석 모델은 임베딩, LSTM, 분류기로 구성됩니다.
영화 리뷰 같은 텍스트의 감성을 분류할 수 있어요.

다음 레슨에서는 nn.Module의 기초를 배워보겠습니다.
그럼 다음 시간에 만나요!
""",
}

async def generate_tts(name: str, text: str):
    """Generate TTS for a single scene"""
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
