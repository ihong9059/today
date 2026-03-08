#!/usr/bin/env python3
"""Level 8-7: CUDA 성능 최적화 TTS 생성 스크립트"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "../public/audio/lesson-8-7"

SCRIPTS = {
    "intro": """CUDA 성능 최적화에 대해 알아보겠습니다.
Occupancy, Coalescing, Branch Divergence 등 핵심 개념을 배웁니다.
GPU 성능을 최대한 끌어올리는 방법을 익혀봅시다.""",

    "occupancy": """Occupancy란 SM의 활성 워프 비율입니다.
100% Occupancy가 항상 최선은 아닙니다.
레지스터와 공유 메모리 사용량에 따라 달라집니다.
CUDA Occupancy Calculator로 최적값을 찾을 수 있습니다.""",

    "coalescing": """Memory Coalescing은 성능의 핵심입니다.
연속된 스레드가 연속된 메모리에 접근하면 효율적입니다.
Coalesced 접근은 하나의 트랜잭션으로 처리됩니다.
Strided 접근은 여러 트랜잭션이 필요해 32배까지 느려질 수 있습니다.""",

    "divergence": """Branch Divergence를 최소화해야 합니다.
워프 내 스레드가 다른 분기를 타면 순차 실행됩니다.
조건문을 최소화하고, 워프 단위로 일관된 분기를 유지하세요.
Divergence가 없으면 모든 스레드가 병렬로 실행됩니다.""",

    "bank": """Shared Memory Bank Conflict를 피해야 합니다.
Shared Memory는 32개의 뱅크로 나뉘어 있습니다.
같은 뱅크에 동시 접근하면 순차 처리됩니다.
인덱싱을 조정해 다른 뱅크에 접근하도록 설계하세요.""",

    "profiling": """프로파일링으로 병목을 찾으세요.
NVIDIA Nsight Systems로 전체 흐름을 분석합니다.
NVIDIA Nsight Compute로 커널 세부 분석이 가능합니다.
측정 없이 최적화하지 마세요.""",

    "outro": """Level 8을 모두 완료했습니다! 축하합니다!
GPU 병렬 컴퓨팅의 핵심 개념을 모두 배웠습니다.
이제 효율적인 CUDA 코드를 작성할 수 있습니다.
다음 레벨에서 더 심화된 내용을 계속 학습하겠습니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("All audio files generated!")

if __name__ == "__main__":
    asyncio.run(main())
