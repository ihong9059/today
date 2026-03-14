import edge_tts
import asyncio
import os

# Level 9-2: 데이터 수집과 전처리
SCENES = {
    "intro": """안녕하세요! 레벨 9 두 번째 레슨, 데이터 수집과 전처리입니다.
AI 프로젝트의 성공은 좋은 데이터에서 시작합니다.
번호판 인식에 필요한 데이터를 수집하고 전처리하는 방법을 알아보겠습니다.""",

    "data_sources": """데이터 수집 방법을 알아볼게요.
공개 데이터셋을 활용할 수 있습니다. AI Hub나 Kaggle에서 찾아보세요.
직접 촬영한 이미지도 사용할 수 있습니다.
웹 크롤링으로 이미지를 수집할 수도 있지만, 저작권에 주의해야 합니다.
다양한 환경의 이미지를 확보하는 것이 중요합니다.
낮, 밤, 비 오는 날, 흐린 날 등 다양한 조건을 포함해야 합니다.""",

    "annotation": """어노테이션 작업에 대해 설명드릴게요.
번호판의 위치를 바운딩 박스로 표시합니다.
YOLO 형식은 클래스, 중심 좌표, 너비, 높이를 사용합니다.
각 값은 이미지 크기로 정규화된 0에서 1 사이의 값입니다.
LabelImg나 CVAT 같은 도구를 사용하면 편리합니다.
어노테이션 품질이 모델 성능에 직접적인 영향을 미칩니다.""",

    "preprocessing": """이미지 전처리 방법을 알아볼게요.
이미지 크기를 일정하게 조절합니다. 보통 640x640을 사용합니다.
RGB 채널 순서를 확인하고 필요시 변환합니다.
픽셀 값을 0에서 1 사이로 정규화합니다.
OpenCV의 cv2.resize(), cv2.cvtColor() 함수를 사용합니다.
일관된 전처리 파이프라인을 구축하는 것이 중요합니다.""",

    "augmentation": """데이터 증강 기법을 소개해드릴게요.
학습 데이터가 부족할 때 데이터를 늘리는 방법입니다.
회전, 크기 조절, 좌우 반전으로 변형을 만듭니다.
밝기, 대비, 색상을 조절합니다.
블러, 노이즈를 추가해서 실제 환경을 시뮬레이션합니다.
Albumentations 라이브러리를 사용하면 쉽게 구현할 수 있어요.""",

    "split": """데이터 분할 방법을 알아볼게요.
전체 데이터를 학습용, 검증용, 테스트용으로 나눕니다.
보통 8:1:1 또는 7:1.5:1.5 비율을 사용합니다.
각 세트에 다양한 데이터가 고르게 분포되어야 합니다.
시간 순서가 있는 데이터는 순서를 고려해서 분할합니다.
random seed를 고정해서 재현 가능하게 만듭니다.""",

    "outro": """이번 레슨에서 데이터 수집과 전처리를 배웠습니다.
어노테이션, 전처리, 증강, 분할 방법을 알아봤습니다.
다음 레슨에서는 YOLO로 번호판 검출 모델을 학습하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-2"
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
