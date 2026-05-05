import asyncio
import edge_tts
import os
import sys

VOICE = "ko-KR-InJoonNeural"
SCRIPT_DIR = "scripts/intro-tools-video"
OUTPUT_DIR = "public/audio/intro-tools"

SCENES = [
    "scene1_hook",
    "scene2_solution",
    "scene3_trackA",
    "scene4_trackB",
    "scene5_trackC",
    "scene6_trackD",
    "scene7_trackE",
    "scene8_case",
    "scene9_cta",
]

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for scene in SCENES:
        script_file = f"{SCRIPT_DIR}/{scene}.txt"
        if not os.path.exists(script_file):
            print(f"[SKIP] {script_file} not found", file=sys.stderr)
            continue
        with open(script_file, "r", encoding="utf-8") as f:
            text = f.read().strip()
        if not text:
            print(f"[SKIP] {script_file} is empty", file=sys.stderr)
            continue
        communicate = edge_tts.Communicate(text, VOICE, rate="+0%")
        output_file = f"{OUTPUT_DIR}/{scene}.mp3"
        await communicate.save(output_file)
        print(f"[OK] {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
