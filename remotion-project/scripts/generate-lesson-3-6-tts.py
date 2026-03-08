import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-3-6"
SCRIPT_DIR = "scripts/lesson-3-6"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_batchnorm.txt", "batchnorm.mp3"),
    ("scene3_batchnorm_how.txt", "batchnorm_how.mp3"),
    ("scene4_dropout.txt", "dropout.mp3"),
    ("scene5_pytorch.txt", "pytorch.mp3"),
    ("scene6_outro.txt", "outro.mp3"),
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
