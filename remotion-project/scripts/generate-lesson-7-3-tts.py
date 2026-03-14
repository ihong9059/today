import edge_tts
import asyncio
import os

# Lesson 7-3: 멀티헤드 어텐션 (Multi-head Attention)
scripts = [
    "scene01_intro",
    "scene02_why_multi",
    "scene03_single_head",
    "scene04_multi_head_idea",
    "scene05_dimension",
    "scene06_projection",
    "scene07_concat",
    "scene08_formula",
    "scene09_each_head",
    "scene10_visualization",
    "scene11_benefit",
    "scene12_outro",
]

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-3"
SCRIPT_DIR = "scripts/lesson-7-3"

async def generate_tts(script_name: str):
    script_path = os.path.join(SCRIPT_DIR, f"{script_name}.txt")
    output_path = os.path.join(OUTPUT_DIR, f"{script_name}.mp3")

    with open(script_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    lines = [line.strip() for line in text.split('\n') if line.strip()]
    clean_text = ' '.join(lines)

    print(f"Generating: {script_name}")
    communicate = edge_tts.Communicate(clean_text, VOICE)
    await communicate.save(output_path)
    print(f"Saved: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for script in scripts:
        await generate_tts(script)

    print("All TTS files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
