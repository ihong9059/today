#!/usr/bin/env python3
"""
Level 9-6: 모델 배포
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-6"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-6, 모델 배포입니다.
학습된 모델을 실제 서비스로 배포하는 방법을 배웁니다.
FastAPI, Docker, ONNX 등 배포 기술을 다룹니다.""",

    "fastapi": """FastAPI로 REST API를 만듭니다.
이미지를 업로드하면 번호판 인식 결과를 반환합니다.
비동기 처리로 높은 성능을 제공합니다.
Swagger UI로 API 문서가 자동 생성됩니다.""",

    "optimization": """배포용 모델 최적화를 합니다.
TorchScript로 모델을 컴파일합니다.
ONNX로 변환하면 다양한 런타임에서 실행 가능합니다.
양자화로 모델 크기를 줄이고 속도를 높입니다.""",

    "docker": """Docker로 컨테이너화합니다.
Dockerfile을 작성해 환경을 패키징합니다.
어디서든 동일하게 실행되는 이식성을 확보합니다.
docker compose로 여러 서비스를 함께 관리합니다.""",

    "edge": """엣지 배포도 고려합니다.
라즈베리 파이, 젯슨 같은 소형 디바이스에 배포합니다.
TensorRT로 GPU 추론을 최적화합니다.
실시간 처리를 위해 모델 경량화가 필요합니다.""",

    "scaling": """서비스 확장을 고려합니다.
쿠버네티스로 오토 스케일링을 구현합니다.
로드 밸런서로 트래픽을 분산합니다.
모니터링으로 서비스 상태를 확인합니다.""",

    "outro": """모델 배포 방법을 배웠습니다.
개발 환경에서 운영 환경으로 가는 과정을 이해했습니다.
다음 레슨에서는 MLOps로 지속적인 운영을 다룹니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-6 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
