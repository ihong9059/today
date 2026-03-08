#!/usr/bin/env python3
"""
Level 9-5: 모델 평가
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-5"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-5, 모델 평가입니다.
학습된 모델의 성능을 객관적으로 측정하고 분석합니다.
다양한 평가 지표와 시각화 방법을 배웁니다.""",

    "metrics": """평가 지표를 알아봅니다.
Precision, 정밀도는 예측한 것 중 맞춘 비율입니다.
Recall, 재현율은 실제 정답 중 찾아낸 비율입니다.
F1 Score는 정밀도와 재현율의 조화 평균입니다.""",

    "mAP": """객체 검출에서는 mAP를 사용합니다.
mAP는 Mean Average Precision의 약자입니다.
IoU 임계값에 따른 AP를 평균낸 값입니다.
mAP 50은 IoU 0.5 이상을 맞춘 것으로 계산합니다.""",

    "confusion": """혼동 행렬로 오류 패턴을 분석합니다.
어떤 클래스가 어떤 클래스로 잘못 인식되는지 파악합니다.
대각선 값이 높을수록 정확한 분류입니다.
오분류 패턴을 보고 개선 방향을 잡습니다.""",

    "analysis": """에러 분석을 수행합니다.
실패 케이스를 수집해서 패턴을 찾습니다.
야간 이미지, 기울어진 번호판 등 취약점을 파악합니다.
이 분석 결과로 데이터 증강이나 모델 개선 방향을 결정합니다.""",

    "visualization": """결과를 시각화합니다.
PR 커브로 정밀도와 재현율의 트레이드오프를 봅니다.
학습 곡선으로 수렴 상태를 확인합니다.
샘플 이미지에 예측 결과를 표시해서 직관적으로 평가합니다.""",

    "outro": """모델 평가 방법을 배웠습니다.
정확한 평가로 모델의 실력을 파악할 수 있습니다.
다음 레슨에서는 모델을 실제 서비스로 배포합니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-5 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
