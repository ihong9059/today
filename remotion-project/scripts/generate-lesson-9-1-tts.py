#!/usr/bin/env python3
"""
Level 9-1: 프로젝트 개요 - 번호판 인식 시스템
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

# 출력 디렉토리 설정
OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-1"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 음성 설정
VOICE = "ko-KR-SunHiNeural"

# 씬별 스크립트
SCRIPTS = {
    "intro": """레벨 9, 종합 프로젝트, 프로젝트 개요입니다.
지금까지 배운 딥러닝 기술을 총동원해서 실제로 동작하는 번호판 인식 시스템을 만들어봅니다.
주차장 입출차, 교통 단속, 물류 추적 등 실무에서 바로 활용할 수 있는 프로젝트입니다.""",

    "overview": """번호판 인식 시스템, LPR은 카메라 이미지에서 번호판을 자동으로 찾고 문자를 읽는 시스템입니다.
마치 주차장 경비원이 차가 들어오면 번호판 위치를 찾고, 그다음 글자를 읽는 것과 같습니다.
AI도 정확히 이 두 단계로 작동합니다. 첫째, 번호판 검출. 둘째, 문자 인식.""",

    "architecture": """왜 두 단계로 나눌까요? 한 번에 처리할 수도 있지만, 분리하면 장점이 많습니다.
첫째, 각 모델을 독립적으로 개선할 수 있습니다. 검출만 따로, 인식만 따로 최적화가 가능합니다.
둘째, 문제 발생 시 원인 파악이 쉽습니다. 검출이 문제인지, 인식이 문제인지 바로 알 수 있습니다.
셋째, 학습 데이터 준비가 간단합니다. 각 단계에 맞는 데이터만 모으면 됩니다.""",

    "detection": """첫 번째 단계, 번호판 검출입니다.
이미지에서 번호판이 어디에 있는지 찾아내는 과정입니다.
YOLO나 SSD 같은 객체 검출 모델을 사용합니다.
출력은 번호판을 감싸는 사각형 좌표, 바운딩 박스입니다.
Level 5에서 배운 CNN 기반 객체 검출 기술을 활용합니다.""",

    "recognition": """두 번째 단계, 문자 인식입니다.
검출된 번호판 영역에서 글자를 읽어내는 과정입니다.
CNN 기반 OCR 모델을 사용합니다.
한글, 숫자, 지역명을 정확히 분류해야 합니다.
예를 들어, 서울 가 1234를 정확히 읽어내야 합니다.""",

    "requirements": """시스템 요구사항을 정리해봅시다.
기능 요구사항으로는, 다양한 환경에서 번호판 인식, 97% 이상의 정확도, 100밀리초 이내 응답 시간입니다.
비기능 요구사항으로는, 24시간 안정 운영, 야간이나 악천후에서도 동작, 대량 처리 가능이 있습니다.
이런 요구사항을 만족하는 시스템을 설계해 나갈 것입니다.""",

    "outro": """프로젝트 개요를 살펴봤습니다.
이제 레벨 9 전체 로드맵이 그려졌습니다.
데이터 수집부터 모델 학습, 배포, 운영까지 전 과정을 함께 진행합니다.
다음 레슨에서는 데이터 수집과 라벨링을 시작합니다."""
}

async def generate_audio(name: str, text: str):
    """TTS 음성 생성"""
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    """메인 함수"""
    print("=== Level 9-1 TTS 생성 시작 ===")

    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)

    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
