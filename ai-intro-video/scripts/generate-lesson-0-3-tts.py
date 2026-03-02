#!/usr/bin/env python3
"""
Lesson 0-3 TTS Generator using Edge TTS
조건문과 반복문 레슨 나레이션 생성
"""

import asyncio
import edge_tts
import os
from pathlib import Path

VOICE = "ko-KR-SunHiNeural"  # 여성 음성, 자연스러운 톤

# 스크립트 디렉토리 기준 경로 설정
SCRIPT_DIR = Path(__file__).parent
LESSON_DIR = SCRIPT_DIR / "lesson-0-3"
OUTPUT_DIR = SCRIPT_DIR.parent / "public" / "audio" / "lesson-0-3"

# Scene 텍스트 파일 목록
SCENES = [
    "scene1.txt",
    "scene2.txt",
    "scene3.txt",
    "scene4.txt",
    "scene5.txt",
    "scene6.txt",
    "scene7.txt",
]

async def generate_tts(text: str, output_path: str):
    """Edge TTS를 사용하여 텍스트를 음성으로 변환"""
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    # 출력 디렉토리 생성
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Voice: {VOICE}")
    print("-" * 50)

    for scene_file in SCENES:
        scene_path = LESSON_DIR / scene_file
        scene_name = scene_file.replace(".txt", "")
        output_path = OUTPUT_DIR / f"{scene_name}.mp3"

        if not scene_path.exists():
            print(f"Warning: {scene_path} not found, skipping...")
            continue

        # 텍스트 파일 읽기
        with open(scene_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print(f"\nProcessing {scene_name}...")
        print(f"Text length: {len(text)} characters")

        # TTS 생성
        await generate_tts(text, str(output_path))

    print("\n" + "=" * 50)
    print("All TTS files generated successfully!")
    print(f"Output directory: {OUTPUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
