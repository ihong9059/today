"""
Lesson 4-6 TTS 생성 스크립트
학습 루프 - 7개 씬
"""
import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-4-6"
SCRIPTS_DIR = "scripts/lesson-4-6"

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for i in range(1, 8):
        script_file = f"{SCRIPTS_DIR}/scene{i}.txt"
        output_file = f"{OUTPUT_DIR}/scene{i}.mp3"

        with open(script_file, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print(f"Generating scene {i}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_file)
        print(f"  -> {output_file}")

    print("\nAll TTS files generated!")

if __name__ == "__main__":
    asyncio.run(generate_tts())
