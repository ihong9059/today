import edge_tts
import asyncio
import os

# Level 9-5: 모델 평가와 최적화
SCENES = {
    "intro": """안녕하세요! 레벨 9 다섯 번째 레슨, 모델 평가와 최적화입니다.
학습된 모델의 성능을 평가하고 개선하는 방법을 알아보겠습니다.
실제 서비스에서 필요한 품질을 달성하는 것이 목표입니다.""",

    "detection_metrics": """번호판 검출 모델의 평가 지표입니다.
mAP, mean Average Precision이 핵심 지표입니다.
Precision은 검출한 것 중 실제 번호판의 비율입니다.
Recall은 실제 번호판 중 검출된 비율입니다.
IoU, Intersection over Union은 바운딩 박스의 정확도를 측정합니다.
mAP@0.5는 IoU 0.5 이상일 때의 평균 정밀도입니다.""",

    "ocr_metrics": """문자 인식 모델의 평가 지표입니다.
문자 단위 정확도는 개별 문자 인식률입니다.
번호판 단위 정확도는 전체 번호판을 완벽하게 인식한 비율입니다.
한 글자라도 틀리면 실패로 처리합니다.
CER, Character Error Rate는 문자 오류율입니다.
삽입, 삭제, 대체 오류를 모두 고려합니다.""",

    "error_analysis": """오류 분석 방법을 알아볼게요.
어떤 상황에서 실패하는지 파악하는 것이 중요합니다.
어두운 환경, 흐린 이미지, 기울어진 번호판에서 실패할 수 있습니다.
혼동 행렬로 자주 혼동되는 문자 쌍을 찾습니다.
실패 사례를 시각적으로 검토해서 패턴을 찾습니다.
이 분석을 바탕으로 개선 전략을 수립합니다.""",

    "optimization": """모델 최적화 방법들입니다.
하이퍼파라미터 튜닝으로 성능을 개선합니다.
학습률, 배치 사이즈, 에폭 수를 조절합니다.
데이터 증강을 강화해서 일반화 능력을 높입니다.
앙상블로 여러 모델의 예측을 결합할 수 있습니다.
테스트 타임 증강도 정확도를 높이는 방법입니다.""",

    "inference_speed": """추론 속도 최적화 방법입니다.
실시간 처리를 위해 속도가 중요합니다.
TorchScript로 모델을 컴파일합니다.
ONNX 포맷으로 변환하면 더 빠른 추론이 가능합니다.
양자화로 모델 크기와 연산량을 줄입니다.
배치 처리로 처리량을 높일 수 있습니다.""",

    "mlflow": """MLflow로 실험을 관리하는 방법입니다.
각 실험의 파라미터와 결과를 기록합니다.
모델 버전을 체계적으로 관리할 수 있어요.
UI에서 실험들을 비교하고 분석할 수 있습니다.
최고 성능 모델을 쉽게 찾고 재현할 수 있습니다.
배포할 모델을 레지스트리에 등록합니다.""",

    "outro": """이번 레슨에서 모델 평가와 최적화를 배웠습니다.
다양한 지표로 평가하고, 오류를 분석하고, 성능을 개선했습니다.
다음 레슨에서는 API 서버 개발과 배포를 진행하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-5"
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
