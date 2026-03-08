#!/usr/bin/env python3
"""
Level 9-8: 최종 회고
TTS 음성 생성 스크립트
"""

import asyncio
import edge_tts
import os

OUTPUT_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-9-8"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = {
    "intro": """레벨 9-8, 최종 회고입니다.
전체 커리큘럼을 돌아보며 배운 내용을 정리합니다.
AI 엔지니어로서의 다음 단계를 안내합니다.""",

    "review": """전체 과정을 되돌아봅니다.
레벨 1에서 AI 기초 개념을 배웠습니다.
레벨 2에서 파이썬과 수학 기초를 다졌습니다.
레벨 3에서 딥러닝 기초를 익혔습니다.
레벨 4에서 파이토치 실습을 했습니다.""",

    "advanced": """고급 주제도 배웠습니다.
레벨 5에서 컴퓨터 비전과 CNN을 다뤘습니다.
레벨 6에서 시퀀스 모델과 RNN을 학습했습니다.
레벨 7에서 트랜스포머와 LLM을 배웠습니다.
레벨 8에서 GPU 프로그래밍을 익혔습니다.""",

    "project": """종합 프로젝트를 완성했습니다.
번호판 인식 시스템을 처음부터 끝까지 구현했습니다.
데이터 수집, 모델 학습, 평가, 배포, 운영까지 경험했습니다.
실제 AI 프로젝트의 전체 사이클을 이해했습니다.""",

    "career": """AI 커리어 방향을 안내합니다.
ML 엔지니어는 모델 개발과 최적화에 집중합니다.
데이터 사이언티스트는 분석과 인사이트 도출에 집중합니다.
MLOps 엔지니어는 모델 운영과 자동화에 집중합니다.
연구원은 새로운 알고리즘 개발에 집중합니다.""",

    "nextsteps": """다음 학습 방향입니다.
Kaggle 대회 참가로 실력을 검증하세요.
오픈소스 프로젝트에 기여해 보세요.
최신 논문을 읽고 구현해 보세요.
개인 프로젝트로 포트폴리오를 만드세요.""",

    "outro": """AI 첫걸음 과정을 완료했습니다.
축하합니다! 긴 여정을 함께해 주셔서 감사합니다.
배운 것을 실제로 적용하며 계속 성장하세요.
여러분의 AI 여정을 응원합니다!"""
}

async def generate_audio(name: str, text: str):
    output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    print("=== Level 9-8 TTS 생성 시작 ===")
    tasks = [generate_audio(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("=== 모든 TTS 생성 완료 ===")

if __name__ == "__main__":
    asyncio.run(main())
