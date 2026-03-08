import asyncio
import edge_tts
import os
import glob

VOICE = "ko-KR-SunHiNeural"
SCRIPT_DIR = "scripts/lesson-2-7"
OUTPUT_DIR = "public/audio/lesson-2-7"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    script_files = sorted(glob.glob(f"{SCRIPT_DIR}/scene*.txt"))

    for script_file in script_files:
        basename = os.path.basename(script_file).replace('.txt', '')
        with open(script_file, "r", encoding="utf-8") as f:
            text = f.read()
        communicate = edge_tts.Communicate(text, VOICE)
        output_file = f"{OUTPUT_DIR}/{basename}.mp3"
        await communicate.save(output_file)
        print(f"Generated {output_file}")

asyncio.run(generate_audio())
