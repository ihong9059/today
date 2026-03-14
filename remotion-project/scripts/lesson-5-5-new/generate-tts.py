import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "..", "public", "audio", "lesson-5-5-new")

SCENES = [
    "scene01_intro",
    "scene02_mnist_intro",
    "scene03_data_loading",
    "scene04_model_structure",
    "scene05_model_code",
    "scene06_training_setup",
    "scene07_training_loop",
    "scene08_training_run",
    "scene09_prediction",
    "scene10_mlp_comparison",
    "scene11_outro",
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
