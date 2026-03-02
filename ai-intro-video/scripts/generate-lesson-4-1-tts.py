"""
Lesson 4-1: MNIST 손글씨 분류 - TTS 오디오 생성
"""
import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-4-1"
OUTPUT_DIR = "public/audio/lesson-4-1"

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
            print(f"Generated: {output_file}")
        else:
            print(f"Script not found: {script_file}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
    print("\nTTS generation complete!")
