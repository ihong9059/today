import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-8-3"
SCRIPT_DIR = "scripts/lesson-8-3"

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_hierarchy.txt", "hierarchy.mp3"),
    ("scene3_register.txt", "register.mp3"),
    ("scene4_shared.txt", "shared.mp3"),
    ("scene5_global.txt", "global.mp3"),
    ("scene6_constant.txt", "constant.mp3"),
    ("scene7_outro.txt", "outro.mp3"),
]

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for script_file, audio_file in scenes:
        script_path = os.path.join(SCRIPT_DIR, script_file)
        output_path = os.path.join(OUTPUT_DIR, audio_file)

        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print(f"Generating {audio_file}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    asyncio.run(generate_tts())
    print("Done!")
