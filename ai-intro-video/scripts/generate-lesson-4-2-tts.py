import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-4-2"
OUTPUT_DIR = "public/audio/lesson-4-2"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i in range(1, 8):  # scene1 ~ scene7
        script_file = f"{SCRIPT_DIR}/scene{i}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(f"{OUTPUT_DIR}/scene{i}.mp3")
            print(f"Generated scene{i}.mp3")

asyncio.run(generate_audio())
