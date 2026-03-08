#!/usr/bin/env python3
"""
Level 9-4: 문자 인식 모델 (CNN OCR)
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-4"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-4, 문자 인식 모델입니다.
검출된 번호판 영역에서 문자를 읽어내는 OCR 모델을 만듭니다.
CNN 기반 분류 모델을 학습합니다.""",

    "pipeline": """문자 인식 파이프라인을 설명합니다.
첫째, 번호판 이미지를 입력받습니다.
둘째, 전처리로 그레이스케일 변환, 이진화를 수행합니다.
셋째, 개별 문자를 분리합니다.
넷째, 각 문자를 CNN으로 분류합니다.""",

    "segmentation": """문자 분리, 세그먼테이션을 수행합니다.
프로젝션 프로파일 분석으로 문자 경계를 찾습니다.
Connected Component 분석으로 개별 문자를 추출합니다.
일정한 크기로 정규화해서 CNN 입력으로 사용합니다.""",

    "cnn": """CNN 분류 모델 구조입니다.
입력은 정규화된 문자 이미지, 예를 들어 32x32 크기입니다.
합성곱 레이어로 특징을 추출합니다.
풀리 커넥티드 레이어로 분류합니다.
한글 자음, 모음, 숫자, 지역명 등 클래스를 예측합니다.""",

    "training": """모델 학습 과정입니다.
손실 함수는 크로스 엔트로피를 사용합니다.
옵티마이저는 아담을 선택합니다.
데이터 증강으로 회전, 노이즈, 왜곡을 추가합니다.
검증 세트로 과적합을 모니터링합니다.""",

    "integration": """검출과 인식을 통합합니다.
YOLO로 번호판 위치를 찾고, 영역을 크롭합니다.
크롭된 영역에서 문자를 분리합니다.
각 문자를 CNN으로 인식해 최종 결과를 조합합니다.
서울 가 1234 형태의 완성된 번호판 문자열을 출력합니다.""",

    "outro": """문자 인식 모델 학습을 완료했습니다.
검출과 인식을 연결해 전체 파이프라인이 완성되었습니다.
다음 레슨에서는 모델 성능을 체계적으로 평가합니다."""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-4 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
