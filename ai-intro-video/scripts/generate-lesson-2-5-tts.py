#!/usr/bin/env python3
"""
Lesson 2-5 TTS 생성 스크립트
벡터와 행렬 기초 + GPU/HBM
"""

import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPTS_DIR = "scripts/lesson-2-5"
OUTPUT_DIR = "public/audio/lesson-2-5"

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = []
    for i in range(1, 9):
        script_path = f"{SCRIPTS_DIR}/scene{i}.txt"
        if os.path.exists(script_path):
            with open(script_path, 'r', encoding='utf-8') as f:
                scenes.append((i, f.read().strip()))

    for scene_num, text in scenes:
        output_path = f"{OUTPUT_DIR}/scene{scene_num}.mp3"
        print(f"Generating scene {scene_num}...")

        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"  Saved: {output_path}")

    print(f"\nDone! Generated {len(scenes)} audio files.")

if __name__ == "__main__":
    asyncio.run(generate_tts())
