#!/usr/bin/env python3
"""
Level 9-7: MLOps 기초
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-7"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-7, MLOps 기초입니다.
모델을 지속적으로 운영하고 개선하는 MLOps를 배웁니다.
개발과 운영을 연결하는 DevOps의 ML 버전입니다.""",

    "versioning": """모델 버전 관리를 합니다.
데이터, 코드, 모델 각각 버전을 관리합니다.
DVC, MLflow 같은 도구로 실험을 추적합니다.
어떤 데이터로 어떤 하이퍼파라미터로 학습했는지 기록합니다.""",

    "pipeline": """자동화 파이프라인을 구축합니다.
데이터 수집, 전처리, 학습, 평가, 배포가 자동으로 실행됩니다.
Airflow, Kubeflow 같은 워크플로 도구를 사용합니다.
새 데이터가 들어오면 모델이 자동으로 재학습됩니다.""",

    "cicd": """CI/CD를 적용합니다.
코드 변경 시 자동으로 테스트가 실행됩니다.
모델 성능이 기준을 통과하면 자동 배포됩니다.
깃헙 액션, 젠킨스 등을 활용합니다.""",

    "monitoring": """서비스 모니터링을 구축합니다.
모델 성능 저하, 데이터 드리프트를 감지합니다.
추론 시간, 에러율, 리소스 사용량을 추적합니다.
알림을 설정해서 문제를 빠르게 대응합니다.""",

    "abtest": """A/B 테스트로 모델을 비교합니다.
트래픽의 일부를 새 모델로 보내 성능을 측정합니다.
통계적으로 유의미한 차이가 있는지 확인합니다.
점진적으로 새 모델로 전환하는 카나리 배포도 있습니다.""",

    "outro": """MLOps 기초를 배웠습니다.
지속적인 개선이 좋은 AI 서비스의 핵심입니다.
다음 레슨에서는 전체 프로젝트를 회고하며 마무리합니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-7 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
