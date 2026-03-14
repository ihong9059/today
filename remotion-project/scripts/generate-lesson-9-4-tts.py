import edge_tts
import asyncio
import os

# Level 9-4: CNN 문자 인식 모델
SCENES = {
    "intro": """안녕하세요! 레벨 9 네 번째 레슨, CNN 문자 인식 모델입니다.
검출된 번호판에서 문자를 인식하는 모델을 만들어보겠습니다.
CNN 기반의 문자 인식 모델을 직접 구현해볼 거예요.""",

    "ocr_approach": """문자 인식 접근 방법을 설명드릴게요.
번호판 문자 인식은 두 가지 방법이 있습니다.
첫 번째는 각 문자를 개별적으로 인식하는 방법입니다.
두 번째는 전체 번호판을 한 번에 읽는 시퀀스 투 시퀀스 방법입니다.
우리는 첫 번째 방법을 사용합니다. 더 직관적이고 이해하기 쉽습니다.
검출된 번호판을 문자 단위로 세그먼트하고, 각 문자를 분류합니다.""",

    "segmentation": """문자 세그멘테이션 방법을 알아볼게요.
번호판 이미지에서 개별 문자를 추출해야 합니다.
그레이스케일로 변환하고 이진화를 적용합니다.
윤곽선 검출로 각 문자 영역을 찾습니다.
찾은 영역을 정렬해서 순서대로 추출합니다.
각 문자 이미지는 동일한 크기로 리사이즈합니다. 보통 32x32를 사용합니다.""",

    "cnn_model": """CNN 모델 구조를 설계해볼게요.
입력은 32x32 그레이스케일 이미지입니다.
합성곱 레이어와 풀링 레이어를 쌓습니다.
첫 번째 레이어는 16개 필터, 두 번째는 32개, 세 번째는 64개를 사용합니다.
마지막에 Fully Connected 레이어로 분류합니다.
출력은 숫자 0에서 9와 한글 자음 모음, 총 36개 클래스입니다.""",

    "training": """모델 학습 과정을 알아볼게요.
PyTorch의 nn.Module을 상속해서 모델 클래스를 만듭니다.
DataLoader로 학습 데이터를 배치 단위로 로드합니다.
CrossEntropyLoss를 손실 함수로 사용합니다.
Adam optimizer로 파라미터를 업데이트합니다.
매 에폭마다 검증 정확도를 확인해서 최적의 모델을 저장합니다.""",

    "evaluation": """모델 평가 방법을 알아볼게요.
테스트 셋에서 정확도를 계산합니다.
혼동 행렬로 어떤 문자가 자주 혼동되는지 확인합니다.
예를 들어 0과 O, 1과 I가 자주 혼동됩니다.
문자별 정확도를 분석해서 취약점을 파악합니다.
필요하면 해당 문자의 학습 데이터를 보강합니다.""",

    "integration": """전체 시스템 통합 방법입니다.
YOLO로 번호판을 검출하고, 그 영역을 크롭합니다.
크롭된 이미지에서 문자를 세그먼트합니다.
각 문자를 CNN 모델에 입력해서 인식합니다.
인식된 문자들을 순서대로 합쳐서 최종 결과를 만듭니다.
신뢰도가 낮은 경우 재처리를 시도할 수 있습니다.""",

    "outro": """이번 레슨에서 CNN 문자 인식 모델을 만들었습니다.
세그멘테이션, 모델 설계, 학습, 통합 방법을 알아봤습니다.
다음 레슨에서는 모델 평가와 최적화를 진행하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-4"
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
