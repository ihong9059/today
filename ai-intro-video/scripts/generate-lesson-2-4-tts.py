"""
Lesson 2-4: 연쇄법칙 (Chain Rule) TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPTS_DIR = "scripts/lesson-2-4"
OUTPUT_DIR = "public/audio/lesson-2-4"

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]

    for scene in scenes:
        script_path = os.path.join(SCRIPTS_DIR, f"{scene}.txt")
        output_path = os.path.join(OUTPUT_DIR, f"{scene}.mp3")

        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print(f"Generating {scene}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"  -> Saved to {output_path}")

    print("\nAll TTS files generated!")

if __name__ == "__main__":
    asyncio.run(generate_tts())
