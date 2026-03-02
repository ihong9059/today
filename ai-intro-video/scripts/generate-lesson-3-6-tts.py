import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPTS_DIR = "scripts/lesson-3-6"
OUTPUT_DIR = "public/audio/lesson-3-6"

os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate_tts(scene_num):
    script_path = f"{SCRIPTS_DIR}/scene{scene_num}.txt"
    output_path = f"{OUTPUT_DIR}/scene{scene_num}.mp3"

    with open(script_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    for i in range(1, 8):
        await generate_tts(i)
    print("All TTS files generated!")

if __name__ == "__main__":
    asyncio.run(main())
