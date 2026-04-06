import asyncio
import edge_tts
import os

VOICE = "ko-KR-InJoonNeural"  # 남성 전문가 목소리
SCRIPT_DIR = "scripts/wall-robot"
OUTPUT_DIR = "public/audio/wall-robot"

async def generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scripts = sorted([f for f in os.listdir(SCRIPT_DIR) if f.endswith('.txt')])

    for script_file in scripts:
        name = script_file.replace('.txt', '')
        with open(f"{SCRIPT_DIR}/{script_file}", "r", encoding="utf-8") as f:
            text = f.read().strip()

        output_file = f"{OUTPUT_DIR}/{name}.mp3"
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
        await communicate.save(output_file)
        print(f"Generated: {output_file}")

asyncio.run(generate())
