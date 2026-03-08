import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-7"
SCRIPT_DIR = "scripts/lesson-7-7"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_encoder_only.txt", "encoder_only.mp3"),
    ("scene3_mlm.txt", "mlm.mp3"),
    ("scene4_nsp.txt", "nsp.mp3"),
    ("scene5_tokens.txt", "tokens.mp3"),
    ("scene6_finetuning.txt", "finetuning.mp3"),
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
