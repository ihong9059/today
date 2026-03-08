#!/usr/bin/env python3
"""
Lesson 4-5: 데이터 로딩 - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-5"

SCENES = {
    "scene1_intro": """
오늘은 데이터 로딩에 대해 배워봅니다.
효율적인 데이터 로딩은 학습 속도에 직접적인 영향을 미쳐요.

GPU가 아무리 빨라도 데이터가 느리게 도착하면,
GPU는 대부분의 시간을 기다리며 낭비합니다.

Dataset과 DataLoader를 활용해서
효율적인 데이터 파이프라인을 만들어 볼게요.
""",
    "scene2_dataset": """
Dataset 클래스에 대해 알아봅시다.

Dataset은 데이터 하나를 어떻게 가져올 것인가를 정의해요.
비유하면 창고에서 재료를 꺼내는 규칙이에요.

반드시 구현해야 하는 메서드가 세 가지 있어요.
__init__은 데이터 경로나 변환 등 초기 설정을 해요.
__len__은 데이터셋의 총 크기를 반환합니다.
__getitem__은 인덱스로 데이터 하나를 가져와요.
""",
    "scene3_dataloader": """
DataLoader에 대해 알아볼게요.

DataLoader는 레스토랑의 웨이터와 같아요.
주방인 Dataset에서 데이터를 가져와서
테이블인 모델에 배달하는 역할이에요.

한 번에 여러 개의 데이터를 배치로 묶어서 전달하고,
매번 다른 순서로 셔플해서 서빙합니다.
병렬 로딩으로 속도도 높일 수 있어요.
""",
    "scene4_parameters": """
DataLoader의 주요 파라미터를 알아봅시다.

batch_size는 한 번에 처리할 데이터 수예요.
메모리 허용 범위에서 크게 설정하면 좋습니다.

shuffle은 데이터를 섞을지 여부예요.
훈련할 때는 True, 테스트할 때는 False로 해요.

num_workers는 데이터 로딩에 사용할 프로세스 수예요.
보통 CPU 코어 수에 맞춰 설정합니다.

pin_memory는 GPU 전송을 최적화해요.
CUDA를 사용할 때 True로 설정하면 빨라집니다.
""",
    "scene5_transforms": """
transforms에 대해 알아볼게요.

transforms는 데이터 전처리와 증강을 담당해요.
재료를 손질하는 과정이라고 생각하면 됩니다.

ToTensor는 이미지를 텐서로 변환해요.
Normalize는 평균과 표준편차로 정규화합니다.
RandomFlip이나 RandomRotation은 데이터 증강이에요.

중요한 점은 훈련 데이터에만 증강을 적용해요.
테스트 데이터는 원본 그대로 평가해야 합니다.
""",
    "scene6_practical": """
실전 예제를 살펴볼게요.

ImageFolder는 폴더 구조 기반으로 이미지를 로딩해요.
폴더 이름이 자동으로 클래스 라벨이 됩니다.

CSV 데이터도 커스텀 Dataset으로 만들 수 있어요.
pandas로 읽어서 텐서로 변환하면 됩니다.

random_split으로 데이터를 분할할 수도 있어요.
훈련용과 검증용으로 나누는 거죠.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

Dataset은 데이터 하나를 가져오는 방법을 정의해요.
__init__, __len__, __getitem__ 세 메서드가 핵심입니다.

DataLoader는 배치를 묶고 셔플하고 병렬 처리해요.
batch_size, shuffle, num_workers가 중요한 파라미터예요.

transforms로 전처리와 데이터 증강을 할 수 있어요.

다음 레슨에서는 학습 루프를 배워보겠습니다.
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
