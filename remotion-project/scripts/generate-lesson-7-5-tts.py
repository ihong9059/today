import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-5"
SCRIPT_DIR = "scripts/lesson-7-5"

scripts = [
    "scene01_intro",
    "scene02_problem",
    "scene03_idea",
    "scene04_resnet",
    "scene05_why_works",
    "scene06_gradient",
    "scene07_transformer",
    "scene08_add_norm",
    "scene09_dimension",
    "scene10_benefit",
    "scene11_code",
    "scene12_outro",
]

async def generate_tts(text: str, output_path: str):
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for script in scripts:
        script_path = os.path.join(SCRIPT_DIR, f"{script}.txt")
        output_path = os.path.join(OUTPUT_DIR, f"{script}.mp3")

        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        await generate_tts(text, output_path)

    print("\nAll TTS files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
