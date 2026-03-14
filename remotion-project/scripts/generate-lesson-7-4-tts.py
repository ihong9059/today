import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-4"
SCRIPT_DIR = "scripts/lesson-7-4"

scripts = [
    "scene01_intro",
    "scene02_problem",
    "scene03_idea",
    "scene04_batch_vs_layer",
    "scene05_formula",
    "scene06_gamma_beta",
    "scene07_example",
    "scene08_where",
    "scene09_pre_post",
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
