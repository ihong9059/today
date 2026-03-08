import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-8"
SCRIPT_DIR = "scripts/lesson-7-8"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_pretraining.txt", "pretraining.mp3"),
    ("scene3_sft.txt", "sft.mp3"),
    ("scene4_rlhf.txt", "rlhf.mp3"),
    ("scene5_alignment.txt", "alignment.mp3"),
    ("scene6_prompting.txt", "prompting.mp3"),
    ("scene7_outro.txt", "outro.mp3"),
]

async def generate_tts():
    for script_file, audio_file in scenes:
        with open(f"{SCRIPT_DIR}/{script_file}", "r", encoding="utf-8") as f:
            text = f.read().strip()

        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(f"{OUTPUT_DIR}/{audio_file}")
        print(f"Generated: {audio_file}")

asyncio.run(generate_tts())
print("All TTS files generated!")
