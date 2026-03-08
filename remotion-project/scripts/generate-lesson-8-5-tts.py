#!/usr/bin/env python3
"""Level 8-5: Mixed Precision 훈련 TTS 생성 스크립트"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "../public/audio/lesson-8-5"

SCRIPTS = {
    "intro": """Mixed Precision 훈련에 대해 알아보겠습니다.
숫자의 정밀도를 줄여서 학습 속도를 높이는 기법입니다.
FP32, FP16, BF16 등 다양한 부동소수점 형식을 활용합니다.""",

    "precision": """먼저 부동소수점 정밀도에 대해 알아봅시다.
FP32는 32비트로, 높은 정밀도와 넓은 표현 범위를 가집니다.
FP16은 16비트로, 절반의 메모리를 사용하지만 범위가 좁습니다.
BF16은 Brain Float로, FP32와 같은 지수 범위를 가지면서 16비트만 사용합니다.""",

    "why": """왜 Mixed Precision을 사용할까요?
첫째, 메모리 사용량이 절반으로 줄어듭니다.
둘째, Tensor Core를 활용해 연산 속도가 2배 이상 빨라집니다.
셋째, 대용량 모델 학습이 가능해집니다.""",

    "amp": """PyTorch의 Automatic Mixed Precision, AMP를 사용하면 간단합니다.
autocast 컨텍스트 매니저로 FP16 연산을 자동 적용합니다.
GradScaler로 그래디언트 스케일링을 처리합니다.
단 몇 줄의 코드로 Mixed Precision을 적용할 수 있습니다.""",

    "scaling": """Loss Scaling이 중요합니다.
FP16은 작은 그래디언트를 표현하지 못해 언더플로우가 발생할 수 있습니다.
Loss를 큰 값으로 스케일링하면 그래디언트도 커져서 언더플로우를 방지합니다.
역전파 후 다시 원래 크기로 스케일링합니다.""",

    "bf16": """BF16의 장점을 알아봅시다.
BF16은 FP32와 같은 지수 범위를 가져 오버플로우가 적습니다.
따라서 Loss Scaling이 필요 없는 경우가 많습니다.
A100 이상의 최신 GPU에서 지원됩니다.""",

    "outro": """Level 8-5를 완료했습니다!
Mixed Precision으로 학습 속도를 2배 이상 높일 수 있습니다.
메모리 효율성과 성능을 동시에 얻을 수 있습니다.
다음 레슨에서는 CUDA 스트림과 비동기 실행을 배워보겠습니다."""
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
