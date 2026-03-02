"""
Lesson 2-2: 미분의 기초 - TTS 생성 스크립트
"""
import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPT_DIR = "scripts/lesson-2-2"
OUTPUT_DIR = "public/audio/lesson-2-2"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for i in range(1, 8):
        script_file = f"{SCRIPT_DIR}/scene{i}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()

            output_file = f"{OUTPUT_DIR}/scene{i}.mp3"
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(output_file)
            print(f"Generated {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
    print("Done!")
