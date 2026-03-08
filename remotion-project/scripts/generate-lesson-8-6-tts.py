#!/usr/bin/env python3
"""Level 8-6: 스트림과 비동기 실행 TTS 생성 스크립트"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "../public/audio/lesson-8-6"

SCRIPTS = {
    "intro": """CUDA 스트림과 비동기 실행에 대해 알아보겠습니다.
스트림을 사용하면 여러 작업을 동시에 실행할 수 있습니다.
GPU 활용률을 극대화하는 핵심 기법입니다.""",

    "stream": """CUDA 스트림이란 무엇일까요?
스트림은 순서대로 실행되는 작업 큐입니다.
같은 스트림 내 작업은 순차적으로 실행됩니다.
다른 스트림의 작업은 동시에 실행될 수 있습니다.""",

    "async": """비동기 실행의 장점을 알아봅시다.
CPU는 GPU 작업을 기다리지 않고 다른 작업을 수행합니다.
데이터 전송과 커널 실행을 동시에 할 수 있습니다.
전체 실행 시간이 크게 단축됩니다.""",

    "overlap": """파이프라인 오버랩을 구현해봅시다.
데이터를 청크로 나누어 처리합니다.
첫 번째 청크를 처리하는 동안 두 번째 청크를 전송합니다.
이렇게 하면 대기 시간이 줄어들어 효율이 높아집니다.""",

    "sync": """동기화 방법을 알아봅시다.
cudaStreamSynchronize로 특정 스트림의 완료를 기다립니다.
cudaDeviceSynchronize로 모든 스트림의 완료를 기다립니다.
cudaEvent를 사용하면 더 세밀한 동기화가 가능합니다.""",

    "event": """CUDA Event로 시간을 측정할 수 있습니다.
Event를 기록하고 경과 시간을 계산합니다.
정확한 GPU 실행 시간을 측정할 수 있습니다.
성능 최적화에 필수적인 도구입니다.""",

    "outro": """Level 8-6을 완료했습니다!
스트림을 사용해 GPU 작업을 병렬화할 수 있습니다.
비동기 실행으로 전체 성능을 향상시킬 수 있습니다.
다음 레슨에서는 CUDA 성능 최적화 기법을 배워보겠습니다."""
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
