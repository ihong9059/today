import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "..", "public", "audio", "lesson-5-7-new")

SCENES = [
    "scene01_intro",
    "scene02_what_is_transfer",
    "scene03_benefits",
    "scene04_two_approaches",
    "scene05_pretrained_model",
    "scene06_feature_extraction",
    "scene07_fine_tuning",
    "scene08_practice",
    "scene09_comparison",
    "scene10_outro",
]

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for scene in SCENES:
        script_file = os.path.join(SCRIPT_DIR, f"{scene}.txt")
        output_file = os.path.join(OUTPUT_DIR, f"{scene}.mp3")

        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read().strip()

            print(f"Generating {scene}.mp3...")
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(output_file)
            print(f"  Done: {output_file}")
        else:
            print(f"  Warning: {script_file} not found")

if __name__ == "__main__":
    asyncio.run(generate_audio())
    print("\nAll audio files generated!")
