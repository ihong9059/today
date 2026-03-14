import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "..", "public", "audio", "lesson-5-4-new")

SCENES = [
    "scene1_intro",
    "scene2_lenet",
    "scene3_alexnet_intro",
    "scene4_alexnet_innovations",
    "scene5_vgg_intro",
    "scene6_vgg_filter",
    "scene7_vgg_variants",
    "scene8_comparison",
    "scene9_modern_principles",
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
