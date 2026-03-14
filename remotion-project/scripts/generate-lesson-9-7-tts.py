import edge_tts
import asyncio
import os

# Level 9-7: MLOps 기초
SCENES = {
    "intro": """안녕하세요! 레벨 9 일곱 번째 레슨, MLOps 기초입니다.
모델을 한 번 배포하는 것보다 지속적으로 관리하는 것이 더 중요합니다.
MLOps의 핵심 개념과 실천 방법을 알아보겠습니다.""",

    "versioning": """버전 관리의 중요성을 알아볼게요.
데이터, 코드, 모델 모두 버전 관리가 필요합니다.
Git으로 코드를 관리합니다.
DVC, Data Version Control로 데이터셋을 버전 관리합니다.
MLflow로 모델과 실험을 추적합니다.
어떤 데이터와 코드로 어떤 모델이 만들어졌는지 추적할 수 있어야 합니다.""",

    "pipeline": """자동화 파이프라인을 구축해볼게요.
데이터 수집부터 배포까지 전 과정을 자동화합니다.
Airflow나 Kubeflow로 워크플로를 정의합니다.
DAG, Directed Acyclic Graph로 작업 순서를 관리합니다.
각 단계가 실패하면 알림을 받고 빠르게 대응합니다.
정기적으로 파이프라인이 실행되어 모델을 갱신합니다.""",

    "cicd": """CI/CD를 ML에 적용하는 방법입니다.
CI, Continuous Integration은 코드 변경 시 자동으로 테스트합니다.
데이터 품질 테스트, 모델 성능 테스트를 포함합니다.
CD, Continuous Deployment는 테스트 통과 시 자동 배포합니다.
GitHub Actions, Jenkins, GitLab CI를 사용할 수 있습니다.
성능 기준을 통과해야만 배포가 진행됩니다.""",

    "monitoring": """서비스 모니터링 방법입니다.
모델이 프로덕션에서 어떻게 동작하는지 추적해야 합니다.
예측 정확도, 응답 시간, 에러율을 모니터링합니다.
데이터 드리프트를 감지합니다. 입력 데이터 분포가 변하면 성능이 저하됩니다.
Prometheus로 지표를 수집하고 Grafana로 시각화합니다.
이상 징후 발견 시 자동으로 알림을 보냅니다.""",

    "abtest": """A/B 테스트와 롤백을 알아볼게요.
새 모델을 전체 배포하기 전에 일부 트래픽으로 테스트합니다.
예를 들어, 90%는 기존 모델, 10%는 새 모델을 사용합니다.
새 모델의 성능이 더 좋으면 점진적으로 비율을 늘립니다.
문제가 발생하면 빠르게 이전 버전으로 롤백합니다.
이를 카나리 배포 또는 블루-그린 배포라고 합니다.""",

    "outro": """이번 레슨에서 MLOps 기초를 배웠습니다.
버전 관리, 파이프라인 자동화, 모니터링 방법을 알아봤습니다.
다음 레슨에서 전체 과정을 정리하고 마무리하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-7"
    os.makedirs(output_dir, exist_ok=True)

    for scene_name, text in SCENES.items():
        output_file = f"{output_dir}/{scene_name}.mp3"
        print(f"Generating {scene_name}...")

        communicate = edge_tts.Communicate(text, "ko-KR-SunHiNeural")
        await communicate.save(output_file)
        print(f"Saved: {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_tts())
    print("All audio files generated!")
