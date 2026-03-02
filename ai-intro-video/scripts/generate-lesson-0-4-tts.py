import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "C:/todo/today/ai-intro-video/public/audio/lesson-0-4"
SCRIPT_DIR = "C:/todo/today/ai-intro-video/scripts/lesson-0-4"

async def generate_audio(text: str, output_file: str):
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_file)
    print(f"Generated: {output_file}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = []
    for i in range(1, 8):
        script_path = f"{SCRIPT_DIR}/scene{i}.txt"
        if os.path.exists(script_path):
            with open(script_path, "r", encoding="utf-8") as f:
                scenes.append(f.read())

    tasks = []
    for i, text in enumerate(scenes, 1):
        output_path = f"{OUTPUT_DIR}/scene{i}.mp3"
        tasks.append(generate_audio(text, output_path))

    await asyncio.gather(*tasks)
    print(f"\nAll {len(scenes)} audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
