#!/usr/bin/env python3
"""
Lesson 4-4: nn.Module 기초 - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-4"

SCENES = {
    "scene1_intro": """
오늘은 nn.Module의 기초를 배워봅니다.
PyTorch에서 신경망을 만들 때 가장 중요한 클래스예요.

nn.Module은 레고의 기본 브릭과 같아요.
작은 브릭을 조합해서 큰 구조물을 만들듯이,
작은 레이어를 조합해서 복잡한 모델을 만듭니다.

커스텀 모델을 설계하는 방법을 알아볼게요.
""",
    "scene2_what_is_module": """
nn.Module이 뭔지 알아봅시다.

모든 신경망 레이어와 모델의 기본 클래스예요.
부모 클래스라고도 하죠.

nn.Module이 제공하는 기능이 많아요.
파라미터 관리는 학습 가능한 가중치를 자동으로 추적해요.
디바이스 이동은 GPU와 CPU 사이를 자유롭게 옮겨요.
모드 전환은 학습 모드와 평가 모드를 바꿔줍니다.
저장과 로드로 모델 가중치를 저장하고 복원할 수 있어요.
""",
    "scene3_basic_rules": """
nn.Module을 사용할 때 반드시 지켜야 할 규칙이 있어요.

첫째, super().__init__()을 호출해야 합니다.
부모 클래스의 초기화를 해주는 거예요.
이게 없으면 파라미터 추적이 안 돼요.

둘째, __init__에서 레이어를 정의합니다.
nn.Linear나 nn.Conv2d 같은 레이어를 여기서 만들어요.

셋째, forward에서 데이터 흐름을 정의합니다.
입력이 어떻게 레이어를 통과하는지 적어요.
""",
    "scene4_forward": """
forward 메서드에 대해 더 알아볼게요.

forward는 모델의 순전파를 정의해요.
입력 데이터가 출력까지 어떻게 흘러가는지 적습니다.

호출할 때는 forward를 직접 부르지 않아요.
대신 model(input) 형태로 사용해요.
이러면 PyTorch가 자동으로 forward를 호출합니다.

forward 안에서 연산들을 자유롭게 사용할 수 있어요.
조건문이나 반복문도 넣을 수 있습니다.
""",
    "scene5_parameters": """
파라미터 관리 방법을 알아봅시다.

model.parameters()로 모든 파라미터를 확인할 수 있어요.
이걸 옵티마이저에 전달해서 학습에 사용합니다.

named_parameters()를 쓰면 이름도 함께 볼 수 있어요.
어떤 레이어의 가중치인지 확인하기 좋습니다.

numel()로 총 파라미터 개수도 셀 수 있어요.
모델이 얼마나 복잡한지 알 수 있죠.
""",
    "scene6_submodule": """
서브모듈에 대해 알아볼게요.

nn.Module 안에 다른 nn.Module을 넣을 수 있어요.
마치 레고 블록 안에 작은 블록을 넣는 것과 같죠.

Sequential을 사용하면 레이어를 순서대로 쌓을 수 있어요.
코드가 깔끔해지고 관리하기 쉬워집니다.

ModuleList는 동적으로 레이어를 추가할 때 좋아요.
리스트처럼 레이어를 관리할 수 있습니다.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

nn.Module은 모든 신경망의 기본 클래스예요.
파라미터 관리, 디바이스 이동, 모드 전환을 지원합니다.

세 가지 규칙을 기억하세요.
super().__init__() 호출하기,
__init__에서 레이어 정의하기,
forward에서 데이터 흐름 정의하기.

다음 레슨에서는 데이터 로딩을 배워보겠습니다.
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
