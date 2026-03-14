import edge_tts
import asyncio
import os

# Level 9-3: YOLO 번호판 검출 모델
SCENES = {
    "intro": """안녕하세요! 레벨 9 세 번째 레슨, YOLO 번호판 검출 모델입니다.
준비된 데이터로 번호판 위치를 찾는 모델을 학습해보겠습니다.
YOLOv8을 사용해서 객체 검출 모델을 만들어볼 거예요.""",

    "yolo_intro": """YOLO에 대해 간단히 복습해볼게요.
YOLO는 You Only Look Once의 약자입니다.
이미지 전체를 한 번에 보고 객체의 위치와 종류를 예측합니다.
실시간 처리가 가능할 정도로 빠릅니다.
YOLOv8은 Ultralytics에서 개발한 최신 버전입니다.
사용하기 쉽고 성능도 우수합니다.""",

    "setup": """학습 환경을 설정해볼게요.
pip install ultralytics로 YOLOv8을 설치합니다.
데이터셋 설정 파일, data.yaml을 작성합니다.
train, val 경로와 클래스 이름을 지정합니다.
우리 프로젝트에서는 license_plate 클래스 하나만 사용합니다.
nc는 클래스 개수, names는 클래스 이름 리스트입니다.""",

    "training": """모델 학습 방법을 알아볼게요.
from ultralytics import YOLO로 라이브러리를 불러옵니다.
YOLO('yolov8n.pt')로 사전 학습된 모델을 로드합니다.
model.train()으로 학습을 시작합니다.
data 파라미터에 yaml 파일 경로를 지정합니다.
epochs, imgsz, batch 등의 하이퍼파라미터를 설정합니다.""",

    "hyperparams": """주요 하이퍼파라미터를 설명드릴게요.
epochs는 전체 데이터셋 반복 횟수입니다. 100에서 300 사이를 사용합니다.
imgsz는 입력 이미지 크기입니다. 640이 기본값입니다.
batch는 배치 사이즈입니다. GPU 메모리에 맞게 조절합니다.
lr0는 초기 학습률입니다. 0.01이 기본값입니다.
patience는 조기 종료를 위한 인내 횟수입니다.""",

    "monitoring": """학습 모니터링 방법을 알아볼게요.
YOLOv8은 자동으로 학습 로그를 저장합니다.
runs 폴더에 결과가 저장됩니다.
mAP, Precision, Recall 등의 지표를 확인할 수 있어요.
텐서보드로 학습 곡선을 시각화할 수도 있습니다.
과적합이 발생하면 데이터 증강을 강화하거나 정규화를 추가합니다.""",

    "inference": """학습된 모델로 추론하는 방법입니다.
model.predict()로 이미지에서 번호판을 검출합니다.
results에 검출 결과가 담깁니다.
boxes 속성에서 바운딩 박스 좌표를 가져옵니다.
conf로 신뢰도 점수를, cls로 클래스 번호를 확인합니다.
results.plot()으로 결과를 시각화할 수 있어요.""",

    "outro": """이번 레슨에서 YOLO 번호판 검출 모델을 학습했습니다.
환경 설정, 학습, 모니터링, 추론 방법을 알아봤습니다.
다음 레슨에서는 CNN으로 문자 인식 모델을 만들어보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-3"
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
