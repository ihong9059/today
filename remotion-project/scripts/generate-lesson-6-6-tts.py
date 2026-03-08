import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-6-6"
SCRIPT_DIR = "scripts/lesson-6-6"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_structure.txt", "structure.mp3"),
    ("scene3_encoder.txt", "encoder.mp3"),
    ("scene4_decoder.txt", "decoder.mp3"),
    ("scene5_problem.txt", "problem.mp3"),
    ("scene6_application.txt", "application.mp3"),
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
