import edge_tts
import asyncio
import os

# Level 9-1: 종합 프로젝트 개요 - 번호판 인식 시스템
SCENES = {
    "intro": """안녕하세요! 레벨 9 첫 번째 레슨, 종합 프로젝트 개요입니다.
지금까지 배운 모든 내용을 활용해서 실제 AI 시스템을 만들어볼 거예요.
번호판 자동 인식 시스템을 처음부터 끝까지 구현해보겠습니다.""",

    "overview": """프로젝트의 전체 구조를 설명드릴게요.
이 프로젝트는 실제 주차장이나 도로에서 사용할 수 있는 시스템입니다.
자동차 이미지에서 번호판 위치를 찾고, 번호판 문자를 인식합니다.
객체 탐지를 위해 YOLO 모델을 사용하고, 문자 인식을 위해 CNN을 사용합니다.
학습한 모델을 FastAPI로 서비스하고, Docker로 배포합니다.
전체 AI 프로젝트의 라이프사이클을 경험할 수 있어요.""",

    "pipeline": """전체 파이프라인을 살펴볼게요.
첫 번째 단계는 데이터 수집과 전처리입니다.
두 번째 단계는 번호판 검출 모델, YOLO 학습입니다.
세 번째 단계는 문자 인식 모델, CNN 학습입니다.
네 번째 단계는 모델 평가와 최적화입니다.
다섯 번째 단계는 API 서버 개발과 배포입니다.
마지막으로 MLOps 파이프라인을 구축합니다.""",

    "skills": """이 프로젝트에서 활용할 기술들입니다.
Python과 PyTorch로 딥러닝 모델을 구현합니다.
OpenCV로 이미지 전처리를 수행합니다.
YOLOv8로 객체 탐지를 하고, CNN으로 문자 인식을 합니다.
FastAPI로 REST API를 만들고, Docker로 컨테이너화합니다.
MLflow로 실험을 관리하고, 모델 버전을 추적합니다.""",

    "data_intro": """데이터셋에 대해 소개해드릴게요.
한국 자동차 번호판 이미지 데이터를 사용합니다.
번호판 위치 정보가 포함된 어노테이션 파일이 필요합니다.
학습용, 검증용, 테스트용으로 데이터를 나눕니다.
데이터 증강 기법으로 다양한 환경을 시뮬레이션합니다.
밝기, 회전, 노이즈 등 다양한 변환을 적용합니다.""",

    "goals": """프로젝트의 목표를 정리해볼게요.
번호판 검출 정확도 95% 이상을 목표로 합니다.
문자 인식 정확도 90% 이상을 달성합니다.
실시간 처리가 가능하도록 최적화합니다.
프로덕션 환경에서 안정적으로 동작하는 API를 구축합니다.
전체 ML 파이프라인을 자동화합니다.""",

    "outro": """이번 레슨에서 프로젝트의 전체 개요를 살펴봤습니다.
다음 레슨에서는 데이터 수집과 전처리를 진행하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-1"
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
