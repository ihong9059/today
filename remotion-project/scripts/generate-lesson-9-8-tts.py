import edge_tts
import asyncio
import os

# Level 9-8: 최종 회고와 졸업
SCENES = {
    "intro": """안녕하세요! 레벨 9 마지막 레슨, 최종 회고와 졸업입니다.
이번 레슨에서 전체 교육 과정을 되돌아보겠습니다.
레벨 0부터 9까지, 긴 여정을 함께 해주셔서 감사합니다.""",

    "journey": """우리의 학습 여정을 돌아볼게요.
레벨 0에서 Python 기초와 개발 환경을 설정했습니다.
레벨 1에서 데이터 분석의 기초를 배웠습니다.
레벨 2에서 머신러닝 기초 알고리즘을 다뤘습니다.
레벨 3에서 딥러닝과 신경망의 원리를 이해했습니다.
각 단계가 다음 단계의 기반이 되었습니다.""",

    "advanced": """고급 과정도 정리해볼게요.
레벨 4에서 CNN과 이미지 처리를 학습했습니다.
레벨 5에서 RNN과 시퀀스 모델링을 배웠습니다.
레벨 6에서 Transformer와 어텐션 메커니즘을 이해했습니다.
레벨 7에서 자연어 처리와 대형 언어 모델을 다뤘습니다.
레벨 8에서 GPU 프로그래밍과 최적화 기법을 익혔습니다.""",

    "project": """종합 프로젝트를 정리해볼게요.
레벨 9에서 번호판 인식 시스템을 직접 구축했습니다.
데이터 수집부터 배포까지 전체 파이프라인을 경험했습니다.
YOLO로 객체 검출, CNN으로 문자 인식을 구현했습니다.
FastAPI와 Docker로 서비스를 배포했습니다.
MLOps로 지속적인 운영 방법을 배웠습니다.""",

    "skills": """여러분이 습득한 핵심 역량입니다.
데이터를 수집, 전처리, 분석하는 능력을 갖췄습니다.
다양한 딥러닝 모델을 이해하고 구현할 수 있습니다.
실제 문제를 AI로 해결하는 경험을 쌓았습니다.
모델을 최적화하고 배포하는 방법을 알게 되었습니다.
이제 독자적으로 AI 프로젝트를 수행할 준비가 되었습니다.""",

    "next_steps": """앞으로의 학습 방향을 제안드릴게요.
Kaggle 대회에 참가해서 실력을 겨뤄보세요.
GitHub에 프로젝트를 공유하고 포트폴리오를 만들어보세요.
최신 논문을 읽고 새로운 기술을 따라가세요.
오픈소스 프로젝트에 기여해보는 것도 좋습니다.
커뮤니티에서 다른 개발자들과 교류해보세요.""",

    "outro": """축하합니다! 전체 교육 과정을 성공적으로 마쳤습니다.
AI와 딥러닝의 광활한 세계로 첫 발을 내딛었습니다.
배움은 여기서 끝이 아니라 새로운 시작입니다.
앞으로의 여정에 행운이 함께하기를 바랍니다.
수고하셨습니다! 감사합니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-8"
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
