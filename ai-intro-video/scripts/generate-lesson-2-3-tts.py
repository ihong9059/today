"""
Lesson 2-3: 편미분 TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPTS_DIR = "scripts/lesson-2-3"
OUTPUT_DIR = "public/audio/lesson-2-3"

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]

    for scene in scenes:
        script_path = f"{SCRIPTS_DIR}/{scene}.txt"
        output_path = f"{OUTPUT_DIR}/{scene}.mp3"

        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read()

        print(f"Generating {scene}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"  Saved: {output_path}")

    print("\nAll TTS files generated!")

if __name__ == "__main__":
    asyncio.run(generate_tts())
