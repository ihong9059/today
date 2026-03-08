#!/usr/bin/env python3
"""
Lesson 4-7: 모델 저장과 로드 - TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-7"

SCENES = {
    "scene1_intro": """
오늘은 모델 저장과 로드에 대해 배워봅니다.
학습된 모델을 저장하고 다시 불러오는 건 정말 중요해요.

비유하면 게임 세이브와 같아요.
열심히 플레이한 진행 상황을 저장해두면,
나중에 이어서 플레이할 수 있죠.

모델도 마찬가지예요.
학습된 가중치를 저장해두면
언제든 다시 사용할 수 있습니다.
""",
    "scene2_state_dict": """
state_dict 방식에 대해 알아봅시다.

state_dict는 가중치만 저장하는 방식이에요.
PyTorch에서 가장 권장하는 방법입니다.

torch.save로 state_dict를 저장하고,
load_state_dict로 다시 불러와요.

이 방식의 장점이 여러 가지 있어요.
파일 크기가 작고, PyTorch 버전에 덜 의존하고,
코드 변경에 유연하고, 전이 학습에 적합해요.
""",
    "scene3_full_model": """
전체 모델 저장 방식도 알아볼게요.

torch.save로 모델 전체를 저장할 수 있어요.
구조와 가중치를 함께 저장하는 거예요.

하지만 이 방식은 권장하지 않아요.
파일 크기가 크고, 파이썬 버전에 의존하고,
코드 구조가 바뀌면 로드가 안 될 수 있어요.

간단한 테스트나 임시 저장에만 사용하세요.
""",
    "scene4_checkpoint": """
체크포인트에 대해 알아봅시다.

체크포인트는 학습 상태 전체를 저장해요.
게임의 풀 세이브와 같은 거죠.

모델 가중치, 옵티마이저 상태, 에폭 번호,
손실 값까지 모두 저장합니다.

학습이 중단되었을 때 이어서 학습하려면
체크포인트가 꼭 필요해요.
옵티마이저 상태가 없으면 학습률 스케줄이 망가지거든요.
""",
    "scene5_device": """
디바이스 간 이동에 대해 알아볼게요.

GPU에서 저장한 모델을 CPU에서 로드할 때가 있어요.
이때 map_location을 사용합니다.

CPU로 로드할 때는 map_location에 cpu를 지정해요.
특정 GPU로 로드할 때는 cuda 번호를 지정합니다.

다른 사람에게 모델을 공유할 때 특히 중요해요.
받는 사람의 환경이 다를 수 있으니까요.
""",
    "scene6_practical": """
실무 전략을 알아봅시다.

두 가지를 동시에 저장하는 게 좋아요.
최고 성능 모델과 주기적 체크포인트요.

최고 모델은 검증 손실이 가장 낮을 때 저장해요.
체크포인트는 매 에폭 또는 몇 에폭마다 저장합니다.

파일 이름에 에폭 번호나 성능을 포함하면 관리하기 좋아요.
""",
    "scene7_outro": """
오늘 배운 내용을 정리해볼게요.

state_dict 방식이 권장됩니다.
가중치만 저장해서 가볍고 유연해요.

체크포인트는 학습 재개에 필수예요.
모델, 옵티마이저, 에폭 정보를 함께 저장하세요.

map_location으로 디바이스 간 이동을 처리해요.

이것으로 Level 4 실전 프로젝트 과정을 마칩니다.
축하드려요! 다음 레벨에서 만나요!
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
